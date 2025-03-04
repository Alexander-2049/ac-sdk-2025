import { RaceSessionType } from "../enums/raceSessionType";
import { SessionPhase } from "../enums/sessionPhase";

export interface RealtimeUpdate {
  EventIndex: number;
  SessionIndex: number;
  SessionType: RaceSessionType;
  Phase: SessionPhase;
  sessionTime: number;
  sessionEndTime: number;
  FocusedCarIndex: number;
  ActiveCameraSet: string;
  ActiveCamera: string;
  CurrentHudPage: string;
  IsReplayPlaying: boolean;
  TimeOfDay: number;
  AmbientTemp: number;
  TrackTemp: number;
  Clouds: number;
  RainLevel: number;
  Wetness: number;
  BestSessionLap: BestSessionLap;
  ReplaySessionTime?: number;
  ReplayRemainingTime?: number;
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
