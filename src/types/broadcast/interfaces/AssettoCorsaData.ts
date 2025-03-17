import {
  FLAG_TYPE,
  GAME_STATUS,
  PENALTY_TYPE,
  RAIN_INTENSITY,
  SESSION_TYPE,
  TRACK_GRIP_STATUS,
} from "../../../features/sharedMemory/parseGraphicsArray";

const unusedFieldsInAssettoCorsa = [
  "maxTurboBoost",
  "deprecated_1",
  "deprecated_2",
  "aidMechanicalDamage",
  "hasDRS",
  "hasERS",
  "hasKERS",
  "kersMaxJ",
  "engineBrakeSettingsCount",
  "ersPowerControllerCount",
  "ersMaxJ",
  "isTimedRace",
  "hasExtraLap",
  "reversedGridPositions",
  "pitWindowStart",
  "pitWindowEnd",
  "isOnline",
  "dryTiresName",
  "wetTiresName",
  "carID",
  "playerCarID",
  "penaltyTime",
  "flag",
  "penalty",
  "isIdealLineOn",
  "isInPitLane",
  "surfaceGrip",
  "isMandatoryPitDone",
  "windSpeed",
  "windDirection",
  "isSetupMenuVisible",
  "mainDisplayIndex",
  "secondaryDisplayIndex",
  "tractionControlLevel",
  "tractionControlCut",
  "engineMap",
  "abs2",
  "averageFuelConsumptionPerLap",
  "rainLights",
  "flashingLights",
  "lightsStage",
  "exhaustTemperature",
  "wiperLV",
  "driverStintTotalTimeLeft",
  "driverStintTimeLeft",
  "rainTires",
  "sessionIndex",
  "usedFuel",
  "deltaLapTime",
  "iDeltaLapTime",
  "estimatedLapTime",
  "iEstimatedLapTime",
  "isDeltaPositive",
  "iSplit",
  "isValidLap",
  "fuelEstimatedLaps",
  "trackStatus",
  "missingMandatoryPits",
  "clock",
  "directionLightsLeft",
  "directionLightsRight",
  "globalYellow",
  "globalYellow1",
  "globalYellow2",
  "globalYellow3",
  "globalWhite",
  "globalGreen",
  "globalChequered",
  "globalRed",
  "mfdTireSet",
  "mfdFuelToAdd",
  "mfdTirePressureLF",
  "mfdTirePressureRF",
  "mfdTirePressureLR",
  "mfdTirePressureRR",
  "trackGripStatus",
  "rainIntensity",
  "rainIntensityIn10min",
  "rainIntensityIn30min",
  "currentTireSet",
  "strategyTireSet",
  "gapAhead",
  "gapBehind",
  "drs",
  "tc",
  "carDamage",
  "pitLimiterOn",
  "kersCharge",
  "kersInput",
  "turboBoost",
  "ballast",
  "engineBrake",
  "ersRecoveryLevel",
  "ersPowerLevel",
  "ersHeatCharging",
  "ersIsCharging",
  "kersCurrentKJ",
  "drsAvailable",
  "drsEnabled",
  "P2PActivations",
  "P2PStatus",
  "mz",
  "fx",
  "fy",
  "slipRatio",
  "slipAngle",
  "tcinAction",
  "absInAction",
  "suspensionDamage",
  "tireTemp",
  "waterTemp",
  "brakePressure",
  "frontBrakeCompound",
  "rearBrakeCompound",
  "padLife",
  "discLife",
  "isIgnitionOn",
  "isStarterEngineOn",
  "isEngineRunning",
  "kerbVibration",
  "slipVibrations",
  "gVibrations",
  "absVibrations",
];

export interface IAssettoCorsaData {
  /*
   * Graphics data
   */
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
  readonly tireCompoundName: string;
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
  readonly rainTires: number;
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
  readonly mfdTireSet: number;
  readonly mfdFuelToAdd: number;
  readonly mfdTirePressureLF: number;
  readonly mfdTirePressureRF: number;
  readonly mfdTirePressureLR: number;
  readonly mfdTirePressureRR: number;
  readonly trackGripStatus: TRACK_GRIP_STATUS;
  readonly rainIntensity: RAIN_INTENSITY;
  readonly rainIntensityIn10min: number;
  readonly rainIntensityIn30min: number;
  readonly currentTireSet: number;
  readonly strategyTireSet: number;
  readonly gapAhead: number;
  readonly gapBehind: number;

  /*
   * Physics data
   */
  readonly throttle: number;
  readonly brake: number;
  readonly fuel: number;
  readonly gear: number;
  readonly rpm: number;
  readonly steeringAngle: number;
  readonly speedKmh: number;
  readonly velocity: [number, number, number];
  readonly accelerationG: [number, number, number];
  readonly wheelSlipRatio: [number, number, number, number];
  readonly wheelLoad: [number, number, number, number];
  readonly wheelPressure: [number, number, number, number];
  readonly wheelAngularSpeed: [number, number, number, number];
  readonly tireWear: [number, number, number, number];
  readonly tireDirtyLevel: [number, number, number, number];
  readonly tireCoreTemperature: [number, number, number, number];
  readonly wheelCamberRad: [number, number, number, number];
  readonly suspensionTravel: [number, number, number, number];
  readonly drs: number;
  readonly tc: boolean;
  readonly heading: number;
  readonly pitch: number;
  readonly roll: number;
  readonly cgHeight: number;
  readonly carDamage: [number, number, number, number, number];
  readonly numberOfTiresOut: number;
  readonly pitLimiterOn: number;
  readonly absDublicate: number;
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

  /*
   * Static data
   */
  readonly smVersion: string;
  readonly acVersion: string;
  readonly numberOfSessions: number;
  readonly numCars: number;
  readonly carModel: string;
  readonly track: string;
  readonly playerName: string;
  readonly playerSurname: string;
  readonly playerNick: string;
  readonly sectorCount: number;
  readonly maxTorque: number;
  readonly maxPower: number;
  readonly maxRpm: number;
  readonly maxFuel: number;
  readonly suspensionMaxTravelFL: number;
  readonly suspensionMaxTravelFR: number;
  readonly suspensionMaxTravelRL: number;
  readonly suspensionMaxTravelRR: number;
  readonly tireRadiusFL: number;
  readonly tireRadiusFR: number;
  readonly tireRadiusRL: number;
  readonly tireRadiusRR: number;
  readonly maxTurboBoost: number;
  readonly deprecated_1: number;
  readonly deprecated_2: number;
  readonly penaltiesEnabled: number;
  readonly aidFuelRate: number;
  readonly aidTireRate: number;
  readonly aidMechanicalDamage: number;
  readonly aidAllowTireBlankets: boolean;
  readonly aidStability: number;
  readonly aidAutoClutch: boolean;
  readonly aidAutoBlip: boolean;
  readonly hasDRS: boolean;
  readonly hasERS: boolean;
  readonly hasKERS: boolean;
  readonly kersMaxJ: number;
  readonly engineBrakeSettingsCount: number;
  readonly ersPowerControllerCount: number;
  readonly trackSPlineLength: number;
  readonly trackConfiguration: string;
  readonly ersMaxJ: number;
  readonly isTimedRace: boolean;
  readonly hasExtraLap: boolean;
  readonly carSkin: string;
  readonly reversedGridPositions: number;
  readonly pitWindowStart: number;
  readonly pitWindowEnd: number;
  readonly isOnline: boolean;
  readonly dryTiresName: string;
  readonly wetTiresName: string;
}
