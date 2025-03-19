import { Nationality } from "../enums/nationality";
import { Driver } from "./driver";

export interface CarAndTeam {
  CarModelType: number;
  TeamName: string;
  TeamId: number;
  CupCategory: number;
  CurrentDriverIndex: number;
  Nationality: Nationality;
  Drivers: Driver[];
  CurrentDriver: Driver;
  CarName: string;
}
