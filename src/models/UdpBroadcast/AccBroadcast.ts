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
} from "../../utils/broadcastStructs";

class AccBroadcast extends EventEmitter {
  private socket: dgram.Socket;
  private cars: Map<number, any>;
  private registration: any;

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

    this.connect(name, password, cmdPassword, updateMS);
    this.cars = new Map();

    process.on("SIGINT", this.disconnect.bind(this));
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
        }
        break;
      case 2: // REALTIME_UPDATE
        this.emit("realtime_update", parseRealTimeUpdate(br));
        break;
      case 3: // REALTIME_CAR_UPDATE
        this.emit("realtime_car_update", parseRealTimeCarUpdate(br));
        break;
      case 4: // ENTRY_LIST
        this.cars.clear();
        parseEntryList(br).forEach((carId) => this.cars.set(carId, {}));
        this.emit("entry_list", this.cars);
        break;
      case 5: // TRACK_DATA
        this.emit("track_data", parseTrackData(br));
        break;
      case 6: // ENTRY_LIST_CAR
        this.emit("entry_list_car", parseEntryListCar(br, this.cars));
        break;
      case 7: // BROADCASTING_EVENT
        this.emit("broadcasting_event", parseBroadcastEvent(br, this.cars));
        break;
      default:
        console.error(`unknown messageType ${messageType}`);
    }
  }

  private requestTrackData(): void {
    this.send(RequestTrackData(this.registration.ConnectionId));
  }

  private requestEntryList(): void {
    this.send(RequestEntryList(this.registration.ConnectionId));
  }

  private connect(
    name: string,
    password: string,
    cmdPassword: string,
    updateMS: number = 250
  ): void {
    this.send(RegisterConnection(name, password, cmdPassword, updateMS));
  }

  private disconnect(): void {
    this.send(DeregisterConnection());
    process.exit(0);
  }

  private send(buffer: Buffer): void {
    this.socket.send(buffer, 0, buffer.length, this.port, "127.0.0.1");
  }
}

export default AccBroadcast;
