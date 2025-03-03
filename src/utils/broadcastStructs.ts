import { BinaryReader } from "../models/UdpBroadcast/BinaryReader";
import { BinaryWriter } from "../models/UdpBroadcast/BinaryWriter";
import { utf8Bytes } from "./utf8-bytes";

export interface RegistrationResult {
  ConnectionId: number;
  ConnectionSuccess: boolean;
  isReadOnly: boolean;
  errMsg: string;
}

interface RealTimeUpdate {
  EventIndex: number;
  SessionIndex: number;
  SessionType: number;
  Phase: number;
  sessionTime: number;
  sessionEndTime: number;
  FocusedCarIndex: number;
  ActiveCameraSet: string;
  ActiveCamera: string;
  CurrentHudPage: string;
  IsReplayPlaying: boolean;
  ReplaySessionTime?: number;
  ReplayRemainingTime?: number;
  TimeOfDay: number;
  AmbientTemp: number;
  TrackTemp: number;
  Clouds: number;
  RainLevel: number;
  Wetness: number;
  BestSessionLap: Lap;
}

interface RealTimeCarUpdate {
  CarIndex: number;
  DriverIndex: number;
  DriverCount: number;
  Gear: number;
  WorldPosX: number;
  WorldPosY: number;
  Yaw: number;
  CarLocation: number;
  Kmh: number;
  Position: number;
  CupPosition: number;
  TrackPosition: number;
  SplinePosition: number;
  Laps: number;
  Delta: number;
  BestSessionLap: Lap;
  LastLap: Lap;
  CurrentLap: Lap;
}

interface EntryListCar {
  CarModelType: number;
  TeamName: string;
  RaceNumber: number;
  CupCategory: number;
  CurrentDriverIndex: number;
  Nationality: number;
  Drivers: Driver[];
  CurrentDriver: Driver;
}

interface Driver {
  FirstName: string;
  LastName: string;
  ShortName: string;
  Category: number;
  Nationality: number;
}

interface BroadcastEvent {
  Type: number;
  Msg: string;
  TimeMS: number;
  CarId: number;
  Car?: EntryListCar;
}

interface TrackData {
  ConnectionId: number;
  TrackName: string;
  TrackId: number;
  TrackMeters: number;
  CameraSets: Record<string, string[]>;
  HUDPages: string[];
}

interface Lap {
  LaptimeMS: number | null;
  CarIndex: number;
  DriverIndex: number;
  Splits: (number | null)[];
  IsInvalid: boolean;
  IsValidForBest: boolean;
  isOutlap: boolean;
  isInlap: boolean;
}

const RegisterConnection = (
  displayName: string,
  connectionPassword: string,
  commandPassword: string,
  updateMS: number
): Buffer => {
  const displayNameArray = utf8Bytes(displayName);
  const connectionPasswordArray = utf8Bytes(connectionPassword);
  const commandPasswordArray = utf8Bytes(commandPassword);

  const writer = new BinaryWriter("little");
  writer.WriteUInt8(1);
  writer.WriteUInt8(4);
  writer.WriteUInt16(displayNameArray.length);
  writer.WriteBytes(displayNameArray);
  writer.WriteUInt16(connectionPasswordArray.length);
  writer.WriteBytes(connectionPasswordArray);
  writer.WriteUInt32(updateMS);
  writer.WriteUInt16(commandPasswordArray.length);
  writer.WriteBytes(commandPasswordArray);

  return writer.ByteBuffer;
};

const DeregisterConnection = (): Buffer => {
  const writer = new BinaryWriter("little");
  writer.WriteUInt8(9);
  return writer.ByteBuffer;
};

const RequestEntryList = (ConnectionId: number): Buffer => {
  const writer = new BinaryWriter("little");
  writer.WriteUInt8(10);
  writer.WriteInt32(ConnectionId);

  return writer.ByteBuffer;
};

const RequestTrackData = (ConnectionId: number): Buffer => {
  const writer = new BinaryWriter("little");
  writer.WriteUInt8(11);
  writer.WriteInt32(ConnectionId);

  return writer.ByteBuffer;
};

const parseEntryList = (br: BinaryReader): number[] => {
  const entryList: number[] = [];

  const connectionId = br.ReadInt32();
  const carEntryCount = br.ReadUInt16();
  for (let i = 0; i < carEntryCount; i++) {
    entryList.push(br.ReadUInt16());
  }

  return entryList;
};

const parseRegistrationResult = (br: BinaryReader): RegistrationResult => {
  const result: RegistrationResult = {
    ConnectionId: br.ReadInt32(),
    ConnectionSuccess: !!br.ReadUInt8(),
    isReadOnly: !br.ReadUInt8(),
    errMsg: parseString(br),
  };

  return result;
};

const parseRealTimeUpdate = (br: BinaryReader): RealTimeUpdate => {
  const update: RealTimeUpdate = {
    EventIndex: br.ReadUInt16(),
    SessionIndex: br.ReadUInt16(),
    SessionType: br.ReadUInt8(),
    Phase: br.ReadUInt8(),
    sessionTime: br.ReadFloat(),
    sessionEndTime: br.ReadFloat(),
    FocusedCarIndex: br.ReadInt32(),
    ActiveCameraSet: parseString(br),
    ActiveCamera: parseString(br),
    CurrentHudPage: parseString(br),
    IsReplayPlaying: !!br.ReadUInt8(),
    TimeOfDay: br.ReadFloat(),
    AmbientTemp: br.ReadUInt8(),
    TrackTemp: br.ReadUInt8(),
    Clouds: br.ReadUInt8() / 10.0,
    RainLevel: br.ReadUInt8() / 10.0,
    Wetness: br.ReadUInt8() / 10.0,
    BestSessionLap: parseLap(br),
  };

  if (update.IsReplayPlaying) {
    update.ReplaySessionTime = br.ReadFloat();
    update.ReplayRemainingTime = br.ReadFloat();
  }

  return update;
};

