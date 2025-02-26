import { PhysicsData } from "../types/physics";

export const parsePhysicsArray = (physicsArray: any[]): PhysicsData => {
  return {
    packetId: physicsArray[0],
    throttle: physicsArray[1],
    brake: physicsArray[2],
    fuel: physicsArray[3],
    gear: physicsArray[4],
    rpm: physicsArray[5],
    steeringAngle: physicsArray[6],
    speedKmh: physicsArray[7],
    velocity: physicsArray[8],
    accG: physicsArray[9],
    wheelSlip: physicsArray[10],
  };
};
