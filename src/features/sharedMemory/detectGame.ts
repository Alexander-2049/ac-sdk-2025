import { IStatic } from "./parseStaticArray";

export type Game = "Assetto Corsa" | "Assetto Corsa Competizione" | "None";

export const detectGame = (data: IStatic): Game => {
  if (data.acVersion.length === 0 && data.acVersion.length === 0) return "None";
  if (data.playerNick.length === 0) return "Assetto Corsa Competizione";
  if (data.playerName === data.playerSurname) return "Assetto Corsa";

  console.log("detectGame() -> Game not detected");
  return "None";
};
