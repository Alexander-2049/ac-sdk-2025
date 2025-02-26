import { PhysicsData } from "../types/physics";
import { SelectedGame } from "../types/selectedGame";

export const parsePhysicsArray = (physicsArray: any[]): PhysicsData => {
  const result: PhysicsData = {
    selectedGame: SelectedGame.NONE,
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
    wheelLoad: physicsArray[11],
    wheelPressure: physicsArray[12],
    wheelAngularSpeed: physicsArray[13],
    tyreWear: physicsArray[14],
    tyreDirtyLevel: physicsArray[15],
    tyreCoreTemperature: physicsArray[16],
    camberRAD: physicsArray[17],
    suspensionTravel: physicsArray[18],
    drs: physicsArray[19],
    tc: physicsArray[20],
    heading: physicsArray[21],
    pitch: physicsArray[22],
    roll: physicsArray[23],
    cgHeight: physicsArray[24],
    carDamage: physicsArray[25],
  };

  const valuesInBothGames = [
    result.throttle,
    result.brake,
    result.fuel,
    result.gear,
    result.rpm,
    result.steeringAngle,
    result.speedKmh,
    result.velocity[0],
    result.velocity[1],
    result.velocity[2],
    result.accG[0],
    result.accG[1],
    result.accG[2],
    result.wheelSlip[0],
    result.wheelSlip[1],
    result.wheelSlip[2],
    result.wheelSlip[3],
  ];

  for (let i = 0; i < valuesInBothGames.length; i++) {
    const value = valuesInBothGames[i];
    if (typeof value === "number" && value !== 0) {
      result.selectedGame = SelectedGame.ASSETTO_CORSA;
      break;
    }
  }

  return result;
};
