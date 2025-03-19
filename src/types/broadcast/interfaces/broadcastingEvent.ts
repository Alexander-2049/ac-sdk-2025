import { BroadcastingCarEventType } from "../enums/broadcastingCarEventType";
import { CarAndTeam } from "./car";

export interface BroadcastingEvent {
  Type: BroadcastingCarEventType;
  Msg: string;
  TimeMS: number;
  CarId: number;
  Car: CarAndTeam;
}

