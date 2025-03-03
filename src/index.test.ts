import AssettoCorsaSDK from ".";

import { PhysicsData } from "./types/physics";
import { SelectedGame } from "./types/selectedGame";

describe("AssettoCorsaSDK", () => {
  let sdk: AssettoCorsaSDK;
  const mockPhysics: PhysicsData = {
    selectedGame: SelectedGame.ASSETTO_CORSA,
    packetId: 1,
    throttle: 0.5,
    brake: 0.3,
    fuel: 75.4,
    gear: 3,
    rpm: 4500,
    steeringAngle: 15.2,
    speedKmh: 120,
    velocity: [0.5, 0.2, -0.3],
    accG: [0.2, 0.3, 0.1],
    wheelSlip: [0.01, 0.02, 0.03, 0.04],
    wheelLoad: [100, 200, 150, 120],
    wheelPressure: [1.5, 1.6, 1.7, 1.8],
    wheelAngularSpeed: [10, 12, 14, 16],
    tyreWear: [0.1, 0.2, 0.15, 0.3],
    tyreDirtyLevel: [0.05, 0.1, 0.08, 0.12],
    tyreCoreTemperature: [30, 32, 28, 29],
    camberRAD: [0.02, 0.03, 0.01, 0.04],
    suspensionTravel: [5, 6, 4, 3],
    drs: 0,
    tc: 1,
    heading: 90,
    pitch: 0.5,
    roll: 0.2,
    cgHeight: 0.3,
    carDamage: [0, 0, 0, 0, 0],
  };
  // const mockGraphics = { display: "HD" };
  // const mockStatic = { track: "Monza" };

  beforeEach(() => {
    jest.clearAllMocks();

    sdk = new AssettoCorsaSDK({
      sharedMemory: { updateIntervalMs: 1000 },
    });
  });

  afterEach(() => {
    sdk.disconnect();
  });

  it("should allow adding listeners for events", () => {
    const physicsListener = jest.fn();
    sdk.addListener("physics", physicsListener);

    // Simulate emitting an event
    sdk.emit("physics", mockPhysics);

    expect(physicsListener).toHaveBeenCalledWith(mockPhysics);
  });
});