const parseRealTimeCarUpdate = (br: BinaryReader): RealTimeCarUpdate => {
  return {
    CarIndex: br.ReadUInt16(),
    DriverIndex: br.ReadUInt16(),
    DriverCount: br.ReadUInt8(),
    Gear: br.ReadUInt8() - 1,
    WorldPosX: br.ReadFloat(),
    WorldPosY: br.ReadFloat(),
    Yaw: br.ReadFloat(),
    CarLocation: br.ReadUInt8(),
    Kmh: br.ReadUInt16(),
    Position: br.ReadUInt16(),
    CupPosition: br.ReadUInt16(),
    TrackPosition: br.ReadUInt16(),
    SplinePosition: br.ReadFloat(),
    Laps: br.ReadUInt16(),
    Delta: br.ReadInt32(),
    BestSessionLap: parseLap(br),
    LastLap: parseLap(br),
    CurrentLap: parseLap(br),
  };
};

const parseEntryListCar = (
  br: BinaryReader,
  cars: Map<number, EntryListCar>
): EntryListCar => {
  const carInfo: EntryListCar = {
    CarModelType: br.ReadUInt8(),
    TeamName: parseString(br),
    RaceNumber: br.ReadInt32(),
    CupCategory: br.ReadUInt8(),
    CurrentDriverIndex: br.ReadUInt8(),
    Nationality: br.ReadUInt16(),
    Drivers: [],
    CurrentDriver: {} as Driver, // Temporary type for assignment
  };

  const driversOnCarCount = br.ReadUInt8();
  for (let i = 0; i < driversOnCarCount; i++) {
    carInfo.Drivers.push({
      FirstName: parseString(br),
      LastName: parseString(br),
      ShortName: parseString(br),
      Category: br.ReadUInt8(),
      Nationality: br.ReadUInt16(),
    });
  }

  carInfo.CurrentDriver = carInfo.Drivers[carInfo.CurrentDriverIndex];

  cars.set(carInfo.RaceNumber, carInfo);
  return carInfo;
};

const parseBroadcastEvent = (
  br: BinaryReader,
  cars: Map<number, EntryListCar>
): BroadcastEvent => {
  const event: BroadcastEvent = {
    Type: br.ReadUInt8(),
    Msg: parseString(br),
    TimeMS: br.ReadInt32(),
    CarId: br.ReadInt32(),
  };

  event.Car = cars.get(event.CarId);

  return event;
};

const parseTrackData = (br: BinaryReader): TrackData => {
  const trackData: TrackData = {
    CameraSets: {},
    HUDPages: [],
    ConnectionId: br.ReadInt32(),
    TrackName: parseString(br),
    TrackId: br.ReadInt32(),
    TrackMeters: br.ReadInt32(),
  };

  const cameraSetCount = br.ReadUInt8();
  for (let i = 0; i < cameraSetCount; i++) {
    const camSetName = parseString(br);
    trackData.CameraSets[camSetName] = [];

    const cameraCount = br.ReadUInt8();
    for (let j = 0; j < cameraCount; j++) {
      const cameraName = parseString(br);
      trackData.CameraSets[camSetName].push(cameraName);
    }
  }

  const hudPagesCount = br.ReadUInt8();
  for (let i = 0; i < hudPagesCount; i++) {
    trackData.HUDPages.push(parseString(br));
  }

  return trackData;
};

const parseLap = (br: BinaryReader): Lap => {
  const lap: Lap = {
    LaptimeMS: null, // Initialize with null since it may be set later
    CarIndex: br.ReadUInt16(),
    DriverIndex: br.ReadUInt16(),
    Splits: [],
    IsInvalid: !!br.ReadUInt8(),
    IsValidForBest: !!br.ReadUInt8(),
    isOutlap: !!br.ReadUInt8(),
    isInlap: !!br.ReadUInt8(),
  };

  lap.LaptimeMS = br.ReadInt32(); // Set the LaptimeMS after initialization

  const splitCount = br.ReadUInt8();

  for (let i = 0; i < splitCount; i++) {
    lap.Splits.push(br.ReadInt32());
  }

  if (lap.LaptimeMS === 2147483647) lap.LaptimeMS = null;
  lap.Splits = lap.Splits.map((split) => (split === 2147483647 ? null : split));

  return lap;
};

const parseString = (br: BinaryReader): string => {
  const length = br.ReadUInt16();
  const string = br.ReadBytes(length);
  return string.toString("utf8");
};

export {
  RegisterConnection,
  DeregisterConnection,
  RequestTrackData,
  RequestEntryList,
  parseRegistrationResult,
  parseRealTimeCarUpdate,
  parseRealTimeUpdate,
  parseTrackData,
  parseEntryList,
  parseEntryListCar,
  parseBroadcastEvent,
};
