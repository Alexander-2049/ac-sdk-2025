import { DriverCategory } from "../enums/driverCategory";
import { Nationality } from "../enums/nationality";

export interface Driver {
  FirstName: string;
  LastName: string;
  ShortName: string;
  Category: DriverCategory;
  Nationality: Nationality;
}
