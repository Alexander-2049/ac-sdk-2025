export enum GameStatus {
  OFF = 0,
  REPLAY = 1,
  LIVE = 2,
  PAUSE = 3,
}

export interface GraphicsData {
  packetId: number;
  status: GameStatus;
}
