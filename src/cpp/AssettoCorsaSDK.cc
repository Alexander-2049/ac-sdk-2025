#include <nan.h>
#include "stdafx.h"
#include <windows.h>
#include <tchar.h>
#include "SharedFileOut.h"
#pragma optimize("", off)
using namespace std;

template <typename T, unsigned S>
inline unsigned arraysize(const T (&v)[S])
{
    return S;
}

struct SMElement
{
    HANDLE hMapFile;
    unsigned char *mapFileBuffer;
};

SMElement m_graphics;
SMElement m_physics;
SMElement m_static;

void dismiss(SMElement element)
{
    UnmapViewOfFile(element.mapFileBuffer);
    CloseHandle(element.hMapFile);
}

void initPhysics()
{
    TCHAR szName[] = TEXT("Local\\acpmf_physics");
    m_physics.hMapFile = CreateFileMapping(INVALID_HANDLE_VALUE, NULL, PAGE_READWRITE, 0, sizeof(SPageFilePhysics), szName);
    if (!m_physics.hMapFile)
    {
        MessageBoxA(GetActiveWindow(), "CreateFileMapping failed", "ACCS", MB_OK);
    }
    m_physics.mapFileBuffer = (unsigned char *)MapViewOfFile(m_physics.hMapFile, FILE_MAP_READ, 0, 0, sizeof(SPageFilePhysics));
    if (!m_physics.mapFileBuffer)
    {
        MessageBoxA(GetActiveWindow(), "MapViewOfFile failed", "ACCS", MB_OK);
    }
}

void initGraphics()
{
    TCHAR szName[] = TEXT("Local\\acpmf_graphics");
    m_graphics.hMapFile = CreateFileMapping(INVALID_HANDLE_VALUE, NULL, PAGE_READWRITE, 0, sizeof(SPageFileGraphics), szName);
    if (!m_graphics.hMapFile)
    {
        MessageBoxA(GetActiveWindow(), "CreateFileMapping failed", "ACCS", MB_OK);
    }
    m_graphics.mapFileBuffer = (unsigned char *)MapViewOfFile(m_graphics.hMapFile, FILE_MAP_READ, 0, 0, sizeof(SPageFileGraphics));
    if (!m_graphics.mapFileBuffer)
    {
        MessageBoxA(GetActiveWindow(), "MapViewOfFile failed", "ACCS", MB_OK);
    }
}

void initStatic()
{
    TCHAR szName[] = TEXT("Local\\acpmf_static");
    m_static.hMapFile = CreateFileMapping(INVALID_HANDLE_VALUE, NULL, PAGE_READWRITE, 0, sizeof(SPageFileStatic), szName);
    if (!m_static.hMapFile)
    {
        MessageBoxA(GetActiveWindow(), "CreateFileMapping failed", "ACCS", MB_OK);
    }
    m_static.mapFileBuffer = (unsigned char *)MapViewOfFile(m_static.hMapFile, FILE_MAP_READ, 0, 0, sizeof(SPageFileStatic));
    if (!m_static.mapFileBuffer)
    {
        MessageBoxA(GetActiveWindow(), "MapViewOfFile failed", "ACCS", MB_OK);
    }
}

