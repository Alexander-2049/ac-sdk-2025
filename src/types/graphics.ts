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

export interface GraphicsData {
  stepIndex: number;
  status: GAME_STATUS;
  session: SESSION_TYPE;
  currentLapTime: string;
  lastLapTime: string;
  bestLapTime: string;
  split: string;
  completedLaps: number;
  position: number;
  currentLapTimeMs: number;
  lastLapTimeMs: number;
  bestLapTimeMs: number;
  sessionTimeLeft: number;
  distanceTraveled: number;
  isInPit: boolean;
  currentSectorIndex: number;
  lastSectorTimeMs: number;
  numberOfLaps: number;
  tyreCompoundName: string;
  replayTimeMultiplier: number;
  normalizedCarPosition: number;
  carsOnTrack: number;
  carCoordinates: [number, number, number][];
  carID: number[];
  playerCarID: number;
  penaltyTime: number;
  flag: FLAG_TYPE;
  penalty: PENALTY_TYPE;
  isIdealLineOn: boolean;
  isInPitLane: boolean;
  surfaceGrip: number;
  isMandatoryPitDone: boolean;
  windSpeed: number;
  windDirection: number;
  isSetupMenuVisible: boolean;
  mainDisplayIndex: number;
  secondaryDisplayIndex: number;
  tractionControlLevel: number;
  tractionControlCut: number;
  engineMap: number;
  abs: number;
  averageFuelConsumptionPerLap: number;
  rainLights: number;
  flashingLights: number;
  lightsStage: number;
  exhaustTemperature: number;
  wiperLV: number;
  driverStintTotalTimeLeft: number;
  driverStintTimeLeft: number;
  rainTyres: number;
  sessionIndex: number;
  usedFuel: number;
  deltaLapTime: string;
  iDeltaLapTime: number;
  estimatedLapTime: string;
  iEstimatedLapTime: number;
  isDeltaPositive: boolean;
  iSplit: number;
  isValidLap: boolean;
  fuelEstimatedLaps: number;
  trackStatus: string;
  missingMandatoryPits: number;
  clock: number;
  directionLightsLeft: boolean;
  directionLightsRight: boolean;
  globalYellow: boolean;
  globalYellow1: boolean;
  globalYellow2: boolean;
  globalYellow3: boolean;
  globalWhite: boolean;
  globalGreen: boolean;
  globalChequered: boolean;
  globalRed: boolean;
  mfdTyreSet: number;
  mfdFuelToAdd: number;
  mfdTyrePressureLF: number;
  mfdTyrePressureRF: number;
  mfdTyrePressureLR: number;
  mfdTyrePressureRR: number;
  trackGripStatus: TRACK_GRIP_STATUS;
  rainIntensity: RAIN_INTENSITY;
  rainIntensityIn10min: number;
  rainIntensityIn30min: number;
  currentTyreSet: number;
  strategyTyreSet: number;
  gapAhead: number;
  gapBehind: number;
}
