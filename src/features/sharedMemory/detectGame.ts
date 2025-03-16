import { IStatic } from "./parseStaticArray";

export enum Game {
  AssettoCorsa = "Assetto Corsa",
  AssettoCorsaCompetizione = "Assetto Corsa Competizione",
  None = "None",
}

export const detectGame = (data: IStatic): Game => {
  if (data.acVersion.length === 0 && data.acVersion.length === 0)
    return Game.None;
  if (data.playerNick.length === 0) return Game.AssettoCorsaCompetizione;
  if (data.playerName === data.playerSurname) return Game.AssettoCorsa;

  console.log("detectGame() -> Game not detected");
  return Game.None;
};
