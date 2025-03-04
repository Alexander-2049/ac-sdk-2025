import { CarLocationEnum } from "../enums/carLocation";

export interface RealtimeCarUpdate {
  CarIndex: number;
  DriverIndex: number;
  DriverCount: number;
  Gear: number;
  WorldPosX: number;
  WorldPosY: number;
  Yaw: number;
  CarLocation: CarLocationEnum;
  Kmh: number;
  Position: number;
  CupPosition: number;
  TrackPosition: number;
  SplinePosition: number;
  Laps: number;
  Delta: number;
  BestSessionLap: BestSessionLap;
  LastLap: Lap;
  CurrentLap: Lap;
}

export interface BestSessionLap {
  Splits: any[];
  LaptimeMS: any;
  CarIndex: number;
  DriverIndex: number;
  IsInvalid: boolean;
  IsValidForBest: boolean;
  isOutlap: boolean;
  isInlap: boolean;
}

export interface Lap {
  Splits: any[];
  LaptimeMS: any;
  CarIndex: number;
  DriverIndex: number;
  IsInvalid: boolean;
  IsValidForBest: boolean;
  isOutlap: boolean;
  isInlap: boolean;
}
