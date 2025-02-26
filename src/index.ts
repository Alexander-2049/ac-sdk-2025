// main.ts
import { PhysicsData } from "./types/physics.d";
const AC_SDK = require("../build/Release/AssettoCorsaSDK.node");

setInterval(() => {
  // Fetch raw physics array

  // Set simple scalar values (int and float) directly
  // Nan::Set(resultArray, 0, Nan::New<v8::Number>(pf->packetId));
  // Nan::Set(resultArray, 1, Nan::New<v8::Number>(pf->gas));
  // Nan::Set(resultArray, 2, Nan::New<v8::Number>(pf->brake));
  // Nan::Set(resultArray, 3, Nan::New<v8::Number>(pf->fuel));
  // Nan::Set(resultArray, 4, Nan::New<v8::Number>(pf->gear));
  // Nan::Set(resultArray, 5, Nan::New<v8::Number>(pf->rpm));
  // Nan::Set(resultArray, 6, Nan::New<v8::Number>(pf->steerAngle));
  // Nan::Set(resultArray, 7, Nan::New<v8::Number>(pf->speedKmh));
  // const physicsData: PhysicsData = {
  //   packetId: physicsArray[0],
  //   gas: physicsArray[1],
  //   brake: physicsArray[2],
  //   fuel: physicsArray[3],
  //   gear: physicsArray[4],
  //   rpm: physicsArray[5],
  //   steerAngle: physicsArray[6],
  //   speedKmh: physicsArray[7],
  //   velocity: physicsArray[8],
  //   accG: physicsArray[9],
  //   wheelSlip: physicsArray[10],
  //   wheelLoad: physicsArray[11],
  //   wheelsPressure: physicsArray[12],
  //   wheelAngularSpeed: physicsArray[13],
  //   tyreWear: physicsArray[14],
  //   tyreDirtyLevel: physicsArray[15],
  //   tyreCoreTemperature: physicsArray[16],
  //   camberRAD: physicsArray[17],
  //   suspensionTravel: physicsArray[18],
  //   drs: physicsArray[19],
  //   tc: physicsArray[20],
  //   heading: physicsArray[21],
  //   pitch: physicsArray[22],
  //   roll: physicsArray[23],
  //   cgHeight: physicsArray[24],
  //   carDamage: physicsArray[25],
  //   numberOfTyresOut: physicsArray[26],
  //   pitLimiterOn: physicsArray[27],
  //   abs: physicsArray[28],
  //   kersCharge: physicsArray[29],
  //   kersInput: physicsArray[30],
  //   autoShifterOn: physicsArray[31],
  //   rideHeight: physicsArray[32],
  //   turboBoost: physicsArray[33],
  //   ballast: physicsArray[34],
  //   airDensity: physicsArray[35],
  //   airTemp: physicsArray[36],
  //   roadTemp: physicsArray[37],
  //   localAngularVel: physicsArray[38],
  //   finalFF: physicsArray[39],
  //   performanceMeter: physicsArray[40],
  //   engineBrake: physicsArray[41],
  //   ersRecoveryLevel: physicsArray[42],
  //   ersPowerLevel: physicsArray[43],
  //   ersHeatCharging: physicsArray[44],
  //   ersIsCharging: physicsArray[45],
  //   kersCurrentKJ: physicsArray[46],
  //   drsAvailable: physicsArray[47],
  //   drsEnabled: physicsArray[48],
  //   brakeTemp: physicsArray[49],
  //   clutch: physicsArray[50],
  //   tyreTempI: physicsArray[51],
  //   tyreTempM: physicsArray[52],
  //   tyreTempO: physicsArray[53],
  //   isAIControlled: physicsArray[54],
  //   tyreContactPoint: physicsArray[55],
  //   tyreContactNormal: physicsArray[56],
  //   tyreContactHeading: physicsArray[57],
  //   brakeBias: physicsArray[58],
  //   localVelocity: physicsArray[59],
  //   P2PActivations: physicsArray[60],
  //   P2PStatus: physicsArray[61],
  //   currentMaxRpm: physicsArray[62],
  //   mz: physicsArray[63],
  //   fx: physicsArray[64],
  //   fy: physicsArray[65],
  //   slipRatio: physicsArray[66],
  //   slipAngle: physicsArray[67],
  //   tcinAction: physicsArray[68],
  //   absInAction: physicsArray[69],
  //   suspensionDamage: physicsArray[70],
  //   tyreTemp: physicsArray[71],
  // };

  //   const message =
  // `Speed: ${Math.floor(physicsData.speedKmh)} |-| DRS Enabled: ${physicsData.drsEnabled}`;
  // const message = Math.floor(physicsData.gas * 100) / 100;

  console.clear();

  const physicsArray: any[] = AC_SDK.getPhysics();
  console.log({
    packetId: physicsArray[0],
    throttle: physicsArray[1],
    brake: physicsArray[2],
    fuel: physicsArray[3],
    gear: physicsArray[4] - 1,
    rpm: physicsArray[5],
    steeringAngle: physicsArray[6],
    speedKmh: physicsArray[7],
    velocity: physicsArray[8],
    accG: physicsArray[9],
    wheelSlip: physicsArray[10],
  });
}, 1000 / 60);
