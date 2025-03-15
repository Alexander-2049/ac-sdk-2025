import AssettoCorsaSDK from ".";

const acsdk = new AssettoCorsaSDK({
  sharedMemoryUpdateIntervalMs: 1000 / 2,
  broadcast: {
    name: "asd",
    password: "asd",
  },
});
