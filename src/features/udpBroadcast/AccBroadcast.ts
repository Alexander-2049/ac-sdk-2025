import dgram from "dgram";
import { EventEmitter } from "events";
import { BinaryReader } from "./BinaryReader";
import {
  DeregisterConnection,
  parseBroadcastEvent,
  parseEntryList,
  parseEntryListCar,
  parseRealTimeCarUpdate,
  parseRealTimeUpdate,
  parseRegistrationResult,
  parseTrackData,
  RegisterConnection,
  RequestEntryList,
  RequestTrackData,
} from "./broadcastStructs";
import { RegistrationResults } from "../../types/broadcast/interfaces/registrationResults";
import { TeamCarDetails } from "../../types/broadcast/interfaces/car";
import { RealtimeCarUpdate } from "../../types/broadcast/interfaces/realtimeCarUpdate";

export interface RealtimeCarAndEntryDataUpdate extends RealtimeCarUpdate {
  TeamCarDetails: TeamCarDetails;
}

class AccBroadcast extends EventEmitter {
  private socket: dgram.Socket;
  private cars: Map<number, TeamCarDetails>;
  private realtimeCarUpdates: Map<number, RealtimeCarUpdate> = new Map();
  private carsAmount: number = 0;
  private registration: RegistrationResults | null = null;
  private trackAndEntryListUpdateInterval: NodeJS.Timeout | null = null;

  constructor(
    private name: string,
    private password: string,
    private cmdPassword: string = "",
    private updateMS: number = 250,
    private port: number = 9000
  ) {
    super();
    this.socket = dgram.createSocket("udp4");
    this.socket.on("message", this.onMessage.bind(this));

    this.cars = new Map();

    process.on("SIGINT", () => {
      this.disconnect.bind(this)();
      process.exit(0);
    });
  }

  private onMessage(message: Buffer): void {
    const br = new BinaryReader(message, "little");
    const messageType = br.ReadUInt8();

    switch (messageType) {
      case 1: // REGISTRATION_RESULT
        this.registration = parseRegistrationResult(br);
        this.emit("registration_result", this.registration);

        if (!this.registration.isReadOnly) {
          this.requestTrackData();
          this.requestEntryList();
          this.trackAndEntryListUpdateInterval = setInterval(() => {
            this.requestTrackData();
            this.requestEntryList();
          }, 3000);
        }
        break;
      case 2: // REALTIME_UPDATE
        this.emit("realtime_update", parseRealTimeUpdate(br));
        break;
      case 3: // REALTIME_CAR_UPDATE
        const realtimeCarUpdate = parseRealTimeCarUpdate(br);
        if (this.cars.has(realtimeCarUpdate.CarIndex)) {
          this.realtimeCarUpdates.set(
            realtimeCarUpdate.CarIndex,
            realtimeCarUpdate
          );
        }

        if (
          this.carsAmount > 0 &&
          this.realtimeCarUpdates.size === this.carsAmount
        ) {
          this.emit(
            "realtime_cars_update",
            Array.from(this.realtimeCarUpdates.values())
          );
          this.emit(
            "realtime_cars_and_entry_data_update",
            this.mergeCarData(
              this.cars,
              Array.from(this.realtimeCarUpdates.values())
            )
          );
          this.realtimeCarUpdates.clear();
        }
        break;
      case 4: // ENTRY_LIST
        this.cars.clear();
        const entryListCarIndexes = parseEntryList(br);
        this.carsAmount = entryListCarIndexes.length;
        break;
      case 5: // TRACK_DATA
        this.emit("track_data", parseTrackData(br));
        break;
      case 6: // ENTRY_LIST_CAR
        const entryListCar = parseEntryListCar(br);
        this.emit("entry_list_car", entryListCar);
        this.cars.set(entryListCar.CarIndex, entryListCar);

        if (this.cars.size === this.carsAmount) {
          this.emit("entry_list", Array.from(this.cars.values()));
        }
        break;
      case 7: // BROADCASTING_EVENT
        this.emit("broadcasting_event", parseBroadcastEvent(br, this.cars));
        break;
      default:
        console.error(`unknown messageType ${messageType}`);
    }
  }

  private mergeCarData(
    cars: Map<number, TeamCarDetails>,
    realtimeCarUpdates: RealtimeCarUpdate[]
  ): RealtimeCarAndEntryDataUpdate[] {
    const arr: RealtimeCarAndEntryDataUpdate[] = [];

    for (const realtimeCarUpdate of realtimeCarUpdates) {
      const team = cars.get(realtimeCarUpdate.CarIndex);
      if (team) {
        arr.push({
          ...realtimeCarUpdate,
          TeamCarDetails: team,
        });
      }
    }

    return arr;
  }

  private requestTrackData(): void {
    if (!this.registration) return;
    this.send(RequestTrackData(this.registration.ConnectionId));
  }

  private requestEntryList(): void {
    if (!this.registration) return;
    this.send(RequestEntryList(this.registration.ConnectionId));
  }

  public connect(): void {
    if (this.trackAndEntryListUpdateInterval)
      clearInterval(this.trackAndEntryListUpdateInterval);

    this.send(
      RegisterConnection(
        this.name,
        this.password,
        this.cmdPassword,
        this.updateMS
      )
    );
  }

  public disconnect(): void {
    if (this.trackAndEntryListUpdateInterval)
      clearInterval(this.trackAndEntryListUpdateInterval);

    this.send(DeregisterConnection());
    this.registration = null;
  }

  private send(buffer: Buffer): void {
    const offset = 0;
    const length = buffer.length;
    const port = this.port;
    const address = "127.0.0.1";
    const message = new Uint8Array(buffer);

    this.socket.send(message, offset, length, port, address);
  }
}

export default AccBroadcast;
