import { IAssettoCorsaCompetizioneData } from "../../types/broadcast/interfaces/AssettoCorsaCompetizioneData";
import { IAssettoCorsaData } from "../../types/broadcast/interfaces/AssettoCorsaData";
import { Game } from "./detectGame";
import { IGraphics } from "./parseGraphicsArray";
import { IPhysics } from "./parsePhysicsArray";
import { IStatic } from "./parseStaticArray";

export type IGameData =
  | IAssettoCorsaData
  | IAssettoCorsaCompetizioneData
  | null;

// Overloads to enforce return type based on `game` input
export function getGameDataFromSharedMemory(
  game: Game.AssettoCorsa,
  graphicsData: IGraphics,
  physicsData: IPhysics,
  staticData: IStatic
): IAssettoCorsaData;

export function getGameDataFromSharedMemory(
  game: Game.AssettoCorsaCompetizione,
  graphicsData: IGraphics,
  physicsData: IPhysics,
  staticData: IStatic
): IAssettoCorsaCompetizioneData;

export function getGameDataFromSharedMemory(
  game: Game,
  graphicsData: IGraphics,
  physicsData: IPhysics,
  staticData: IStatic
): IGameData {
  if (game === Game.AssettoCorsa) {
    const data: IAssettoCorsaData = {
      /*
       * Graphics data
       */
      stepIndex: graphicsData.stepIndex,
      status: graphicsData.status,
      session: graphicsData.session,
      currentLapTime: graphicsData.currentLapTime,
      lastLapTime: graphicsData.lastLapTime,
      bestLapTime: graphicsData.bestLapTime,
      split: graphicsData.split,
      completedLaps: graphicsData.completedLaps,
      position: graphicsData.position,
      currentLapTimeMs: graphicsData.currentLapTimeMs,
      lastLapTimeMs: graphicsData.lastLapTimeMs,
      bestLapTimeMs: graphicsData.bestLapTimeMs,
      sessionTimeLeft: graphicsData.sessionTimeLeft,
      distanceTraveled: graphicsData.distanceTraveled,
      isInPit: graphicsData.isInPit,
      currentSectorIndex: graphicsData.currentSectorIndex,
      lastSectorTimeMs: graphicsData.lastSectorTimeMs,
      numberOfLaps: graphicsData.numberOfLaps,
      tireCompoundName: graphicsData.tireCompoundName,
      replayTimeMultiplier: graphicsData.replayTimeMultiplier,
      normalizedCarPosition: graphicsData.normalizedCarPosition,
      carsOnTrack: graphicsData.carsOnTrack,
      carCoordinates: graphicsData.carCoordinates,
      abs2: graphicsData.abs2,

      /*
       * Physics data
       */
      throttle: physicsData.throttle,
      brake: physicsData.brake,
      fuel: physicsData.fuel,
      gear: physicsData.gear,
      rpm: physicsData.rpm,
      steeringAngle: physicsData.steeringAngle,
      speedKmh: physicsData.speedKmh,
      velocity: physicsData.velocity,
      accelerationG: physicsData.accelerationG,
      wheelSlipRatio: physicsData.wheelSlipRatio,
      wheelLoad: physicsData.wheelLoad,
      wheelPressure: physicsData.wheelPressure,
      wheelAngularSpeed: physicsData.wheelAngularSpeed,
      tireWear: physicsData.tireWear,
      tireDirtyLevel: physicsData.tireDirtyLevel,
      tireCoreTemperature: physicsData.tireCoreTemperature,
      wheelCamberRad: physicsData.wheelCamberRad,
      suspensionTravel: physicsData.suspensionTravel,
      heading: physicsData.heading,
      pitch: physicsData.pitch,
      roll: physicsData.roll,
      cgHeight: physicsData.cgHeight,
      numberOfTiresOut: physicsData.numberOfTiresOut,
      abs1: physicsData.abs1,
      autoShifterOn: physicsData.autoShifterOn,
      rideHeight: physicsData.rideHeight,
      airDensity: physicsData.airDensity,
      airTemp: physicsData.airTemp,
      roadTemp: physicsData.roadTemp,
      localAngularVel: physicsData.localAngularVel,
      finalFF: physicsData.finalFF,
      performanceMeter: physicsData.performanceMeter,

      /*
       * Static data
       */
      smVersion: staticData.smVersion,
      acVersion: staticData.acVersion,
      numberOfSessions: staticData.numberOfSessions,
      numCars: staticData.numCars,
      carModel: staticData.carModel,
      track: staticData.track,
      playerName: staticData.playerName,
      playerSurname: staticData.playerSurname,
      playerNick: staticData.playerNick,
      sectorCount: staticData.sectorCount,
      maxTorque: staticData.maxTorque,
      maxPower: staticData.maxPower,
      maxRpm: staticData.maxRpm,
      maxFuel: staticData.maxFuel,
      suspensionMaxTravelFL: staticData.suspensionMaxTravelFL,
      suspensionMaxTravelFR: staticData.suspensionMaxTravelFR,
      suspensionMaxTravelRL: staticData.suspensionMaxTravelRL,
      suspensionMaxTravelRR: staticData.suspensionMaxTravelRR,
      tireRadiusFL: staticData.tireRadiusFL,
      tireRadiusFR: staticData.tireRadiusFR,
      tireRadiusRL: staticData.tireRadiusRL,
      tireRadiusRR: staticData.tireRadiusRR,
      penaltiesEnabled: staticData.penaltiesEnabled,
      aidFuelRate: staticData.aidFuelRate,
      aidTireRate: staticData.aidTireRate,
      aidAllowTireBlankets: staticData.aidAllowTireBlankets,
      aidStability: staticData.aidStability,
      aidAutoClutch: staticData.aidAutoClutch,
      aidAutoBlip: staticData.aidAutoBlip,
      trackSPlineLength: staticData.trackSPlineLength,
      trackConfiguration: staticData.trackConfiguration,
      carSkin: staticData.carSkin,
    };
    return data;
  } else if (game === Game.AssettoCorsaCompetizione) {
    const data: IAssettoCorsaCompetizioneData = {
      // Graphics data
      stepIndex: graphicsData.stepIndex,
      status: graphicsData.status,
      session: graphicsData.session,
      currentLapTime: graphicsData.currentLapTime,
      lastLapTime: graphicsData.lastLapTime,
      bestLapTime: graphicsData.bestLapTime,
      split: graphicsData.split,
      position: graphicsData.position,
      currentLapTimeMs: graphicsData.currentLapTimeMs,
      lastLapTimeMs: graphicsData.lastLapTimeMs,
      bestLapTimeMs: graphicsData.bestLapTimeMs,
      sessionTimeLeft: graphicsData.sessionTimeLeft,
      distanceTraveled: graphicsData.distanceTraveled,
      currentSectorIndex: graphicsData.currentSectorIndex,
      lastSectorTimeMs: graphicsData.lastSectorTimeMs,
      normalizedCarPosition: graphicsData.normalizedCarPosition,
      carsOnTrack: graphicsData.carsOnTrack,
      carCoordinates: graphicsData.carCoordinates,
      carID: graphicsData.carID,
      playerCarID: graphicsData.playerCarID,
      flag: graphicsData.flag,
      penalty: graphicsData.penalty,
      isIdealLineOn: graphicsData.isIdealLineOn,
      isInPitLane: graphicsData.isInPitLane,
      isMandatoryPitDone: graphicsData.isMandatoryPitDone,
      mainDisplayIndex: graphicsData.mainDisplayIndex,
      secondaryDisplayIndex: graphicsData.secondaryDisplayIndex,
      tractionControlLevel: graphicsData.tractionControlLevel,
      engineMap: graphicsData.engineMap,
      abs2: graphicsData.abs2,
      averageFuelConsumptionPerLap: graphicsData.averageFuelConsumptionPerLap,
      exhaustTemperature: graphicsData.exhaustTemperature,
      driverStintTotalTimeLeft: graphicsData.driverStintTotalTimeLeft,
      driverStintTimeLeft: graphicsData.driverStintTimeLeft,
      sessionIndex: graphicsData.sessionIndex,
      usedFuel: graphicsData.usedFuel,
      deltaLapTime: graphicsData.deltaLapTime,
      estimatedLapTime: graphicsData.estimatedLapTime,
      iEstimatedLapTime: graphicsData.iEstimatedLapTime,
      iSplit: graphicsData.iSplit,
      isValidLap: graphicsData.isValidLap,
      fuelEstimatedLaps: graphicsData.fuelEstimatedLaps,
      trackStatus: graphicsData.trackStatus,
      missingMandatoryPits: graphicsData.missingMandatoryPits,
      clock: graphicsData.clock,
      globalYellow: graphicsData.globalYellow,
      globalYellow1: graphicsData.globalYellow1,
      globalYellow2: graphicsData.globalYellow2,
      globalGreen: graphicsData.globalGreen,
      globalRed: graphicsData.globalRed,
      mfdTireSet: graphicsData.mfdTireSet,
      mfdTirePressureLF: graphicsData.mfdTirePressureLF,
      mfdTirePressureRF: graphicsData.mfdTirePressureRF,
      mfdTirePressureLR: graphicsData.mfdTirePressureLR,
      mfdTirePressureRR: graphicsData.mfdTirePressureRR,
      trackGripStatus: graphicsData.trackGripStatus,
      currentTireSet: graphicsData.currentTireSet,
      strategyTireSet: graphicsData.strategyTireSet,
      gapAhead: graphicsData.gapAhead,
      gapBehind: graphicsData.gapBehind,

      // Physics data
      throttle: physicsData.throttle,
      brake: physicsData.brake,
      fuel: physicsData.fuel,
      gear: physicsData.gear,
      rpm: physicsData.rpm,
      steeringAngle: physicsData.steeringAngle,
      speedKmh: physicsData.speedKmh,
      velocity: physicsData.velocity,
      accelerationG: physicsData.accelerationG,
      wheelSlipRatio: physicsData.wheelSlipRatio,
      wheelPressure: physicsData.wheelPressure,
      wheelAngularSpeed: physicsData.wheelAngularSpeed,
      tireCoreTemperature: physicsData.tireCoreTemperature,
      suspensionTravel: physicsData.suspensionTravel,
      tc: physicsData.tc,
      heading: physicsData.heading,
      pitch: physicsData.pitch,
      roll: physicsData.roll,
      pitLimiterOn: physicsData.pitLimiterOn,
      abs1: physicsData.abs1,
      autoShifterOn: physicsData.autoShifterOn,
      turboBoost: physicsData.turboBoost,
      airTemp: physicsData.airTemp,
      roadTemp: physicsData.roadTemp,
      localAngularVel: physicsData.localAngularVel,
      finalFF: physicsData.finalFF,
      tireContactPoint: physicsData.tireContactPoint,
      tireContactNormal: physicsData.tireContactNormal,
      tireContactHeading: physicsData.tireContactHeading,
      brakeBias: physicsData.brakeBias,
      localVelocity: physicsData.localVelocity,
      currentMaxRpm: physicsData.currentMaxRpm,

      // Static data
      smVersion: staticData.smVersion,
      acVersion: staticData.acVersion,
      numCars: staticData.numCars,
      carModel: staticData.carModel,
      track: staticData.track,
      playerName: staticData.playerName,
      playerSurname: staticData.playerSurname,
      sectorCount: staticData.sectorCount,
      penaltiesEnabled: staticData.penaltiesEnabled,
      aidFuelRate: staticData.aidFuelRate,
      aidTireRate: staticData.aidTireRate,
      aidMechanicalDamage: staticData.aidMechanicalDamage,
      aidStability: staticData.aidStability,
      aidAutoClutch: staticData.aidAutoClutch,
      aidAutoBlip: staticData.aidAutoBlip,
      trackConfiguration: staticData.trackConfiguration,
      carSkin: staticData.carSkin,
      pitWindowStart: staticData.pitWindowStart,
      pitWindowEnd: staticData.pitWindowEnd,
      isOnline: staticData.isOnline,
      dryTiresName: staticData.dryTiresName,
      wetTiresName: staticData.wetTiresName,
    };

    return data;
  } else {
    return null;
  }
}
