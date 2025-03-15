enum PENALTY_TYPE {
  None,
  DriveThrough_Cutting,
  StopAndGo_10_Cutting,
  StopAndGo_20_Cutting,
  StopAndGo_30_Cutting,
  Disqualified_Cutting,
  RemoveBestLaptime_Cutting,
  DriveThrough_PitSpeeding,
  StopAndGo_10_PitSpeeding,
  StopAndGo_20_PitSpeeding,
  StopAndGo_30_PitSpeeding,
  Disqualified_PitSpeeding,
  RemoveBestLaptime_PitSpeeding,
  Disqualified_IgnoredMandatoryPit,
  PostRaceTime,
  Disqualified_Trolling,
  Disqualified_PitEntry,
  Disqualified_PitExit,
  Disqualified_WrongWay,
  DriveThrough_IgnoredDriverStint,
  Disqualified_IgnoredDriverStint,
  Disqualified_ExceededDriverStintLimit,
}

enum SESSION_TYPE {
  UNKNOWN = -1,
  PRACTICE = 0,
  QUALIFY = 1,
  RACE = 2,
  HOTLAP = 3,
  TIME_ATTACK = 4,
  DRIFT = 5,
  DRAG = 6,
  HOTSTINT = 7,
  HOTLAPSUPERPOLE = 8,
}

enum FLAG_TYPE {
  AC_NO_FLAG = 0,
  AC_BLUE_FLAG = 1,
  AC_YELLOW_FLAG = 2,
  AC_BLACK_FLAG = 3,
  AC_WHITE_FLAG = 4,
  AC_CHECKERED_FLAG = 5,
  AC_PENALTY_FLAG = 6,
}

enum TRACK_GRIP_STATUS {
  ACC_GREEN = 0,
  ACC_FAST = 1,
  ACC_OPTIMUM = 2,
  ACC_GREASY = 3,
  ACC_DAMP = 4,
  ACC_WET = 5,
  ACC_FLOODED = 6,
}

enum RAIN_INTENSITY {
  ACC_NO_RAIN = 0,
  ACC_DRIZZLE = 1,
  ACC_LIGHT_RAIN = 2,
  ACC_MEDIUM_RAIN = 3,
  ACC_HEAVY_RAIN = 4,
  ACC_THUNDERSTORM = 5,
}

export enum GAME_STATUS {
  OFF = 0,
  REPLAY = 1,
  LIVE = 2,
  PAUSE = 3,
}

export interface IGraphics {
  readonly stepIndex: number;
  readonly status: GAME_STATUS;
  readonly session: SESSION_TYPE;
  readonly currentLapTime: string;
  readonly lastLapTime: string;
  readonly bestLapTime: string;
  readonly split: string;
  readonly completedLaps: number;
  readonly position: number;
  readonly currentLapTimeMs: number;
  readonly lastLapTimeMs: number;
  readonly bestLapTimeMs: number;
  readonly sessionTimeLeft: number;
  readonly distanceTraveled: number;
  readonly isInPit: boolean;
  readonly currentSectorIndex: number;
  readonly lastSectorTimeMs: number;
  readonly numberOfLaps: number;
  readonly tyreCompoundName: string;
  readonly replayTimeMultiplier: number;
  readonly normalizedCarPosition: number;
  readonly carsOnTrack: number;
  readonly carCoordinates: [number, number, number][];
  readonly carID: number[];
  readonly playerCarID: number;
  readonly penaltyTime: number;
  readonly flag: FLAG_TYPE;
  readonly penalty: PENALTY_TYPE;
  readonly isIdealLineOn: boolean;
  readonly isInPitLane: boolean;
  readonly surfaceGrip: number;
  readonly isMandatoryPitDone: boolean;
  readonly windSpeed: number;
  readonly windDirection: number;
  readonly isSetupMenuVisible: boolean;
  readonly mainDisplayIndex: number;
  readonly secondaryDisplayIndex: number;
  readonly tractionControlLevel: number;
  readonly tractionControlCut: number;
  readonly engineMap: number;
  readonly abs: number;
  readonly averageFuelConsumptionPerLap: number;
  readonly rainLights: number;
  readonly flashingLights: number;
  readonly lightsStage: number;
  readonly exhaustTemperature: number;
  readonly wiperLV: number;
  readonly driverStintTotalTimeLeft: number;
  readonly driverStintTimeLeft: number;
  readonly rainTyres: number;
  readonly sessionIndex: number;
  readonly usedFuel: number;
  readonly deltaLapTime: string;
  readonly iDeltaLapTime: number;
  readonly estimatedLapTime: string;
  readonly iEstimatedLapTime: number;
  readonly isDeltaPositive: boolean;
  readonly iSplit: number;
  readonly isValidLap: boolean;
  readonly fuelEstimatedLaps: number;
  readonly trackStatus: string;
  readonly missingMandatoryPits: number;
  readonly clock: number;
  readonly directionLightsLeft: boolean;
  readonly directionLightsRight: boolean;
  readonly globalYellow: boolean;
  readonly globalYellow1: boolean;
  readonly globalYellow2: boolean;
  readonly globalYellow3: boolean;
  readonly globalWhite: boolean;
  readonly globalGreen: boolean;
  readonly globalChequered: boolean;
  readonly globalRed: boolean;
  readonly mfdTyreSet: number;
  readonly mfdFuelToAdd: number;
  readonly mfdTyrePressureLF: number;
  readonly mfdTyrePressureRF: number;
  readonly mfdTyrePressureLR: number;
  readonly mfdTyrePressureRR: number;
  readonly trackGripStatus: TRACK_GRIP_STATUS;
  readonly rainIntensity: RAIN_INTENSITY;
  readonly rainIntensityIn10min: number;
  readonly rainIntensityIn30min: number;
  readonly currentTyreSet: number;
  readonly strategyTyreSet: number;
  readonly gapAhead: number;
  readonly gapBehind: number;
}

