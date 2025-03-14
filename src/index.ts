import { EventEmitter } from "stream";
import { parsePhysicsArray } from "./utils/parsePhysicsArray";
import { PhysicsData } from "./types/physics";
import { GameStatus, GraphicsData } from "./types/graphics";
import { StaticData } from "./types/static";
import { parseGraphicsArray } from "./utils/parseGraphicsArray";
import { parseStaticArray } from "./utils/parseStaticArray";
import AccBroadcast from "./models/UdpBroadcast/AccBroadcast";
import { RealtimeCarUpdate } from "./types/broadcast/interfaces/realtimeCarUpdate";

export const AC_SDK: {
  getPhysics: () => any[];
  getGraphics: () => any[];
  getStatic: () => any[];
} = require("../build/Release/AssettoCorsaSDK.node");

interface AssettoCorsaEvents {
  physics: PhysicsData;
  graphics: GraphicsData;
  static: StaticData;
}

interface ACSDKBroadcastInterface {
  name: string;
  password: string;
  cmdPassword?: string;
  port?: number;
  updateMs?: number;
}

interface ACSDKConstructorInterface {
  sharedMemoryUpdateIntervalMs?: number;
  broadcast?: ACSDKBroadcastInterface;
}

export default class AssettoCorsaSDK extends EventEmitter {
  private udpConnection: AccBroadcast | null = null;
  private sharedMemoryInterval?: NodeJS.Timeout;
  private sharedMemoryUpdateIntervalMs: number;
  private broadcast?: {
    password: string;
    name: string;
    cmdPassword: string;
    port: number;
    updateMs: number;
  };
  private status: GameStatus = GameStatus.OFF;
  private cars: Map<number, RealtimeCarUpdate> = new Map();

  constructor({
    broadcast,
    sharedMemoryUpdateIntervalMs,
  }: ACSDKConstructorInterface) {
    super();

    this.sharedMemoryUpdateIntervalMs =
      sharedMemoryUpdateIntervalMs || 1000 / 60;

    this.broadcast = broadcast && {
      name: broadcast.name,
      cmdPassword: broadcast.cmdPassword || "",
      password: broadcast.password,
      port: broadcast.port || 9000,
      updateMs: broadcast.updateMs || 250,
    };

    if (this.broadcast) {
      this.udpConnection = new AccBroadcast(
        this.broadcast.name,
        this.broadcast.password,
        this.broadcast.cmdPassword,
        this.broadcast.updateMs,
        this.broadcast.port
      );
    }

    this.sharedMemoryInterval = setInterval(() => {
      const graphicsRawArray = AC_SDK.getGraphics();
      const graphics: GraphicsData = parseGraphicsArray(graphicsRawArray);
      const prevStatus = this.status;
      this.status = graphics.status;
      this.emit("graphics", graphics);

      if (this.status !== prevStatus) {
        const isGameClosed = this.status === GameStatus.OFF;
        const isGameOpened = prevStatus === GameStatus.OFF;
        if (isGameOpened) this.onGameOpen();
        if (isGameClosed) return this.onGameClose();
      }

      const physicsRawArray = AC_SDK.getPhysics();
      const physics: PhysicsData = parsePhysicsArray(physicsRawArray);
      this.emit("physics", physics);


      /*
  CarIndex: number; XXX
  DriverIndex: number; XXX
  DriverCount: number; XXX
  Gear: number; ---
  WorldPosX: number; XXX
  WorldPosY: number; XXX
  Yaw: number; XXX
  CarLocation: CarLocationEnum; XXX
  Kmh: number; ---
  Position: number; XXX
  CupPosition: number; XXX
  TrackPosition: number; XXX
  SplinePosition: number; XXX
  Laps: number; XXX
  Delta: number; XXX
  BestSessionLap: BestSessionLap; XXX
  (
  export interface BestSessionLap {
  Splits: any[];
  LaptimeMS: any;
  CarIndex: number;
  DriverIndex: number;
  IsInvalid: boolean;
  IsValidForBest: boolean;
  isOutlap: boolean;
  isInlap: boolean;
}
  )
  LastLap: Lap; XXX
  CurrentLap: Lap; XXX
      */

      const staticRawArray = AC_SDK.getStatic();
      const staticData: StaticData = parseStaticArray(staticRawArray);
      this.emit("static", staticData);
    }, this.sharedMemoryUpdateIntervalMs);
  }

  // Type-safe emit method
  emit<Event extends keyof AssettoCorsaEvents>(
    event: Event,
    data: AssettoCorsaEvents[Event]
  ): boolean {
    return super.emit(event, data);
  }

  // Type-safe event listener methods
  addListener<Event extends keyof AssettoCorsaEvents>(
    event: Event,
    listener: (data: AssettoCorsaEvents[Event]) => void
  ): this {
    return super.addListener(event, listener);
  }

  on<Event extends keyof AssettoCorsaEvents>(
    event: Event,
    listener: (data: AssettoCorsaEvents[Event]) => void
  ): this {
    return super.on(event, listener);
  }

  private onGameOpen() {
    this.udpConnection?.connect();
    this.udpConnection?.addListener(
      "realtime_car_update",
      (data: RealtimeCarUpdate) => {
        this.cars.set(data.CarIndex, data);
      }
    );
  }

  private onGameClose() {
    this.udpConnection?.disconnect();
    this.cars.clear();
  }

  disconnect() {
    clearInterval(this.sharedMemoryInterval);
    return true;
  }
}
