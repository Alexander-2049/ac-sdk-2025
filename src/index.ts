import { EventEmitter } from "stream";
import { parsePhysicsArray } from "./utils/parsePhysicsArray";
import { PhysicsData } from "./types/physics";
import { GraphicsData } from "./types/graphics";
import { StaticData } from "./types/static";
import { parseGraphicsArray } from "./utils/parseGraphicsArray";
import { parseStaticArray } from "./utils/parseStaticArray";

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
}

interface ACSDKSharedMemoryInterface {
  updateIntervalMs?: number;
}

interface ACSDKConstructorInterface {
  sharedMemory?: ACSDKSharedMemoryInterface;
  broadcast?: ACSDKBroadcastInterface;
}

export default class AssettoCorsaSDK extends EventEmitter {
  private sharedMemoryInterval?: NodeJS.Timeout;
  private sharedMemory?: {
    updateIntervalMs: number;
  };
  private broadcast?: {
    password: string;
    name: string;
    cmdPassword: string;
    port: number;
  };

  constructor({ broadcast, sharedMemory }: ACSDKConstructorInterface) {
    super();

    this.broadcast = broadcast && {
      name: broadcast.name,
      cmdPassword: broadcast.cmdPassword || "",
      password: broadcast.password,
      port: broadcast.port || 9000,
    };

    this.sharedMemory = sharedMemory && {
      updateIntervalMs:
        sharedMemory.updateIntervalMs || 1000 / 60 /* 60 Updates Per Second */,
    };

    if (this.sharedMemory) {
      this.sharedMemoryInterval = setInterval(() => {
        const physicsRawArray = AC_SDK.getPhysics();
        const physics: PhysicsData = parsePhysicsArray(physicsRawArray);
        this.emit("physics", physics);

        const graphicsRawArray = AC_SDK.getGraphics();
        const graphics: GraphicsData = parseGraphicsArray(graphicsRawArray);
        this.emit("graphics", graphics);

        const staticRawArray = AC_SDK.getStatic();
        const staticData: StaticData = parseStaticArray(staticRawArray);
        this.emit("static", staticData);
      }, this.sharedMemory.updateIntervalMs);
    }
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

  stop() {
    clearInterval(this.sharedMemoryInterval);
    return true;
  }
}
