import { SelectedGame } from "./selectedGame";

export interface PhysicsData {
  selectedGame: SelectedGame;
  packetId: number;
  throttle: number; // Amount of throttle applied
  brake: number; // Amount of brake applied
  fuel: number;
  gear: number;
  rpm: number;
  steeringAngle: number;
  speedKmh: number;
  velocity: [number, number, number];
  accG: [number, number, number];
  wheelSlip: [number, number, number, number];
  wheelLoad: [number, number, number, number];
  wheelPressure: [number, number, number, number];
  wheelAngularSpeed: [number, number, number, number];
  tyreWear: [number, number, number, number];
  tyreDirtyLevel: [number, number, number, number];
  tyreCoreTemperature: [number, number, number, number];
  camberRAD: [number, number, number, number];
  suspensionTravel: [number, number, number, number];
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
