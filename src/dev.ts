import AssettoCorsaSDK from ".";

const acsdk = new AssettoCorsaSDK({
  sharedMemoryUpdateIntervalMs: 1000 / 2,
  broadcast: {
    name: "asd",
    password: "asd",
  },
});

// acsdk.addListener("graphics", (data) => {
//   console.log(data);
// });

// acsdk.addListener("static", (data) => {
//   console.log(data);
// });

// acsdk.addListener("physics", (data) => {
//   console.log(data);
// });
