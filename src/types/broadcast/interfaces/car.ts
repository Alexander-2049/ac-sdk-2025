import { Nationality } from "../enums/nationality";
import { Driver } from "./driver";

export interface Car {
  CarModelType: number;
  TeamName: string;
  RaceNumber: number;
  CupCategory: number;
  CurrentDriverIndex: number;
  Nationality: Nationality;
  Drivers: Driver[];
  CurrentDriver: Driver;
}
