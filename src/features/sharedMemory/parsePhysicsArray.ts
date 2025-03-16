export interface IPhysics {
  readonly stepIndex: number; // [✔ : ?] Current step index
  readonly throttle: number; // [✔ : ?] Amount of throttle applied [0:1]
  readonly brake: number; // [✔ : ?] Amount of brake applied [0:1]
  readonly fuel: number; // [✔ : ?] Amount of fuel left in liters
  readonly gear: number; // [✔ : ?] Selected gear (-1 = reverse, 0 = neutral, 1 = first gear, etc...)
  readonly rpm: number; // [✔ : ?] RPM (int)
  readonly steeringAngle: number; // [✔ : ?] Steering angle where -1 is fully steer to the left and 1 is fully steer to the right
  readonly speedKmh: number; // [✔ : ?] Speed in kilometers per hour
  readonly velocity: [number, number, number]; // [✔ : ?] Vector speeds in meters per second
  readonly accelerationG: [number, number, number]; // [✔ : ?] Acceleration or G-Forces
  readonly wheelSlipRatio: [number, number, number, number]; // [✔ : ?] Wheel slip refers to the difference between the actual wheel speed and the vehicle's movement speed [FL, FR, RL, RR]
  readonly wheelLoad: [number, number, number, number]; // [✖ : ?] [FL, FR, RL, RR]
  readonly wheelPressure: [number, number, number, number]; // [✔ : ?] Wheel pressure in psi [FL, FR, RL, RR]
  readonly wheelAngularSpeed: [number, number, number, number]; // [✔ : ?] Wheel angular speed in rad/s [FL, FR, RL, RR]
  readonly tireWear: [number, number, number, number]; // [✖ : ?] Tire wear [FL, FR, RL, RR]
  readonly tireDirtyLevel: [number, number, number, number]; // [✖ : ?] Dirt accumulated on tire surface [FL, FR, RL, RR]
  readonly tireCoreTemperature: [number, number, number, number]; // [✔ : ?] Tire rubber core temperature [FL, FR, RL, RR]
  readonly wheelCamberRad: [number, number, number, number]; // [✖ : ?] Wheels camber in radians [FL, FR, RL, RR]
  readonly suspensionTravel: [number, number, number, number]; // [✔ : ?] Suspension travel [FL, FR, RL, RR]
  readonly drs: number;
  readonly tc: boolean;
  readonly heading: number;
  readonly pitch: number;
  readonly roll: number;
  readonly cgHeight: number;
  readonly carDamage: [number, number, number, number, number];
  readonly numberOfTiresOut: number;
  readonly pitLimiterOn: number;
  readonly abs: number;
  readonly kersCharge: number;
  readonly kersInput: number;
  readonly autoShifterOn: number;
  readonly rideHeight: [number, number];
  readonly turboBoost: number;
  readonly ballast: number;
  readonly airDensity: number;
  readonly airTemp: number;
  readonly roadTemp: number;
  readonly localAngularVel: [number, number, number];
  readonly finalFF: number;
  readonly performanceMeter: number;
  readonly engineBrake: number;
  readonly ersRecoveryLevel: number;
  readonly ersPowerLevel: number;
  readonly ersHeatCharging: number;
  readonly ersIsCharging: boolean;
  readonly kersCurrentKJ: number;
  readonly drsAvailable: number;
  readonly drsEnabled: number;
  readonly brakeTemp: [number, number, number, number];
  readonly clutch: number;
  readonly tireTempI: [number, number, number, number];
  readonly tireTempM: [number, number, number, number];
  readonly tireTempO: [number, number, number, number];
  readonly isAIControlled: boolean;
  readonly tireContactPoint: [
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number]
  ];
  readonly tireContactNormal: [
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number]
  ];
  readonly tireContactHeading: [
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number]
  ];
  readonly brakeBias: number;
  readonly localVelocity: [number, number, number];
  readonly P2PActivations: number;
  readonly P2PStatus: number;
  readonly currentMaxRpm: number;
  readonly mz: [number, number, number, number];
  readonly fx: [number, number, number, number];
  readonly fy: [number, number, number, number];
  readonly slipRatio: [number, number, number, number];
  readonly slipAngle: [number, number, number, number];
  readonly tcinAction: number;
  readonly absInAction: number;
  readonly suspensionDamage: [number, number, number, number];
  readonly tireTemp: [number, number, number, number];
  readonly waterTemp: number;
  readonly brakePressure: [number, number, number, number];
  readonly frontBrakeCompound: number;
  readonly rearBrakeCompound: number;
  readonly padLife: [number, number, number, number];
  readonly discLife: [number, number, number, number];
  readonly isIgnitionOn: boolean;
  readonly isStarterEngineOn: boolean;
  readonly isEngineRunning: boolean;
  readonly kerbVibration: number;
  readonly slipVibrations: number;
  readonly gVibrations: number;
  readonly absVibrations: number;
}

export const parsePhysicsArray = (physicsArray: any[]): IPhysics => {
  let i = 0;

  const result: IPhysics = {
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
    numberOfTiresOut: physicsArray[i++],
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
    ersIsCharging: !!physicsArray[i++],
    kersCurrentKJ: physicsArray[i++],
    drsAvailable: physicsArray[i++],
    drsEnabled: physicsArray[i++],
    brakeTemp: physicsArray[i++],
    clutch: physicsArray[i++],
    tireTempI: physicsArray[i++],
    tireTempM: physicsArray[i++],
    tireTempO: physicsArray[i++],
    isAIControlled: !!physicsArray[i++],
    tireContactPoint: physicsArray[i++],
    tireContactNormal: physicsArray[i++],
    tireContactHeading: physicsArray[i++],
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
    tireTemp: physicsArray[i++],
    waterTemp: physicsArray[i++],
    brakePressure: physicsArray[i++],
    frontBrakeCompound: physicsArray[i++],
    rearBrakeCompound: physicsArray[i++],
    padLife: physicsArray[i++],
    discLife: physicsArray[i++],
    isIgnitionOn: !!physicsArray[i++],
    isStarterEngineOn: !!physicsArray[i++],
    isEngineRunning: !!physicsArray[i++],
    kerbVibration: physicsArray[i++],
    slipVibrations: physicsArray[i++],
    gVibrations: physicsArray[i++],
    absVibrations: physicsArray[i++],
  };

  return result;
};
