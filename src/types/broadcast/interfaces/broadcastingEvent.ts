import { BroadcastingCarEventType } from "../enums/broadcastingCarEventType";
import { Team } from "./car";

export interface BroadcastingEvent {
  Type: BroadcastingCarEventType;
  Msg: string;
  TimeMS: number;
  CarId: number;
  Car: Team;
}

