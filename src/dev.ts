import AssettoCorsaSDK from ".";
import * as fs from "fs";
import * as path from "path";

const acsdk = new AssettoCorsaSDK({
  sharedMemoryUpdateIntervalMs: 2000,
  broadcast: {
    name: "asd",
    password: "asd",
  },
});
const outputDir = path.resolve(__dirname, "../dist");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const writeDataToFile = (eventName: string, data: any) => {
  const fileName = `${eventName}.json`;
  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

acsdk.addListener("acc_data", (data) => {
  writeDataToFile("acc_data", data);
});

acsdk.addListener("acc_udp_cars_update", (data) => {
  writeDataToFile("acc_udp_cars_update", data);
});

acsdk.addListener("acc_udp_realtime_update", (data) => {
  writeDataToFile("acc_udp_realtime_update", data);
});

acsdk.addListener("acc_udp_track_data", (data) => {
  writeDataToFile("acc_udp_track_data", data);
});
