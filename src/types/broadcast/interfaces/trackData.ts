export interface TrackData {
  CameraSets: CameraSets
  HUDPages: string[]
  ConnectionId: number
  TrackName: string
  TrackId: number
  TrackMeters: number
}

export interface CameraSets {
  Drivable: string[]
  Helicam: string[]
  Onboard: string[]
  pitlane: string[]
  set1: string[]
  set2: string[]
  setVR: string[]
}
