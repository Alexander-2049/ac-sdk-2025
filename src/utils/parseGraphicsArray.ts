import { GraphicsData } from "../types/graphics";

export const parseGraphicsArray = (data: any[]): GraphicsData => {
  let i = 0;

  return {
    stepIndex: data[i++], // ✔
    status: data[i++], // ✔
    session: data[i++], // ✔
    currentLapTime: data[i++], // ✔ 4:24:288 -:--:---
    lastLapTime: data[i++], // ✔    4:24:288 -:--:---
    bestLapTime: data[i++], // ✔    4:24:288 -:--:---
    split: data[i++], // ?
    completedLaps: data[i++], // ✔
    position: data[i++], // ✔
    currentLapTimeMs: data[i++], // ✔
    lastLapTimeMs: data[i++], // ✔
    bestLapTimeMs: data[i++], // ✔
    sessionTimeLeft: data[i++], // ✔
    distanceTraveled: data[i++], // ✔ (total meters traveled per session)
    isInPit: !!data[i++], // ✔
    currentSectorIndex: data[i++], // ✔
    lastSectorTimeMs: data[i++], // ✔
    numberOfLaps: data[i++], // ??? Shows 0
    tyreCompoundName: data[i++], // ✔
    replayTimeMultiplier: data[i++], // ✔
    normalizedCarPosition: data[i++], // ✔ Car position on track spline (0.0 start to 1.0
    carsOnTrack: data[i++], // X - Shows -1022053190
    carCoordinates: Array.from({ length: 60 }, () => [
      data[i++],
      data[i++],
      data[i++],
    ]),
    carID: Array.from({ length: 60 }, () => data[i++]),
    playerCarID: data[i++],
    penaltyTime: data[i++],
    flag: data[i++],
    penalty: data[i++],
    idealLineOn: data[i++],
    isInPitLane: data[i++],
    surfaceGrip: data[i++],
    mandatoryPitDone: data[i++],
    windSpeed: data[i++],
    windDirection: data[i++],
    isSetupMenuVisible: data[i++],
    mainDisplayIndex: data[i++],
    secondaryDisplayIndex: data[i++],
    TC: data[i++],
    TCCut: data[i++],
    EngineMap: data[i++],
    ABS: data[i++],
    fuelXLap: data[i++],
    rainLights: data[i++],
    flashingLights: data[i++],
    lightsStage: data[i++],
    exhaustTemperature: data[i++],
    wiperLV: data[i++],
    DriverStintTotalTimeLeft: data[i++],
    DriverStintTimeLeft: data[i++],
    rainTyres: data[i++],
  };
};
