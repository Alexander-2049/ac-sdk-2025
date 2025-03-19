import { accCarModels } from "../constants/accCarModels";

export const getCarYear = (carId: number): number => {
  return accCarModels[carId]?.[1] || -1;
};
