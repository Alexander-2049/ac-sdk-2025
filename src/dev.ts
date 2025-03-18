import AssettoCorsaSDK from ".";

const acsdk = new AssettoCorsaSDK({
  sharedMemoryUpdateIntervalMs: 1000 / 60,
  broadcast: {
    name: "asd",
    password: "asd",
  },
});

// acsdk.addListener("assettoCorsaData", (data) => {
//   console.log(data);
// });

// acsdk.addListener("acc_data", (data) => {
//   console.log(data);
// });
