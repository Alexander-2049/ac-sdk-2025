import { BinaryReader } from "./BinaryReader";
import { BinaryWriter } from "./BinaryWriter";
import { BroadcastingEvent } from "../../types/broadcast/interfaces/broadcastingEvent";
import { CarAndTeam } from "../../types/broadcast/interfaces/car";
import { Driver } from "../../types/broadcast/interfaces/driver";
import {
  Lap,
  RealtimeCarUpdate,
} from "../../types/broadcast/interfaces/realtimeCarUpdate";
import { RealtimeUpdate } from "../../types/broadcast/interfaces/realtimeUpdate";
import { RegistrationResults } from "../../types/broadcast/interfaces/registrationResults";
import {
  CameraSets,
  TrackData,
} from "../../types/broadcast/interfaces/trackData";
import { utf8Bytes } from "./utf8Bytes";
import { getCarName } from "../getCarName";

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

const parseRegistrationResult = (br: BinaryReader): RegistrationResults => {
  const result: RegistrationResults = {
    ConnectionId: br.ReadInt32(),
    ConnectionSuccess: !!br.ReadUInt8(),
    isReadOnly: !br.ReadUInt8(),
    errMsg: parseString(br),
  };

  return result;
};

const parseRealTimeUpdate = (br: BinaryReader): RealtimeUpdate => {
  const update: RealtimeUpdate = {
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

const parseRealTimeCarUpdate = (br: BinaryReader): RealtimeCarUpdate => {
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
  cars: Map<number, CarAndTeam>
): CarAndTeam => {
  const carId = br.ReadUInt16();

  const carInfo: CarAndTeam = {
    CarModelType: br.ReadUInt8(),
    TeamName: parseString(br),
    TeamId: br.ReadInt32(),
    CupCategory: br.ReadUInt8(),
    CurrentDriverIndex: br.ReadUInt8(),
    Nationality: br.ReadUInt16(),
    Drivers: [],
    CurrentDriver: {} as Driver,
    CarName: "Unknown",
  };

  carInfo.CarName = getCarName(carInfo.CarModelType);

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

  cars.set(carId, carInfo);
  return carInfo;
};

const parseBroadcastEvent = (
  br: BinaryReader,
  cars: Map<number, CarAndTeam>
): BroadcastingEvent => {
  const Type = br.ReadUInt8();
  const Msg = parseString(br);
  const TimeMS = br.ReadInt32();
  const CarId = br.ReadInt32();
  const Car = cars.get(CarId) as CarAndTeam;

  const event: BroadcastingEvent = {
    Type,
    Msg,
    TimeMS,
    CarId,
    Car,
  };

  return event;
};

const parseTrackData = (br: BinaryReader): TrackData => {
  const trackData: TrackData = {
    CameraSets: {
      Drivable: [],
      Helicam: [],
      Onboard: [],
      pitlane: [],
      set1: [],
      set2: [],
      setVR: [],
    },
    HUDPages: [],
    ConnectionId: br.ReadInt32(),
    TrackName: parseString(br),
    TrackId: br.ReadInt32(),
    TrackMeters: br.ReadInt32(),
  };

  const cameraSetCount = br.ReadUInt8();
  for (let i = 0; i < cameraSetCount; i++) {
    const camSetName = parseString(br);

    const cameraCount = br.ReadUInt8();
    for (let j = 0; j < cameraCount; j++) {
      const cameraName = parseString(br);
      if (camSetName in trackData.CameraSets) {
        trackData.CameraSets[camSetName as keyof CameraSets].push(cameraName);
      }
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
  const stringBytes = br.ReadBytes(length);
  return Buffer.from(stringBytes).toString("utf8");
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
