// import { SelectedGame } from "./selectedGame";

export interface PhysicsData {
  // selectedGame: SelectedGame;     // [Assetto Corsa Competizione : Assetto Corsa]
  stepIndex: number;                                         // [✔ : ?] Current step index
  throttle: number;                                          // [✔ : ?] Amount of throttle applied [0:1]
  brake: number;                                             // [✔ : ?] Amount of brake applied [0:1]
  fuel: number;                                              // [✔ : ?] Amount of fuel left in liters
  gear: number;                                              // [✔ : ?] Selected gear (-1 = reverse, 0 = neutral, 1 = first gear, etc...)
  rpm: number;                                               // [✔ : ?] RPM (int)
  steeringAngle: number;                                     // [✔ : ?] Steering angle where -1 is fully steer to the left and 1 is fully steer to the right
  speedKmh: number;                                          // [✔ : ?] Speed in kilometers per hour
  velocity: [number, number, number];                        // [✔ : ?] Vector speeds in meters per second
  accelerationG: [number, number, number];                   // [✔ : ?] Acceleration or G-Forces
  wheelSlipRatio: [number, number, number, number];          // [✔ : ?] Wheel slip refers to the difference between the actual wheel speed and the vehicle's movement speed [FL, FR, RL, RR]
  wheelLoad: [number, number, number, number];               // [✖ : ?] [FL, FR, RL, RR]
  wheelPressure: [number, number, number, number];           // [✔ : ?] Wheel pressure in psi [FL, FR, RL, RR]
  wheelAngularSpeed: [number, number, number, number];       // [✔ : ?] Wheel angular speed in rad/s [FL, FR, RL, RR]
  tireWear: [number, number, number, number];                // [✖ : ?] Tyre wear [FL, FR, RL, RR]
  tireDirtyLevel: [number, number, number, number];          // [✖ : ?] Dirt accumulated on tyre surface [FL, FR, RL, RR]
  tireCoreTemperature: [number, number, number, number];     // [✔ : ?] Tyre rubber core temperature [FL, FR, RL, RR]
  wheelCamberRad: [number, number, number, number];          // [✖ : ?] Wheels camber in radians [FL, FR, RL, RR]
  suspensionTravel: [number, number, number, number];        // [✔ : ?] Suspension travel [FL, FR, RL, RR]
  drs: number;
  tc: boolean;
  heading: number;
  pitch: number;
  roll: number;
  cgHeight: number;
  carDamage: [number, number, number, number, number];
  numberOfTyresOut: number;
  pitLimiterOn: number;
  abs: number;
  kersCharge: number;
  kersInput: number;
  autoShifterOn: number;
  rideHeight: [number, number];
  turboBoost: number;
  ballast: number;
  airDensity: number;
  airTemp: number;
  roadTemp: number;
  localAngularVel: [number, number, number];
  finalFF: number;
  performanceMeter: number;

  engineBrake: number;
  ersRecoveryLevel: number;
  ersPowerLevel: number;
  ersHeatCharging: number;
  ersIsCharging: number;
  kersCurrentKJ: number;

  drsAvailable: number;
  drsEnabled: number;

  brakeTemp: [number, number, number, number];
  clutch: number;

  tyreTempI: [number, number, number, number];
  tyreTempM: [number, number, number, number];
  tyreTempO: [number, number, number, number];

  isAIControlled: number;

  tyreContactPoint: [
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number]
  ];
  tyreContactNormal: [
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number]
  ];
  tyreContactHeading: [
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number]
  ];

  brakeBias: number;

  localVelocity: [number, number, number];

  P2PActivations: number;
  P2PStatus: number;

  currentMaxRpm: number;

  mz: [number, number, number, number];
  fx: [number, number, number, number];
  fy: [number, number, number, number];
  slipRatio: [number, number, number, number];
  slipAngle: [number, number, number, number];

  tcinAction: number;
  absInAction: number;
  suspensionDamage: [number, number, number, number];
  tyreTemp: [number, number, number, number];

  waterTemp: number;
  brakePressure: [number, number, number, number];
  frontBrakeCompound: number;
  rearBrakeCompound: number;
  padLife: [number, number, number, number];
  discLife: [number, number, number, number];
  isIgnitionOn: number;
  isStarterEngineOn: number;
  isEngineRunning: number;
  kerbVibration: number;
  slipVibrations: number;
  gVibrations: number;
  absVibrations: number;
}
