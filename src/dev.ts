import AssettoCorsaSDK from ".";
import { Game } from "./features/sharedMemory/detectGame";

const acsdk = new AssettoCorsaSDK({
  updateIntervalMs: 1000 / 60, // 60fps
  broadcast: {
    password: "asd",
  },
});

acsdk.addListener("ac_shared_memory_update", (data) => {
  console.log(data.speedKmh);
});

acsdk.addListener("open", (game: Game) => {
  if (game === "Assetto Corsa Competizione") {
    console.log("ACC open");
  }
  if (game === "Assetto Corsa") {
    console.log("AC open");
  }
});

acsdk.addListener("close", () => {
  console.log("Game closed");
});

acsdk.addListener("acc_shared_memory_update", (data) => {
  console.log(data.speedKmh);
});
acsdk.addListener("acc_udp_cars_update", (data) => {
  // ...
});
acsdk.addListener("acc_udp_realtime_update", (data) => {
  // ...
});
acsdk.addListener("acc_udp_track_data", (data) => {
  // ...
});

// let last = "";
// acsdk.addListener("acc_udp_cars_update", (data) => {
//   let str = "";
//   for (let i = 0; i < data.length; i++) {
//     str +=
//       data[i].Position +
//       ". " +
//       data[i].TeamCarDetails.CurrentDriver.FirstName +
//       " " +
//       data[i].TeamCarDetails.CurrentDriver.LastName +
//       "\n";
//   }
//   if (last !== str) {
//     console.log(str);
//     last = str;
//   }
// });

acsdk.addListener("acc_udp_realtime_update", (data) => {
  console.log(data.sessionEndTime); // Time in miliseconds before the current session state ends
  // Example: Qualifying session ends in 10 minutes
  // data.sessionEndTime = 600000
});

// let lastTrack = "";
// acsdk.addListener("acc_udp_track_data", (data) => {
//   if (lastTrack !== data.TrackName) {
//     console.log(data.TrackName);
//     lastTrack = data.TrackName;
//   }
// });