void GetPhysics(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
    initPhysics();
    SPageFilePhysics *pf = (SPageFilePhysics *)m_physics.mapFileBuffer;

    // Create an array to hold all the values
    const size_t arraySize = 85; // Adjust based on the number of elements in your struct

    v8::Local<v8::Array> resultArray = Nan::New<v8::Array>(arraySize);

    // Set simple scalar values (int and float) directly
    Nan::Set(resultArray, 0, Nan::New<v8::Number>(pf->packetId));
    Nan::Set(resultArray, 1, Nan::New<v8::Number>(pf->gas));
    Nan::Set(resultArray, 2, Nan::New<v8::Number>(pf->brake));
    Nan::Set(resultArray, 3, Nan::New<v8::Number>(pf->fuel));
    Nan::Set(resultArray, 4, Nan::New<v8::Number>(pf->gear));
    Nan::Set(resultArray, 5, Nan::New<v8::Number>(pf->rpm));
    Nan::Set(resultArray, 6, Nan::New<v8::Number>(pf->steerAngle));
    Nan::Set(resultArray, 7, Nan::New<v8::Number>(pf->speedKmh));

    // Create an array for velocity in global coordinates
    v8::Local<v8::Array> velocityInGlobalCoordinates = Nan::New<v8::Array>(3);
    Nan::Set(velocityInGlobalCoordinates, 0, Nan::New(pf->velocity[0]));
    Nan::Set(velocityInGlobalCoordinates, 1, Nan::New(pf->velocity[1]));
    Nan::Set(velocityInGlobalCoordinates, 2, Nan::New(pf->velocity[2]));
    // Put velocity[3] to resultArray
    Nan::Set(resultArray, 8, velocityInGlobalCoordinates);

    // Create an array for accG in global coordinates
    v8::Local<v8::Array> accG = Nan::New<v8::Array>(3);
    Nan::Set(accG, 0, Nan::New(pf->accG[0]));
    Nan::Set(accG, 1, Nan::New(pf->accG[1]));
    Nan::Set(accG, 2, Nan::New(pf->accG[2]));
    // Put accG[3] to resultArray
    Nan::Set(resultArray, 9, accG);

    // Create an array for wheelSlip in global coordinates
    v8::Local<v8::Array> wheelSlip = Nan::New<v8::Array>(4);
    Nan::Set(wheelSlip, 0, Nan::New(pf->wheelSlip[0]));
    Nan::Set(wheelSlip, 1, Nan::New(pf->wheelSlip[1]));
    Nan::Set(wheelSlip, 2, Nan::New(pf->wheelSlip[2]));
    Nan::Set(wheelSlip, 3, Nan::New(pf->wheelSlip[3]));
    // Put wheelSlip[4] to resultArray
    Nan::Set(resultArray, 10, wheelSlip);

    // Create an array for wheelLoad in global coordinates
    v8::Local<v8::Array> wheelLoad = Nan::New<v8::Array>(4);
    Nan::Set(wheelLoad, 0, Nan::New(pf->wheelLoad[0]));
    Nan::Set(wheelLoad, 1, Nan::New(pf->wheelLoad[1]));
    Nan::Set(wheelLoad, 2, Nan::New(pf->wheelLoad[2]));
    Nan::Set(wheelLoad, 3, Nan::New(pf->wheelLoad[3]));
    // Put wheelLoad[4] to resultArray
    Nan::Set(resultArray, 11, wheelLoad);

    // Create an array for wheelPressure in global coordinates
    v8::Local<v8::Array> wheelPressure = Nan::New<v8::Array>(4);
    Nan::Set(wheelPressure, 0, Nan::New(pf->wheelPressure[0]));
    Nan::Set(wheelPressure, 1, Nan::New(pf->wheelPressure[1]));
    Nan::Set(wheelPressure, 2, Nan::New(pf->wheelPressure[2]));
    Nan::Set(wheelPressure, 3, Nan::New(pf->wheelPressure[3]));
    // Put wheelPressure[4] to resultArray
    Nan::Set(resultArray, 12, wheelPressure);

    // Create an array for wheelAngularSpeed in global coordinates
    v8::Local<v8::Array> wheelAngularSpeed = Nan::New<v8::Array>(4);
    Nan::Set(wheelAngularSpeed, 0, Nan::New(pf->wheelAngularSpeed[0]));
    Nan::Set(wheelAngularSpeed, 1, Nan::New(pf->wheelAngularSpeed[1]));
    Nan::Set(wheelAngularSpeed, 2, Nan::New(pf->wheelAngularSpeed[2]));
    Nan::Set(wheelAngularSpeed, 3, Nan::New(pf->wheelAngularSpeed[3]));
    // Put wheelAngularSpeed[4] to resultArray
    Nan::Set(resultArray, 13, wheelAngularSpeed);

    // Create an array for tyreWear in global coordinates
    v8::Local<v8::Array> tyreWear = Nan::New<v8::Array>(4);
    Nan::Set(tyreWear, 0, Nan::New(pf->tyreWear[0]));
    Nan::Set(tyreWear, 1, Nan::New(pf->tyreWear[1]));
    Nan::Set(tyreWear, 2, Nan::New(pf->tyreWear[2]));
    Nan::Set(tyreWear, 3, Nan::New(pf->tyreWear[3]));
    // Put tyreWear[4] to resultArray
    Nan::Set(resultArray, 14, tyreWear);

    // Create an array for tyreDirtyLevel in global coordinates
    v8::Local<v8::Array> tyreDirtyLevel = Nan::New<v8::Array>(4);
    Nan::Set(tyreDirtyLevel, 0, Nan::New(pf->tyreDirtyLevel[0]));
    Nan::Set(tyreDirtyLevel, 1, Nan::New(pf->tyreDirtyLevel[1]));
    Nan::Set(tyreDirtyLevel, 2, Nan::New(pf->tyreDirtyLevel[2]));
    Nan::Set(tyreDirtyLevel, 3, Nan::New(pf->tyreDirtyLevel[3]));
    // Put tyreDirtyLevel[4] to resultArray
    Nan::Set(resultArray, 15, tyreDirtyLevel);

    // Create an array for tyreCoreTemperature in global coordinates
    v8::Local<v8::Array> tyreCoreTemperature = Nan::New<v8::Array>(4);
    Nan::Set(tyreCoreTemperature, 0, Nan::New(pf->tyreCoreTemperature[0]));
    Nan::Set(tyreCoreTemperature, 1, Nan::New(pf->tyreCoreTemperature[1]));
    Nan::Set(tyreCoreTemperature, 2, Nan::New(pf->tyreCoreTemperature[2]));
    Nan::Set(tyreCoreTemperature, 3, Nan::New(pf->tyreCoreTemperature[3]));
    // Put tyreCoreTemperature[4] to resultArray
    Nan::Set(resultArray, 16, tyreCoreTemperature);

    // Create an array for camberRAD in global coordinates
    v8::Local<v8::Array> camberRAD = Nan::New<v8::Array>(4);
    Nan::Set(camberRAD, 0, Nan::New(pf->camberRAD[0]));
    Nan::Set(camberRAD, 1, Nan::New(pf->camberRAD[1]));
    Nan::Set(camberRAD, 2, Nan::New(pf->camberRAD[2]));
    Nan::Set(camberRAD, 3, Nan::New(pf->camberRAD[3]));
    // Put camberRAD[4] to resultArray
    Nan::Set(resultArray, 17, camberRAD);

    // Create an array for suspensionTravel in global coordinates
    v8::Local<v8::Array> suspensionTravel = Nan::New<v8::Array>(4);
    Nan::Set(suspensionTravel, 0, Nan::New(pf->suspensionTravel[0]));
    Nan::Set(suspensionTravel, 1, Nan::New(pf->suspensionTravel[1]));
    Nan::Set(suspensionTravel, 2, Nan::New(pf->suspensionTravel[2]));
    Nan::Set(suspensionTravel, 3, Nan::New(pf->suspensionTravel[3]));
    // Put suspensionTravel[4] to resultArray
    Nan::Set(resultArray, 18, suspensionTravel);

    Nan::Set(resultArray, 19, Nan::New<v8::Number>(pf->drs));
    Nan::Set(resultArray, 20, Nan::New<v8::Number>(pf->tc));
    Nan::Set(resultArray, 21, Nan::New<v8::Number>(pf->heading));
    Nan::Set(resultArray, 22, Nan::New<v8::Number>(pf->pitch));
    Nan::Set(resultArray, 23, Nan::New<v8::Number>(pf->roll));
    Nan::Set(resultArray, 24, Nan::New<v8::Number>(pf->cgHeight));

    // Create an array for carDamage in global coordinates
    v8::Local<v8::Array> carDamage = Nan::New<v8::Array>(5);
    Nan::Set(carDamage, 0, Nan::New(pf->carDamage[0]));
    Nan::Set(carDamage, 1, Nan::New(pf->carDamage[1]));
    Nan::Set(carDamage, 2, Nan::New(pf->carDamage[2]));
    Nan::Set(carDamage, 3, Nan::New(pf->carDamage[3]));
    Nan::Set(carDamage, 4, Nan::New(pf->carDamage[4]));
    // Put carDamage[4] to resultArray
    Nan::Set(resultArray, 25, carDamage);

    Nan::Set(resultArray, 26, Nan::New<v8::Number>(pf->numberOfTyresOut));
    Nan::Set(resultArray, 27, Nan::New<v8::Number>(pf->pitLimiterOn));
    Nan::Set(resultArray, 28, Nan::New<v8::Number>(pf->abs));
    Nan::Set(resultArray, 29, Nan::New<v8::Number>(pf->kersCharge));
    Nan::Set(resultArray, 30, Nan::New<v8::Number>(pf->kersInput));
    Nan::Set(resultArray, 31, Nan::New<v8::Number>(pf->autoShifterOn));

    // Create an array for rideHeight in global coordinates
    v8::Local<v8::Array> rideHeight = Nan::New<v8::Array>(2);
    Nan::Set(rideHeight, 0, Nan::New(pf->rideHeight[0]));
    Nan::Set(rideHeight, 1, Nan::New(pf->rideHeight[1]));
    // Put rideHeight[2] to resultArray
    Nan::Set(resultArray, 32, rideHeight);

    Nan::Set(resultArray, 33, Nan::New<v8::Number>(pf->turboBoost));
    Nan::Set(resultArray, 34, Nan::New<v8::Number>(pf->ballast));
    Nan::Set(resultArray, 35, Nan::New<v8::Number>(pf->airDensity));
    Nan::Set(resultArray, 36, Nan::New<v8::Number>(pf->airTemp));
    Nan::Set(resultArray, 37, Nan::New<v8::Number>(pf->roadTemp));

    // Create an array for localAngularVel in global coordinates
    v8::Local<v8::Array> localAngularVel = Nan::New<v8::Array>(3);
    Nan::Set(localAngularVel, 0, Nan::New(pf->localAngularVel[0]));
    Nan::Set(localAngularVel, 1, Nan::New(pf->localAngularVel[1]));
    Nan::Set(localAngularVel, 2, Nan::New(pf->localAngularVel[2]));
    // Put localAngularVel[3] to resultArray
    Nan::Set(resultArray, 38, localAngularVel);

    Nan::Set(resultArray, 39, Nan::New<v8::Number>(pf->finalFF));
    Nan::Set(resultArray, 40, Nan::New<v8::Number>(pf->performanceMeter));
    Nan::Set(resultArray, 41, Nan::New<v8::Number>(pf->engineBrake));
    Nan::Set(resultArray, 42, Nan::New<v8::Number>(pf->ersRecoveryLevel));
    Nan::Set(resultArray, 43, Nan::New<v8::Number>(pf->ersPowerLevel));
    Nan::Set(resultArray, 44, Nan::New<v8::Number>(pf->ersHeatCharging));
    Nan::Set(resultArray, 45, Nan::New<v8::Number>(pf->ersIsCharging));
    Nan::Set(resultArray, 46, Nan::New<v8::Number>(pf->kersCurrentKJ));
    Nan::Set(resultArray, 47, Nan::New<v8::Number>(pf->drsAvailable));
    Nan::Set(resultArray, 48, Nan::New<v8::Number>(pf->drsEnabled));

    // Create an array for brakeTemp in global coordinates
    v8::Local<v8::Array> brakeTemp = Nan::New<v8::Array>(4);
    Nan::Set(brakeTemp, 0, Nan::New(pf->brakeTemp[0]));
    Nan::Set(brakeTemp, 1, Nan::New(pf->brakeTemp[1]));
    Nan::Set(brakeTemp, 2, Nan::New(pf->brakeTemp[2]));
    Nan::Set(brakeTemp, 3, Nan::New(pf->brakeTemp[3]));
    // Put brakeTemp[4] to resultArray
    Nan::Set(resultArray, 49, brakeTemp);

    Nan::Set(resultArray, 50, Nan::New<v8::Number>(pf->clutch));

    // Create an array for tyreTempI in global coordinates
    v8::Local<v8::Array> tyreTempI = Nan::New<v8::Array>(4);
    Nan::Set(tyreTempI, 0, Nan::New(pf->tyreTempI[0]));
    Nan::Set(tyreTempI, 1, Nan::New(pf->tyreTempI[1]));
    Nan::Set(tyreTempI, 2, Nan::New(pf->tyreTempI[2]));
    Nan::Set(tyreTempI, 3, Nan::New(pf->tyreTempI[3]));
    // Put tyreTempI[4] to resultArray
    Nan::Set(resultArray, 51, tyreTempI);

    // Create an array for tyreTempM in global coordinates
    v8::Local<v8::Array> tyreTempM = Nan::New<v8::Array>(4);
    Nan::Set(tyreTempM, 0, Nan::New(pf->tyreTempM[0]));
    Nan::Set(tyreTempM, 1, Nan::New(pf->tyreTempM[1]));
    Nan::Set(tyreTempM, 2, Nan::New(pf->tyreTempM[2]));
    Nan::Set(tyreTempM, 3, Nan::New(pf->tyreTempM[3]));
    // Put tyreTempM[4] to resultArray
    Nan::Set(resultArray, 52, tyreTempM);

    // Create an array for tyreTempO in global coordinates
    v8::Local<v8::Array> tyreTempO = Nan::New<v8::Array>(4);
    Nan::Set(tyreTempO, 0, Nan::New(pf->tyreTempO[0]));
    Nan::Set(tyreTempO, 1, Nan::New(pf->tyreTempO[1]));
    Nan::Set(tyreTempO, 2, Nan::New(pf->tyreTempO[2]));
    Nan::Set(tyreTempO, 3, Nan::New(pf->tyreTempO[3]));
    // Put tyreTempO[4] to resultArray
    Nan::Set(resultArray, 53, tyreTempO);

    Nan::Set(resultArray, 54, Nan::New<v8::Number>(pf->isAIControlled));

    // Create a nested array for tyreContactPoint
    v8::Local<v8::Array> tyreContactPoint = Nan::New<v8::Array>(4);
    for (int i = 0; i < 4; i++)
    {
        v8::Local<v8::Array> point = Nan::New<v8::Array>(3);
        Nan::Set(point, 0, Nan::New(pf->tyreContactPoint[i][0]));
        Nan::Set(point, 1, Nan::New(pf->tyreContactPoint[i][1]));
        Nan::Set(point, 2, Nan::New(pf->tyreContactPoint[i][2]));
        Nan::Set(tyreContactPoint, i, point);
    }
    Nan::Set(resultArray, 55, tyreContactPoint);

    // Create a nested array for tyreContactNormal
    v8::Local<v8::Array> tyreContactNormal = Nan::New<v8::Array>(4);
    for (int i = 0; i < 4; i++)
    {
        v8::Local<v8::Array> normal = Nan::New<v8::Array>(3);
        Nan::Set(normal, 0, Nan::New(pf->tyreContactNormal[i][0]));
        Nan::Set(normal, 1, Nan::New(pf->tyreContactNormal[i][1]));
        Nan::Set(normal, 2, Nan::New(pf->tyreContactNormal[i][2]));
        Nan::Set(tyreContactNormal, i, normal);
    }
    Nan::Set(resultArray, 56, tyreContactNormal);

    // Create a nested array for tyreContactHeading
    v8::Local<v8::Array> tyreContactHeading = Nan::New<v8::Array>(4);
    for (int i = 0; i < 4; i++)
    {
        v8::Local<v8::Array> heading = Nan::New<v8::Array>(3);
        Nan::Set(heading, 0, Nan::New(pf->tyreContactHeading[i][0]));
        Nan::Set(heading, 1, Nan::New(pf->tyreContactHeading[i][1]));
        Nan::Set(heading, 2, Nan::New(pf->tyreContactHeading[i][2]));
        Nan::Set(tyreContactHeading, i, heading);
    }
    Nan::Set(resultArray, 57, tyreContactHeading);

    Nan::Set(resultArray, 58, Nan::New<v8::Number>(pf->brakeBias));

    // Create an array for localVelocity
    v8::Local<v8::Array> localVelocity = Nan::New<v8::Array>(3);
    Nan::Set(localVelocity, 0, Nan::New(pf->localVelocity[0]));
    Nan::Set(localVelocity, 1, Nan::New(pf->localVelocity[1]));
    Nan::Set(localVelocity, 2, Nan::New(pf->localVelocity[2]));
    Nan::Set(resultArray, 59, localVelocity);

    Nan::Set(resultArray, 60, Nan::New<v8::Number>(pf->P2PActivations));
    Nan::Set(resultArray, 61, Nan::New<v8::Number>(pf->P2PStatus));
    Nan::Set(resultArray, 62, Nan::New<v8::Number>(pf->currentMaxRpm));

    // Create arrays for mz, fx, fy
    v8::Local<v8::Array> mz = Nan::New<v8::Array>(4);
    v8::Local<v8::Array> fx = Nan::New<v8::Array>(4);
    v8::Local<v8::Array> fy = Nan::New<v8::Array>(4);
    v8::Local<v8::Array> slipRatio = Nan::New<v8::Array>(4);
    v8::Local<v8::Array> slipAngle = Nan::New<v8::Array>(4);

    for (int i = 0; i < 4; i++)
    {
        Nan::Set(mz, i, Nan::New(pf->mz[i]));
        Nan::Set(fx, i, Nan::New(pf->fx[i]));
        Nan::Set(fy, i, Nan::New(pf->fy[i]));
        Nan::Set(slipRatio, i, Nan::New(pf->slipRatio[i]));
        Nan::Set(slipAngle, i, Nan::New(pf->slipAngle[i]));
    }

    Nan::Set(resultArray, 63, mz);
    Nan::Set(resultArray, 64, fx);
    Nan::Set(resultArray, 65, fy);
    Nan::Set(resultArray, 66, slipRatio);
    Nan::Set(resultArray, 67, slipAngle);

    // Create arrays for suspensionDamage, tyreTemp, brakePressure, padLife, discLife
    v8::Local<v8::Array> suspensionDamage = Nan::New<v8::Array>(4);
    v8::Local<v8::Array> tyreTemp = Nan::New<v8::Array>(4);
    v8::Local<v8::Array> brakePressure = Nan::New<v8::Array>(4);
    v8::Local<v8::Array> padLife = Nan::New<v8::Array>(4);
    v8::Local<v8::Array> discLife = Nan::New<v8::Array>(4);

    for (int i = 0; i < 4; i++)
    {
        Nan::Set(suspensionDamage, i, Nan::New(pf->suspensionDamage[i]));
        Nan::Set(tyreTemp, i, Nan::New(pf->tyreTemp[i]));
        Nan::Set(brakePressure, i, Nan::New(pf->brakePressure[i]));
        Nan::Set(padLife, i, Nan::New(pf->padLife[i]));
        Nan::Set(discLife, i, Nan::New(pf->discLife[i]));
    }

    Nan::Set(resultArray, 68, Nan::New<v8::Number>(pf->tcinAction));
    Nan::Set(resultArray, 69, Nan::New<v8::Number>(pf->absInAction));
    Nan::Set(resultArray, 70, suspensionDamage);
    Nan::Set(resultArray, 71, tyreTemp);
    Nan::Set(resultArray, 72, Nan::New<v8::Number>(pf->waterTemp));
    Nan::Set(resultArray, 73, brakePressure);
    Nan::Set(resultArray, 74, Nan::New<v8::Number>(pf->frontBrakeCompound));
    Nan::Set(resultArray, 75, Nan::New<v8::Number>(pf->rearBrakeCompound));
    Nan::Set(resultArray, 76, padLife);
    Nan::Set(resultArray, 77, discLife);
    Nan::Set(resultArray, 78, Nan::New<v8::Number>(pf->isIgnitionOn));
    Nan::Set(resultArray, 79, Nan::New<v8::Number>(pf->isStarterEngineOn));
    Nan::Set(resultArray, 80, Nan::New<v8::Number>(pf->isEngineRunning));
    Nan::Set(resultArray, 81, Nan::New<v8::Number>(pf->kerbVibration));
    Nan::Set(resultArray, 82, Nan::New<v8::Number>(pf->slipVibrations));
    Nan::Set(resultArray, 83, Nan::New<v8::Number>(pf->gVibrations));
    Nan::Set(resultArray, 84, Nan::New<v8::Number>(pf->absVibrations));

    info.GetReturnValue().Set(resultArray);

    dismiss(m_physics);
}

