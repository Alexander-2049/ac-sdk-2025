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
import { IAssettoCorsaData } from "./types/broadcast/interfaces/AssettoCorsaData";
import { IAssettoCorsaCompetizioneData } from "./types/broadcast/interfaces/AssettoCorsaCompetizioneData";
import { getGameDataFromSharedMemory } from "./features/sharedMemory/getGameDataFromSharedMemory";
import { RealtimeUpdate } from "./types/broadcast/interfaces/realtimeUpdate";
import { TrackData } from "./types/broadcast/interfaces/trackData";
import { Car } from "./types/broadcast/interfaces/car";

export const AC_SDK: {
  getPhysics: () => any[];
  getGraphics: () => any[];
  getStatic: () => any[];
} = require("../build/Release/AssettoCorsaSDK.node");

interface AssettoCorsaEvents {
  ac_data: IAssettoCorsaData;
  acc_data: IAssettoCorsaCompetizioneData;
  acc_cars_update: RealtimeCarUpdate[];
  acc_realtime_update: RealtimeUpdate;
  acc_entry_list: number[];
  acc_track_data: TrackData;
  acc_entry_list_car: Car;
  open: Game;
  close: Game;
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
  private lastCarsUpdate: number = Date.now();
  private carsEmitTimeout: NodeJS.Timeout | null = null;
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
      updateMs: broadcast.updateMs || this.sharedMemoryUpdateIntervalMs,
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
      const game = detectGame(staticData);

      if (this.game !== game) {
        const isGameClosed = game === Game.None;
        const isGameOpened = !isGameClosed;
        this.game = game;

        if (isGameOpened) this.onGameOpen(this.game);
        if (isGameClosed) return this.onGameClose();
      }

      if (this.game === Game.None) return;

      const graphicsRawArray = AC_SDK.getGraphics();
      const graphics: IGraphics = parseGraphicsArray(graphicsRawArray);

      const physicsRawArray = AC_SDK.getPhysics();
      const physics: IPhysics = parsePhysicsArray(physicsRawArray);

      if (game === Game.AssettoCorsa) {
        const data = getGameDataFromSharedMemory(
          game,
          graphics,
          physics,
          staticData
        );
        this.emit("ac_data", data);
      } else if (game === Game.AssettoCorsaCompetizione) {
        const data = getGameDataFromSharedMemory(
          game,
          graphics,
          physics,
          staticData
        );
        this.emit("acc_data", data);
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
    this.emit("open", this.game);

    if (game === Game.AssettoCorsaCompetizione) {
      this.udpConnection?.connect();
      this.udpConnection?.addListener(
        "realtime_car_update",
        (data: RealtimeCarUpdate) => {
          this.cars.set(data.CarIndex, data);
        }
      );

      this.carsEmitTimeout = setInterval(() => {
        /*
         * realtime_car_update is emitted separately for every car, so we need to
         * throttle the event to avoid emitting the same data multiple times.
         */
        if (Date.now() - this.lastCarsUpdate < 2) return;
        this.emit("acc_cars_update", Array.from(this.cars.values()));
      }, 1000 / 60);
    }

    this.udpConnection?.addListener(
      "realtime_update",
      (data: RealtimeUpdate) => {
        this.emit("acc_realtime_update", data);
      }
    );

    this.udpConnection?.addListener("entry_list", (data: number[]) => {
      this.emit("acc_entry_list", data);
    });

    this.udpConnection?.addListener("track_data", (data: TrackData) => {
      this.emit("acc_track_data", data);
    });

    this.udpConnection?.addListener("entry_list_car", (data: Car) => {
      this.emit("acc_entry_list_car", data);
    });
  }

  private onGameClose() {
    this.emit("close", this.game);

    this.udpConnection?.disconnect();
    this.cars.clear();
    clearInterval(this.carsEmitTimeout!);
  }

  disconnect() {
    clearInterval(this.sharedMemoryInterval);
    return true;
  }
}