export const parseGraphicsArray = (data: any[]): IGraphics => {
  let i = 0;

  return {
    stepIndex: data[i++],
    status: data[i++],
    session: data[i++],
    currentLapTime: data[i++],
    lastLapTime: data[i++],
    bestLapTime: data[i++],
    split: data[i++],
    completedLaps: data[i++],
    position: data[i++],
    currentLapTimeMs: data[i++],
    lastLapTimeMs: data[i++],
    bestLapTimeMs: data[i++],
    sessionTimeLeft: data[i++],
    distanceTraveled: data[i++],
    isInPit: !!data[i++],
    currentSectorIndex: data[i++],
    lastSectorTimeMs: data[i++],
    numberOfLaps: data[i++],
    tyreCompoundName: data[i++],
    replayTimeMultiplier: data[i++],
    normalizedCarPosition: data[i++],
    carsOnTrack: data[i++],
    carCoordinates: Array.from({ length: 60 }, () => {
      const x = data[i++];
      const y = data[i++];
      const z = data[i++];
      return [x, y, z] as [number, number, number];
    }).filter(
      (coords) => coords[0] !== 0 && coords[1] !== 0 && coords[2] !== 0
    ),
    carID: Array.from({ length: 60 }, () => data[i++]).filter((id) => id !== 0),
    playerCarID: data[i++],
    penaltyTime: data[i++],
    flag: data[i++],
    penalty: data[i++],
    isIdealLineOn: !!data[i++],
    isInPitLane: !!data[i++],
    surfaceGrip: data[i++],
    isMandatoryPitDone: !!data[i++],
    windSpeed: data[i++],
    windDirection: data[i++],
    isSetupMenuVisible: !!data[i++],
    mainDisplayIndex: data[i++],
    secondaryDisplayIndex: data[i++],
    tractionControlLevel: data[i++],
    tractionControlCut: data[i++],
    engineMap: data[i++],
    abs: data[i++],
    averageFuelConsumptionPerLap: data[i++],
    rainLights: data[i++],
    flashingLights: data[i++],
    lightsStage: data[i++],
    exhaustTemperature: data[i++],
    wiperLV: data[i++],
    driverStintTotalTimeLeft: data[i++],
    driverStintTimeLeft: data[i++],
    rainTyres: data[i++],
    sessionIndex: data[i++],
    usedFuel: data[i++],
    deltaLapTime: data[i++],
    iDeltaLapTime: data[i++],
    estimatedLapTime: data[i++],
    iEstimatedLapTime: data[i++],
    isDeltaPositive: !!data[i++],
    iSplit: data[i++],
    isValidLap: !!data[i++],
    fuelEstimatedLaps: data[i++],
    trackStatus: data[i++],
    missingMandatoryPits: data[i++],
    clock: data[i++],
    directionLightsLeft: !!data[i++],
    directionLightsRight: !!data[i++],
    globalYellow: !!data[i++],
    globalYellow1: !!data[i++],
    globalYellow2: !!data[i++],
    globalYellow3: !!data[i++],
    globalWhite: !!data[i++],
    globalGreen: !!data[i++],
    globalChequered: !!data[i++],
    globalRed: !!data[i++],
    mfdTyreSet: data[i++],
    mfdFuelToAdd: data[i++],
    mfdTyrePressureLF: data[i++],
    mfdTyrePressureRF: data[i++],
    mfdTyrePressureLR: data[i++],
    mfdTyrePressureRR: data[i++],
    trackGripStatus: data[i++],
    rainIntensity: data[i++],
    rainIntensityIn10min: data[i++],
    rainIntensityIn30min: data[i++],
    currentTyreSet: data[i++],
    strategyTyreSet: data[i++],
    gapAhead: data[i++],
    gapBehind: data[i++],
  };
};
