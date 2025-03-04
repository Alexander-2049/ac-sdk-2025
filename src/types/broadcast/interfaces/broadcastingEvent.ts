import { BroadcastingCarEventType } from "../enums/broadcastingCarEventType";
import { Car } from "./car";

export interface BroadcastingEvent {
  Type: BroadcastingCarEventType;
  Msg: string;
  TimeMS: number;
  CarId: number;
  Car: Car;
}

