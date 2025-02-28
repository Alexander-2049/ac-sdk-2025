import { EventEmitter } from "stream";
import { parsePhysicsArray } from "./utils/parsePhysicsArray";
import { PhysicsData } from "./types/physics";
import { GraphicsData } from "./types/graphics";
import { StaticData } from "./types/static";
import { parseGraphicsArray } from "./utils/parseGraphicsArray";
import { parseStaticArray } from "./utils/parseStaticArray";

const AC_SDK: {
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
  broadcastName: string;
  broadcastPassword: string;
  broadcastCmdPassword?: string;
  broadcastPort?: number;
}

interface ACSDKConstructorInterface {
  updateIntervalMs?: number;
  broadcast: ACSDKBroadcastInterface | null;
}

export default class AssettoCorsaSDK extends EventEmitter {
  private interval: NodeJS.Timeout | null = null;
  private updateIntervalMs: number;
  private broadcast: 
  private broadcastName: string;
  private broadcastPassword: string;
  private broadcastPort: number;
  private broadcastCmdPassword: string;

  constructor({
    updateIntervalMs = 1000 / 60, // 60 Updates per second
    broadcastName,
    broadcastPassword,
    broadcastPort = 9000,
    broadcastCmdPassword = "",
  }: ACSDKConstructorInterface) {
    super();

    // this.updateIntervalMs = updateIntervalMs;
    // this.broadcastName = broadcastName;
    // this.broadcastPassword = broadcastPassword;
    // this.broadcastPort = broadcastPort;
    // this.broadcastCmdPassword = broadcastCmdPassword;

    this.interval = setInterval(() => {
      const physicsRawArray = AC_SDK.getPhysics();
      const physics: PhysicsData = parsePhysicsArray(physicsRawArray);
      this.emit("physics", physics);

      const graphicsRawArray = AC_SDK.getGraphics();
      const graphics: GraphicsData = parseGraphicsArray(graphicsRawArray);
      this.emit("graphics", graphics);

      const staticRawArray = AC_SDK.getStatic();
      const staticData: StaticData = parseStaticArray(staticRawArray);
      this.emit("static", staticData);
    }, this.updateIntervalMs);
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
}
