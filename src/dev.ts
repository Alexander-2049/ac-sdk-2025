import AssettoCorsaSDK from ".";

const acsdk = new AssettoCorsaSDK({
  sharedMemoryUpdateIntervalMs: 1000 / 60,
  broadcast: {
    name: "asd",
    password: "asd",
  },
});

acsdk.addListener("acc_udp_cars_update", (data) => {
  console.log(data[0].Gear);
});