void GetGraphics(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
    initGraphics();

    SPageFileGraphics *pf = (SPageFileGraphics *)m_graphics.mapFileBuffer;

    // Define the array size based on the number of elements in SPageFileGraphics
    const size_t arraySize = 325; // Adjusted based on included fields

    v8::Local<v8::Array> resultArray = Nan::New<v8::Array>(arraySize);

    // Set simple scalar values (int and float)
    Nan::Set(resultArray, 0, Nan::New<v8::Number>(pf->packetId));
    Nan::Set(resultArray, 1, Nan::New<v8::Number>(pf->status));
    Nan::Set(resultArray, 2, Nan::New<v8::Number>(pf->session));
    Nan::Set(resultArray, 3, Nan::New<v8::String>((uint16_t *)pf->currentTime).ToLocalChecked());
    Nan::Set(resultArray, 4, Nan::New<v8::String>((uint16_t *)pf->lastTime).ToLocalChecked());
    Nan::Set(resultArray, 5, Nan::New<v8::String>((uint16_t *)pf->bestTime).ToLocalChecked());
    Nan::Set(resultArray, 6, Nan::New<v8::String>((uint16_t *)pf->split).ToLocalChecked());
    Nan::Set(resultArray, 7, Nan::New<v8::Number>(pf->completedLaps));
    Nan::Set(resultArray, 8, Nan::New<v8::Number>(pf->position));
    Nan::Set(resultArray, 9, Nan::New<v8::Number>(pf->iCurrentTime));
    Nan::Set(resultArray, 10, Nan::New<v8::Number>(pf->iLastTime));
    Nan::Set(resultArray, 11, Nan::New<v8::Number>(pf->iBestTime));
    Nan::Set(resultArray, 12, Nan::New<v8::Number>(pf->sessionTimeLeft));
    Nan::Set(resultArray, 13, Nan::New<v8::Number>(pf->distanceTraveled));
    Nan::Set(resultArray, 14, Nan::New<v8::Boolean>(pf->isInPit));
    Nan::Set(resultArray, 15, Nan::New<v8::Number>(pf->currentSectorIndex));
    Nan::Set(resultArray, 16, Nan::New<v8::Number>(pf->lastSectorTime));
    Nan::Set(resultArray, 17, Nan::New<v8::Number>(pf->numberOfLaps));
    Nan::Set(resultArray, 18, Nan::New<v8::String>((uint16_t *)pf->tyreCompound).ToLocalChecked());
    Nan::Set(resultArray, 19, Nan::New<v8::Number>(pf->replayTimeMultiplier));
    Nan::Set(resultArray, 20, Nan::New<v8::Number>(pf->normalizedCarPosition));
    Nan::Set(resultArray, 21, Nan::New<v8::Number>(pf->activeCars));

    // carCoordinates (60x3)
    for (int i = 0; i < 60; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            Nan::Set(resultArray, 22 + i * 3 + j, Nan::New<v8::Number>(pf->carCoordinates[i][j]));
        }
    }

    // carID (60)
    for (int i = 0; i < 60; i++)
    {
        Nan::Set(resultArray, 202 + i, Nan::New<v8::Number>(pf->carID[i]));
    }

    Nan::Set(resultArray, 262, Nan::New<v8::Number>(pf->playerCarID));
    Nan::Set(resultArray, 263, Nan::New<v8::Number>(pf->penaltyTime));
    Nan::Set(resultArray, 264, Nan::New<v8::Number>(pf->flag));
    Nan::Set(resultArray, 265, Nan::New<v8::Number>(static_cast<int>(pf->penalty)));
    Nan::Set(resultArray, 266, Nan::New<v8::Boolean>(pf->idealLineOn));
    Nan::Set(resultArray, 267, Nan::New<v8::Boolean>(pf->isInPitLane));
    Nan::Set(resultArray, 268, Nan::New<v8::Number>(pf->surfaceGrip));
    Nan::Set(resultArray, 269, Nan::New<v8::Boolean>(pf->mandatoryPitDone));
    Nan::Set(resultArray, 270, Nan::New<v8::Number>(pf->windSpeed));
    Nan::Set(resultArray, 271, Nan::New<v8::Number>(pf->windDirection));
    Nan::Set(resultArray, 272, Nan::New<v8::Boolean>(pf->isSetupMenuVisible));
    Nan::Set(resultArray, 273, Nan::New<v8::Number>(pf->mainDisplayIndex));
    Nan::Set(resultArray, 274, Nan::New<v8::Number>(pf->secondaryDisplayIndex));
    Nan::Set(resultArray, 275, Nan::New<v8::Number>(pf->TC));
    Nan::Set(resultArray, 276, Nan::New<v8::Number>(pf->TCCut));
    Nan::Set(resultArray, 277, Nan::New<v8::Number>(pf->EngineMap));
    Nan::Set(resultArray, 278, Nan::New<v8::Number>(pf->ABS));
    Nan::Set(resultArray, 279, Nan::New<v8::Number>(pf->fuelXLap));
    Nan::Set(resultArray, 280, Nan::New<v8::Number>(pf->rainLights));
    Nan::Set(resultArray, 281, Nan::New<v8::Number>(pf->flashingLights));
    Nan::Set(resultArray, 282, Nan::New<v8::Number>(pf->lightsStage));
    Nan::Set(resultArray, 283, Nan::New<v8::Number>(pf->exhaustTemperature));
    Nan::Set(resultArray, 284, Nan::New<v8::Number>(pf->wiperLV));
    Nan::Set(resultArray, 285, Nan::New<v8::Number>(pf->DriverStintTotalTimeLeft));
    Nan::Set(resultArray, 286, Nan::New<v8::Number>(pf->DriverStintTimeLeft));
    Nan::Set(resultArray, 287, Nan::New<v8::Number>(pf->rainTires));
    Nan::Set(resultArray, 288, Nan::New<v8::Number>(pf->sessionIndex));
    Nan::Set(resultArray, 289, Nan::New<v8::Number>(pf->usedFuel));
    Nan::Set(resultArray, 290, Nan::New<v8::String>((uint16_t *)pf->deltaLapTime).ToLocalChecked());
    Nan::Set(resultArray, 291, Nan::New<v8::Number>(pf->iDeltaLapTime));
    Nan::Set(resultArray, 292, Nan::New<v8::String>((uint16_t *)pf->estimatedLapTime).ToLocalChecked());
    Nan::Set(resultArray, 293, Nan::New<v8::Number>(pf->iEstimatedLapTime));
    Nan::Set(resultArray, 294, Nan::New<v8::Boolean>(pf->isDeltaPositive));
    Nan::Set(resultArray, 295, Nan::New<v8::Number>(pf->iSplit));
    Nan::Set(resultArray, 296, Nan::New<v8::Boolean>(pf->isValidLap));
    Nan::Set(resultArray, 297, Nan::New<v8::Number>(pf->fuelEstimatedLaps));
    Nan::Set(resultArray, 298, Nan::New<v8::String>((uint16_t *)pf->trackStatus).ToLocalChecked());
    Nan::Set(resultArray, 299, Nan::New<v8::Number>(pf->missingMandatoryPits));
    Nan::Set(resultArray, 300, Nan::New<v8::Number>(pf->clock));
    Nan::Set(resultArray, 301, Nan::New<v8::Boolean>(pf->directionLightsLeft));
    Nan::Set(resultArray, 302, Nan::New<v8::Boolean>(pf->directionLightsRight));
    Nan::Set(resultArray, 303, Nan::New<v8::Boolean>(pf->globalYellow));
    Nan::Set(resultArray, 304, Nan::New<v8::Boolean>(pf->globalYellow1));
    Nan::Set(resultArray, 305, Nan::New<v8::Boolean>(pf->globalYellow2));
    Nan::Set(resultArray, 306, Nan::New<v8::Boolean>(pf->globalYellow3));
    Nan::Set(resultArray, 307, Nan::New<v8::Boolean>(pf->globalWhite));
    Nan::Set(resultArray, 308, Nan::New<v8::Boolean>(pf->globalGreen));
    Nan::Set(resultArray, 309, Nan::New<v8::Boolean>(pf->globalChequered));
    Nan::Set(resultArray, 310, Nan::New<v8::Boolean>(pf->globalRed));
    Nan::Set(resultArray, 311, Nan::New<v8::Number>(pf->mfdTyreSet));
    Nan::Set(resultArray, 312, Nan::New<v8::Number>(pf->mfdFuelToAdd));
    Nan::Set(resultArray, 313, Nan::New<v8::Number>(pf->mfdTyrePressureLF));
    Nan::Set(resultArray, 314, Nan::New<v8::Number>(pf->mfdTyrePressureRF));
    Nan::Set(resultArray, 315, Nan::New<v8::Number>(pf->mfdTyrePressureLR));
    Nan::Set(resultArray, 316, Nan::New<v8::Number>(pf->mfdTyrePressureRR));
    Nan::Set(resultArray, 317, Nan::New<v8::Number>(pf->trackGripStatus));
    Nan::Set(resultArray, 318, Nan::New<v8::Number>(pf->rainIntensity));
    Nan::Set(resultArray, 319, Nan::New<v8::Number>(pf->rainIntensityIn10min));
    Nan::Set(resultArray, 320, Nan::New<v8::Number>(pf->rainIntensityIn30min));
    Nan::Set(resultArray, 321, Nan::New<v8::Number>(pf->currentTyreSet));
    Nan::Set(resultArray, 322, Nan::New<v8::Number>(pf->strategyTyreSet));
    Nan::Set(resultArray, 323, Nan::New<v8::Number>(pf->gapAhead));
    Nan::Set(resultArray, 324, Nan::New<v8::Number>(pf->gapBehind));

    info.GetReturnValue().Set(resultArray);

    dismiss(m_graphics);
}

