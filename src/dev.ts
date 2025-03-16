import AssettoCorsaSDK from ".";

const acsdk = new AssettoCorsaSDK({
  sharedMemoryUpdateIntervalMs: 1000 / 2,
  broadcast: {
    name: "asd",
    password: "asd",
  },
});

acsdk.addListener("graphics", (data) => {
  console.log(JSON.stringify(data, null, 2));
});

acsdk.addListener("static", (data) => {
  console.log(JSON.stringify(data, null, 2));
});

acsdk.addListener("physics", (data) => {
  console.log(JSON.stringify(data, null, 2));
});
