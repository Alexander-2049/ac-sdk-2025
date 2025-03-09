import AssettoCorsaSDK from ".";

const acsdk = new AssettoCorsaSDK({
  sharedMemoryUpdateIntervalMs: 1000 / 2,
  broadcast: {
    name: "asd",
    password: "asd",
  },
});

// acsdk.addListener("physics", (physics) => {
//   console.log({
//     speed: physics.speedKmh,
//     rpm: physics.rpm,
//     gear: physics.gear,
//   });
// });

// acsdk.addListener("graphics", (graphics) => {
//   console.log({
//     status: graphics.status,
//   });
// });

// acsdk.addListener("graphics", (graphics) => {
//   console.log(graphics);
// });

// import AccBroadcast from "./models/UdpBroadcast/AccBroadcast";
// const accBroadcast = new AccBroadcast(
//   "My Application",
//   "asd",
//   undefined,
//   1000 / 60
// );

// accBroadcast.on("registration_result", (update) => {
//   console.clear();
// });

// accBroadcast.on("realtime_car_update", (update) => {
//   console.clear();
//   console.log(`Gear: ${update.Gear}`);
//   console.log(`Speed: ${update.Kmh} km/h`);
//   console.log(`Delta: ${update.Delta} ms`);
// });