void GetStatic(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
    initStatic();

    SPageFileStatic *pf = (SPageFileStatic *)m_static.mapFileBuffer;

    // Create an array to hold all the values
    const size_t arraySize = 51; // Adjust based on the number of elements in your struct

    v8::Local<v8::Array> resultArray = Nan::New<v8::Array>(arraySize);

    // Set simple scalar values (int and float) directly
    Nan::Set(resultArray, 0, Nan::New<v8::String>((uint16_t *)pf->smVersion).ToLocalChecked());
    Nan::Set(resultArray, 1, Nan::New<v8::String>((uint16_t *)pf->acVersion).ToLocalChecked());
    Nan::Set(resultArray, 2, Nan::New<v8::Number>(pf->numberOfSessions));
    Nan::Set(resultArray, 3, Nan::New<v8::Number>(pf->numCars));
    Nan::Set(resultArray, 4, Nan::New<v8::String>((uint16_t *)pf->carModel).ToLocalChecked());
    Nan::Set(resultArray, 5, Nan::New<v8::String>((uint16_t *)pf->track).ToLocalChecked());
    Nan::Set(resultArray, 6, Nan::New<v8::String>((uint16_t *)pf->playerName).ToLocalChecked());
    Nan::Set(resultArray, 7, Nan::New<v8::String>((uint16_t *)pf->playerSurname).ToLocalChecked());
    Nan::Set(resultArray, 8, Nan::New<v8::String>((uint16_t *)pf->playerNick).ToLocalChecked());
    Nan::Set(resultArray, 9, Nan::New<v8::Number>(pf->sectorCount));
    Nan::Set(resultArray, 10, Nan::New<v8::Number>(pf->maxTorque));
    Nan::Set(resultArray, 11, Nan::New<v8::Number>(pf->maxPower));
    Nan::Set(resultArray, 12, Nan::New<v8::Number>(pf->maxRpm));
    Nan::Set(resultArray, 13, Nan::New<v8::Number>(pf->maxFuel));

    // Suspension max travel [FL, FR, RL, RR]
    Nan::Set(resultArray, 14, Nan::New<v8::Number>(pf->suspensionMaxTravel[0]));
    Nan::Set(resultArray, 15, Nan::New<v8::Number>(pf->suspensionMaxTravel[1]));
    Nan::Set(resultArray, 16, Nan::New<v8::Number>(pf->suspensionMaxTravel[2]));
    Nan::Set(resultArray, 17, Nan::New<v8::Number>(pf->suspensionMaxTravel[3]));

    // Tyre radius [FL, FR, RL, RR]
    Nan::Set(resultArray, 18, Nan::New<v8::Number>(pf->tyreRadius[0]));
    Nan::Set(resultArray, 19, Nan::New<v8::Number>(pf->tyreRadius[1]));
    Nan::Set(resultArray, 20, Nan::New<v8::Number>(pf->tyreRadius[2]));
    Nan::Set(resultArray, 21, Nan::New<v8::Number>(pf->tyreRadius[3]));

    Nan::Set(resultArray, 22, Nan::New<v8::Number>(pf->maxTurboBoost));
    Nan::Set(resultArray, 23, Nan::New<v8::Number>(pf->deprecated_1));
    Nan::Set(resultArray, 24, Nan::New<v8::Number>(pf->deprecated_2));
    Nan::Set(resultArray, 25, Nan::New<v8::Number>(pf->penaltiesEnabled));
    Nan::Set(resultArray, 26, Nan::New<v8::Number>(pf->aidFuelRate));
    Nan::Set(resultArray, 27, Nan::New<v8::Number>(pf->aidTireRate));
    Nan::Set(resultArray, 28, Nan::New<v8::Number>(pf->aidMechanicalDamage));
    Nan::Set(resultArray, 29, Nan::New<v8::Boolean>(pf->aidAllowTyreBlankets));
    Nan::Set(resultArray, 30, Nan::New<v8::Number>(pf->aidStability));
    Nan::Set(resultArray, 31, Nan::New<v8::Boolean>(pf->aidAutoClutch));
    Nan::Set(resultArray, 32, Nan::New<v8::Boolean>(pf->aidAutoBlip));
    Nan::Set(resultArray, 33, Nan::New<v8::Boolean>(pf->hasDRS));
    Nan::Set(resultArray, 34, Nan::New<v8::Boolean>(pf->hasERS));
    Nan::Set(resultArray, 35, Nan::New<v8::Boolean>(pf->hasKERS));
    Nan::Set(resultArray, 36, Nan::New<v8::Number>(pf->kersMaxJ));
    Nan::Set(resultArray, 37, Nan::New<v8::Number>(pf->engineBrakeSettingsCount));
    Nan::Set(resultArray, 38, Nan::New<v8::Number>(pf->ersPowerControllerCount));
    Nan::Set(resultArray, 39, Nan::New<v8::Number>(pf->trackSPlineLength));
    Nan::Set(resultArray, 40, Nan::New<v8::String>((uint16_t *)pf->trackConfiguration).ToLocalChecked());
    Nan::Set(resultArray, 41, Nan::New<v8::Number>(pf->ersMaxJ));
    Nan::Set(resultArray, 42, Nan::New<v8::Boolean>(pf->isTimedRace));
    Nan::Set(resultArray, 43, Nan::New<v8::Boolean>(pf->hasExtraLap));
    Nan::Set(resultArray, 44, Nan::New<v8::String>((uint16_t *)pf->carSkin).ToLocalChecked());
    Nan::Set(resultArray, 45, Nan::New<v8::Number>(pf->reversedGridPositions));
    Nan::Set(resultArray, 46, Nan::New<v8::Number>(pf->PitWindowStart));
    Nan::Set(resultArray, 47, Nan::New<v8::Number>(pf->PitWindowEnd));
    Nan::Set(resultArray, 48, Nan::New<v8::Boolean>(pf->isOnline));
    Nan::Set(resultArray, 49, Nan::New<v8::String>((uint16_t *)pf->dryTiresName).ToLocalChecked());
    Nan::Set(resultArray, 50, Nan::New<v8::String>((uint16_t *)pf->wetTiresName).ToLocalChecked());

    info.GetReturnValue().Set(resultArray);

    dismiss(m_static);
}

void Initialize(v8::Local<v8::Object> exports)
{
    Nan::Set(exports, Nan::New("getPhysics").ToLocalChecked(),
             Nan::GetFunction(Nan::New<v8::FunctionTemplate>(GetPhysics)).ToLocalChecked());

    Nan::Set(exports, Nan::New("getGraphics").ToLocalChecked(),
             Nan::GetFunction(Nan::New<v8::FunctionTemplate>(GetGraphics)).ToLocalChecked());

    Nan::Set(exports, Nan::New("getStatic").ToLocalChecked(),
             Nan::GetFunction(Nan::New<v8::FunctionTemplate>(GetStatic)).ToLocalChecked());
}

NODE_MODULE(addon, Initialize)
