// physics.d.ts
export interface PhysicsData {
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
}
