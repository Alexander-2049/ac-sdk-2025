import { EventEmitter } from "stream";
import { parsePhysicsArray } from "./utils/parsePhysicsArray";
import { PhysicsData } from "./types/physics";

const AC_SDK: {
  getPhysics: () => any[];
  getGraphics: () => any[];
  getStatic: () => any[];
} = require("../build/Release/AssettoCorsaSDK.node");

interface AssettoCorsaEvents {
  physics: PhysicsData;
}

interface ACSDKConstructorInterface {
  updateIntervalMs?: number;
  broadcastName: string;
  broadcastPassword: string;
  broadcastCmdPassword?: string;
  broadcastPort?: number;
}

export default class AssettoCorsaSDK extends EventEmitter {
  private interval: NodeJS.Timeout | null = null;
  private updateIntervalMs: number;
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

    this.updateIntervalMs = updateIntervalMs;
    this.broadcastName = broadcastName;
    this.broadcastPassword = broadcastPassword;
    this.broadcastPort = broadcastPort;
    this.broadcastCmdPassword = broadcastCmdPassword;

    this.interval = setInterval(() => {
      const physicsRawArray = AC_SDK.getPhysics();
      const physics: PhysicsData = parsePhysicsArray(physicsRawArray);
      this.emit("physics", physics);
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
