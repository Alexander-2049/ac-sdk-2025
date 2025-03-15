import { StaticData } from "../types/static";

export const parseStaticArray = (data: any[]): StaticData => {
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
