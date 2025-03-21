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

class AccBroadcast extends EventEmitter {
  private socket: dgram.Socket;
  private cars: Map<number, TeamCarDetails>;
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
        /*
        REGISTRATION_RESULT is sent only on connection establishment
        ACC UDP Server is not sending messages when racing session is over
      */
        this.registration = parseRegistrationResult(br);
        this.emit("registration_result", this.registration);

        if (!this.registration.isReadOnly) {
          this.requestTrackData();
          this.requestEntryList();
          this.trackAndEntryListUpdateInterval = setInterval(() => {
            this.requestTrackData();
            this.requestEntryList();
          }, 5000);
        }
        break;
      case 2: // REALTIME_UPDATE
        /*
         * realtime_update event is emitted every ${updateMs} milliseconds
         */
        this.emit("realtime_update", parseRealTimeUpdate(br));
        break;
      case 3: // REALTIME_CAR_UPDATE
        /*
         * realtime_car_update event is emitted every ${updateMs} milliseconds
         * for each car on the track separately
         */
        this.emit("realtime_car_update", parseRealTimeCarUpdate(br));
        break;
      case 4: // ENTRY_LIST
        /*
         * entry_list event is emitted every time the entry list changes
         * (e.g. when a new player joins the server)
         */
        this.cars.clear();
        const entryListCarIndexes = parseEntryList(br);
        this.carsAmount = entryListCarIndexes.length;
        /*
        .forEach((carId) =>
          this.cars.set(carId, {} as TeamCarDetails)
        );
        */

        // Removed this line because it provides useless information
        // for the user and it's not used anywhere in the code
        // this.emit("entry_list", this.cars);
        break;
      case 5: // TRACK_DATA
        /*
         * track_data event is emitted every time the track data changes
         * (e.g. when the server switches to a different track)
         */
        this.emit("track_data", parseTrackData(br));
        break;
      case 6: // ENTRY_LIST_CAR
        /*
         * entry_list_car event is emitted every time the entry list changes
         * (e.g. when a new player joins the server)
         */
        const entryListCar = parseEntryListCar(br);
        this.emit("entry_list_car", entryListCar);
        this.cars.set(entryListCar.CarIndex, entryListCar);

        if (this.cars.size === this.carsAmount) {
          this.emit("entry_list", Array.from(this.cars.values()));
        }
        break;
      case 7: // BROADCASTING_EVENT
        /*
         * broadcasting_event: no description
         */
        this.emit("broadcasting_event", parseBroadcastEvent(br, this.cars));
        break;
      default:
        console.error(`unknown messageType ${messageType}`);
    }
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
