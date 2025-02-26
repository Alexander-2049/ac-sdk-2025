import { SelectedGame } from "./selectedGame";

export interface PhysicsData {
  selectedGame: SelectedGame;
  packetId: number;
  throttle: number;
  brake: number;
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
  tc: number;
  heading: number;
  pitch: number;
  roll: number;
  cgHeight: number;
  carDamage: [number, number, number, number, number];
}
