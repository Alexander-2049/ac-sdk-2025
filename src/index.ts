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
import {
  BestSessionLap,
  Lap,
  RealtimeCarUpdate,
} from "./types/broadcast/interfaces/realtimeCarUpdate";
import { detectGame, Game } from "./features/sharedMemory/detectGame";
import { IAssettoCorsaData } from "./types/broadcast/interfaces/AssettoCorsaData";
import { IAssettoCorsaCompetizioneData } from "./types/broadcast/interfaces/AssettoCorsaCompetizioneData";
import { getGameDataFromSharedMemory } from "./features/sharedMemory/getGameDataFromSharedMemory";
import { RealtimeUpdate } from "./types/broadcast/interfaces/realtimeUpdate";
import { TrackData } from "./types/broadcast/interfaces/trackData";
import { TeamCarDetails } from "./types/broadcast/interfaces/car";

export const AC_SDK: {
  getPhysics: () => any[];
  getGraphics: () => any[];
  getStatic: () => any[];
} = require("../build/Release/AssettoCorsaSDK.node");

export interface RealtimeCarAndEntryDataUpdate extends RealtimeCarUpdate {
  TeamCarDetails: TeamCarDetails;
}

interface AssettoCorsaEvents {
  ac_shared_memory_update: IAssettoCorsaData;
  acc_shared_memory_update: IAssettoCorsaCompetizioneData;
  acc_udp_cars_update: RealtimeCarAndEntryDataUpdate[];
  acc_udp_realtime_update: RealtimeUpdate;
  acc_udp_track_data: TrackData;
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

/**
 * AssettoCorsaSDK is a comprehensive SDK for interacting with Assetto Corsa and Assetto Corsa Competizione.
 *
 * This class provides:
 * - Shared memory integration for real-time game data retrieval.
 * - UDP broadcast support for Assetto Corsa Competizione.
 * - Type-safe event handling for game state changes, car updates, and track data.
 *
 * Key Features:
 * - Automatically detects the active game (Assetto Corsa or Assetto Corsa Competizione).
 * - Emits events for game data, including physics, graphics, and static information.
 * - Supports real-time updates for cars and tracks in Assetto Corsa Competizione.
 * - Provides a configurable update interval for shared memory polling.
 *
 * Usage:
 * - Instantiate the class with optional configuration for shared memory and UDP broadcast.
 * - Listen to events such as `ac_shared_memory_update`, `acc_shared_memory_update`, `acc_cars_update`, and more.
 * - Call `disconnect()` to clean up resources when done.
 */
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
  private entryList: TeamCarDetails[] = [];

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
        this.emit("ac_shared_memory_update", data);
      } else if (game === Game.AssettoCorsaCompetizione) {
        const data = getGameDataFromSharedMemory(
          game,
          graphics,
          physics,
          staticData
        );
        this.emit("acc_shared_memory_update", data);
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

      this.udpConnection?.addListener(
        "realtime_cars_and_entry_data_update",
        (data: RealtimeCarAndEntryDataUpdate[]) => {
          this.emit("acc_udp_cars_update", data);
        }
      );
    }

    this.udpConnection?.addListener("entry_list", (data: TeamCarDetails[]) => {
      this.entryList = data;
    });

    this.udpConnection?.addListener(
      "realtime_update",
      (data: RealtimeUpdate) => {
        this.emit("acc_udp_realtime_update", data);
      }
    );

    this.udpConnection?.addListener("track_data", (data: TrackData) => {
      this.emit("acc_udp_track_data", data);
    });
  }

  private onGameClose() {
    if (this.carsEmitTimeout) {
      clearInterval(this.carsEmitTimeout);
    }

    this.udpConnection?.disconnect();
    this.cars.clear();
    clearInterval(this.carsEmitTimeout!);
  }

  disconnect() {
    clearInterval(this.sharedMemoryInterval);
    return true;
  }
}
