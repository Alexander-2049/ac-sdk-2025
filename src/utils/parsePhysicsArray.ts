import { PhysicsData } from "../types/physics";
import { SelectedGame } from "../types/selectedGame";

export const parsePhysicsArray = (physicsArray: any[]): PhysicsData => {
  let i = 0;

  const result: PhysicsData = {
    // selectedGame: SelectedGame.NONE,
    stepIndex: physicsArray[i++], // ✔
    throttle: physicsArray[i++], // ✔
    brake: physicsArray[i++], // ✔
    fuel: physicsArray[i++], // ✔
    gear: physicsArray[i++] - 1, // ✔
    rpm: physicsArray[i++], // ✔
    steeringAngle: physicsArray[i++],
    speedKmh: physicsArray[i++],
    velocity: physicsArray[i++],
    accelerationG: physicsArray[i++],
    wheelSlipRatio: physicsArray[i++],
    wheelLoad: physicsArray[i++],
    wheelPressure: physicsArray[i++],
    wheelAngularSpeed: physicsArray[i++],
    tireWear: physicsArray[i++],
    tireDirtyLevel: physicsArray[i++],
    tireCoreTemperature: physicsArray[i++],
    wheelCamberRad: physicsArray[i++],
    suspensionTravel: physicsArray[i++],
    drs: physicsArray[i++],
    tc: physicsArray[i++] === 1,
    heading: physicsArray[i++],
    pitch: physicsArray[i++],
    roll: physicsArray[i++],
    cgHeight: physicsArray[i++],
    carDamage: physicsArray[i++],
    numberOfTyresOut: physicsArray[i++],
    pitLimiterOn: physicsArray[i++],
    abs: physicsArray[i++],
    kersCharge: physicsArray[i++],
    kersInput: physicsArray[i++],
    autoShifterOn: physicsArray[i++],
    rideHeight: physicsArray[i++],
    turboBoost: physicsArray[i++],
    ballast: physicsArray[i++],
    airDensity: physicsArray[i++],
    airTemp: physicsArray[i++],
    roadTemp: physicsArray[i++],
    localAngularVel: physicsArray[i++],
    finalFF: physicsArray[i++],
    performanceMeter: physicsArray[i++],
    engineBrake: physicsArray[i++],
    ersRecoveryLevel: physicsArray[i++],
    ersPowerLevel: physicsArray[i++],
    ersHeatCharging: physicsArray[i++],
    ersIsCharging: physicsArray[i++],
    kersCurrentKJ: physicsArray[i++],
    drsAvailable: physicsArray[i++],
    drsEnabled: physicsArray[i++],
    brakeTemp: physicsArray[i++],
    clutch: physicsArray[i++],
    tyreTempI: physicsArray[i++],
    tyreTempM: physicsArray[i++],
    tyreTempO: physicsArray[i++],
    isAIControlled: physicsArray[i++],
    tyreContactPoint: physicsArray[i++],
    tyreContactNormal: physicsArray[i++],
    tyreContactHeading: physicsArray[i++],
    brakeBias: physicsArray[i++],
    localVelocity: physicsArray[i++],
    P2PActivations: physicsArray[i++],
    P2PStatus: physicsArray[i++],
    currentMaxRpm: physicsArray[i++],
    mz: physicsArray[i++],
    fx: physicsArray[i++],
    fy: physicsArray[i++],
    slipRatio: physicsArray[i++],
    slipAngle: physicsArray[i++],
    tcinAction: physicsArray[i++],
    absInAction: physicsArray[i++],
    suspensionDamage: physicsArray[i++],
    tyreTemp: physicsArray[i++],
    waterTemp: physicsArray[i++],
    brakePressure: physicsArray[i++],
    frontBrakeCompound: physicsArray[i++],
    rearBrakeCompound: physicsArray[i++],
    padLife: physicsArray[i++],
    discLife: physicsArray[i++],
    isIgnitionOn: physicsArray[i++],
    isStarterEngineOn: physicsArray[i++],
    isEngineRunning: physicsArray[i++],
    kerbVibration: physicsArray[i++],
    slipVibrations: physicsArray[i++],
    gVibrations: physicsArray[i++],
    absVibrations: physicsArray[i++],
  };

  // console.log({ isIgnitionOn: result.isIgnitionOn, isStarterEngineOn: result.isStarterEngineOn });
  console.log("--------------------------")
  console.log({
    // selectedGame: result.selectedGame,
    wheelPressure: result.wheelPressure,
    wheelAngularSpeed: result.wheelAngularSpeed,
    tyreWear: result.tireWear,
    tyreDirtyLevel: result.tireDirtyLevel,
    tyreCoreTemperature: result.tireCoreTemperature,
    wheelCamberRad: result.wheelCamberRad,
    suspensionTravel: result.suspensionTravel,
  });

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
    result.accelerationG[0],
    result.accelerationG[1],
    result.accelerationG[2],
    result.wheelSlipRatio[0],
    result.wheelSlipRatio[1],
    result.wheelSlipRatio[2],
    result.wheelSlipRatio[3],
  ];

  // for (let i = 0; i < valuesInBothGames.length; i++) {
  //   const value = valuesInBothGames[i];
  //   if (typeof value === "number" && value !== 0) {
  //     result.selectedGame = SelectedGame.ASSETTO_CORSA;
  //     break;
  //   }
  // }

  return result;
};
