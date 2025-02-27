// main.ts
import { EventEmitter } from "stream";
import { parsePhysicsArray } from "./utils/parsePhysicsArray";
const AC_SDK = require("../build/Release/AssettoCorsaSDK.node");

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
      const physics = parsePhysicsArray(physicsRawArray);
      this.emit("PHYSICS", physics);
    }, this.updateIntervalMs);
  }
}

const acsdk = new AssettoCorsaSDK({
  broadcastName: "",
  broadcastPassword: "",
});

acsdk.addListener("PHYSICS", (physics) => {
  console.log(physics);
})
