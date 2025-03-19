import { BroadcastingCarEventType } from "../enums/broadcastingCarEventType";
import { TeamCarDetails } from "./car";

export interface BroadcastingEvent {
  Type: BroadcastingCarEventType;
  Msg: string;
  TimeMS: number;
  CarId: number;
  Car: TeamCarDetails;
}

