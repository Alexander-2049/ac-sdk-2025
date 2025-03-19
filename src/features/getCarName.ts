import { accCarModels } from "../constants/accCarModels";

export const getCarName = (carId: number): string => {
  return accCarModels[carId]?.[0] || "Unknown";
};
