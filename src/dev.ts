import AssettoCorsaSDK from ".";

const acsdk = new AssettoCorsaSDK({
  broadcastName: "",
  broadcastPassword: "",
  updateIntervalMs: 500,
});

// acsdk.addListener("physics", (physics) => {
//   console.log(physics.speedKmh, physics.rpm, physics.gear);
// });

acsdk.addListener("graphics", (graphics) => {
  console.log(graphics);
});
