import AssettoCorsaSDK from ".";

// const acsdk = new AssettoCorsaSDK({
//   sharedMemory: {
//     updateIntervalMs: 1000 / 2,
//   },
// });

// acsdk.addListener("physics", (physics) => {
//   console.log(physics.speedKmh, physics.rpm, physics.gear);
// });

// acsdk.addListener("graphics", (graphics) => {
//   console.log(graphics);
// });

import AccBroadcast from "./models/UdpBroadcast/AccBroadcast";
const accBroadcast = new AccBroadcast("My Application", "asd");

accBroadcast.on("realtime_car_update", (update) => {
  console.clear();
  console.log(`Gear: ${update.Gear}`);
  console.log(`Speed: ${update.Kmh} km/h`);
  console.log(`Delta: ${update.Delta} ms`);
});
