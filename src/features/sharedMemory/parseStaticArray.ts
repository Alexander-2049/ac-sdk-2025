export interface IStatic {
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
  readonly tyreRadiusFL: number;
  readonly tyreRadiusFR: number;
  readonly tyreRadiusRL: number;
  readonly tyreRadiusRR: number;
  readonly maxTurboBoost: number;
  readonly deprecated_1: number;
  readonly deprecated_2: number;
  readonly penaltiesEnabled: number;
  readonly aidFuelRate: number;
  readonly aidTireRate: number;
  readonly aidMechanicalDamage: number;
  readonly aidAllowTyreBlankets: boolean;
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

export const parseStaticArray = (data: any[]): IStatic => {
  let i = 0;

  return {
    smVersion: data[i++],
    acVersion: data[i++],
    numberOfSessions: data[i++],
    numCars: data[i++],
    carModel: data[i++],
    track: data[i++],
    playerName: data[i++],
    playerSurname: data[i++],
    playerNick: data[i++],
    sectorCount: data[i++],
    maxTorque: data[i++],
    maxPower: data[i++],
    maxRpm: data[i++],
    maxFuel: data[i++],
    suspensionMaxTravelFL: data[i++],
    suspensionMaxTravelFR: data[i++],
    suspensionMaxTravelRL: data[i++],
    suspensionMaxTravelRR: data[i++],
    tyreRadiusFL: data[i++],
    tyreRadiusFR: data[i++],
    tyreRadiusRL: data[i++],
    tyreRadiusRR: data[i++],
    maxTurboBoost: data[i++],
    deprecated_1: data[i++],
    deprecated_2: data[i++],
    penaltiesEnabled: data[i++],
    aidFuelRate: data[i++],
    aidTireRate: data[i++],
    aidMechanicalDamage: data[i++],
    aidAllowTyreBlankets: !!data[i++],
    aidStability: data[i++],
    aidAutoClutch: !!data[i++],
    aidAutoBlip: !!data[i++],
    hasDRS: !!data[i++],
    hasERS: !!data[i++],
    hasKERS: !!data[i++],
    kersMaxJ: data[i++],
    engineBrakeSettingsCount: data[i++],
    ersPowerControllerCount: data[i++],
    trackSPlineLength: data[i++],
    trackConfiguration: data[i++],
    ersMaxJ: data[i++],
    isTimedRace: !!data[i++],
    hasExtraLap: !!data[i++],
    carSkin: data[i++],
    reversedGridPositions: data[i++],
    pitWindowStart: data[i++],
    pitWindowEnd: data[i++],
    isOnline: !!data[i++],
    dryTiresName: data[i++],
    wetTiresName: data[i++],
  };
};
