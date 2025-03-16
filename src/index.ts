import { EventEmitter } from "stream";
import {
  IPhysics,
  parsePhysicsArray,
} from "./features/sharedMemory/parsePhysicsArray";
import {
  GAME_STATUS,
  IGraphics,
  parseGraphicsArray,
} from "./features/sharedMemory/parseGraphicsArray";
import {
  IStatic,
  parseStaticArray,
} from "./features/sharedMemory/parseStaticArray";
import AccBroadcast from "./features/udpBroadcast/AccBroadcast";
import { RealtimeCarUpdate } from "./types/broadcast/interfaces/realtimeCarUpdate";
import { detectGame, Game } from "./features/sharedMemory/detectGame";

export const AC_SDK: {
  getPhysics: () => any[];
  getGraphics: () => any[];
  getStatic: () => any[];
} = require("../build/Release/AssettoCorsaSDK.node");

interface AssettoCorsaEvents {
  physics: IPhysics;
  graphics: IGraphics;
  static: IStatic;
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
  private cars: Map<number, RealtimeCarUpdate> = new Map();
  private game: Game = Game.None;

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
      const staticRawArray = AC_SDK.getStatic();
      const staticData: IStatic = parseStaticArray(staticRawArray);
      this.emit("static", staticData);

      const game = detectGame(staticData);

      const graphicsRawArray = AC_SDK.getGraphics();
      const graphics: IGraphics = parseGraphicsArray(graphicsRawArray);
      this.emit("graphics", graphics);

      const physicsRawArray = AC_SDK.getPhysics();
      const physics: IPhysics = parsePhysicsArray(physicsRawArray);
      this.emit("physics", physics);

      if (this.game !== game) {
        const isGameClosed = game === Game.None;
        const isGameOpened = !isGameClosed;
        this.game = game;

        if (isGameOpened) this.onGameOpen(this.game);
        if (isGameClosed) return this.onGameClose();
      }
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

  private onGameOpen(game: Game) {
    if (game === Game.AssettoCorsaCompetizione) {
      this.udpConnection?.connect();
      this.udpConnection?.addListener(
        "realtime_car_update",
        (data: RealtimeCarUpdate) => {
          this.cars.set(data.CarIndex, data);
        }
      );
    }
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
