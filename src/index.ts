// main.ts
import { EventEmitter } from "stream";
import { parsePhysicsArray } from "./utils/parsePhysicsArray";
const AC_SDK = require("../build/Release/AssettoCorsaSDK.node");

interface ACSDKConstructorInterface {
  updateMs?: number;
  broadcastName: string;
  broadcastPassword: string;
  broadcastCmdPassword?: string;
  broadcastPort?: number;
}

export default class AssettoCorsaSDK extends EventEmitter {
  private interval: NodeJS.Timeout | null = null;

  constructor({
    updateMs = 1000 / 60, // 60 Updates per second
    broadcastName: name,
    broadcastPassword: password,
    broadcastPort = 9000,
    broadcastCmdPassword = "",
  }: ACSDKConstructorInterface) {
    super();
  }
}

setInterval(() => {
  const physicsArray: any[] = AC_SDK.getPhysics();
  console.log(parsePhysicsArray(physicsArray));
}, 1000 / 60);
