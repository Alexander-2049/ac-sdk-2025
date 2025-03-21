import { Nationality } from "../enums/nationality";
import { Driver } from "./driver";

export interface TeamCarDetails {
  CarIndex: number;
  CarModelType: number;
  CarModelName: string;
  CarModelYear: number;
  TeamName: string;
  TeamId: number;
  CupCategory: number;
  CurrentDriverIndex: number;
  Nationality: Nationality;
  Drivers: Driver[];
  CurrentDriver: Driver;
}
