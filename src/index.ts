import { EventEmitter } from "stream";
import { parsePhysicsArray } from "./utils/parsePhysicsArray";
import { PhysicsData } from "./types/physics";
import { GameStatus, GraphicsData } from "./types/graphics";
import { StaticData } from "./types/static";
import { parseGraphicsArray } from "./utils/parseGraphicsArray";
import { parseStaticArray } from "./utils/parseStaticArray";
import AccBroadcast from "./models/UdpBroadcast/AccBroadcast";

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
  }

  private onGameClose() {
    this.udpConnection?.disconnect();
  }

  disconnect() {
    clearInterval(this.sharedMemoryInterval);
    return true;
  }
}
