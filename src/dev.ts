import AssettoCorsaSDK from ".";

const acsdk = new AssettoCorsaSDK({
  sharedMemory: {
    updateIntervalMs: 1000 / 2,
  },
});

acsdk.addListener("physics", (physics) => {
  console.log(physics.speedKmh, physics.rpm, physics.gear);
});

acsdk.addListener("graphics", (graphics) => {
  console.log(graphics);
});
