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

SMElement m_physics;

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

void GetArrayOfArrays(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
    // Create an inner array with numbers (first array)
    v8::Local<v8::Array> innerArray1 = Nan::New<v8::Array>(3);
    Nan::Set(innerArray1, 0, Nan::New(1));
    Nan::Set(innerArray1, 1, Nan::New(2));
    Nan::Set(innerArray1, 2, Nan::New(3));

    // Create another inner array with numbers (second array)
    v8::Local<v8::Array> innerArray2 = Nan::New<v8::Array>(3);
    Nan::Set(innerArray2, 0, Nan::New(4));
    Nan::Set(innerArray2, 1, Nan::New(5));
    Nan::Set(innerArray2, 2, Nan::New(6));

    // Create the outer array that will hold the inner arrays
    v8::Local<v8::Array> outerArray = Nan::New<v8::Array>(2);
    Nan::Set(outerArray, 0, innerArray1);
    Nan::Set(outerArray, 1, innerArray2);

    // Return the outer array to JavaScript
    info.GetReturnValue().Set(outerArray);
}

void GetPhysics(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
    initPhysics();
    SPageFilePhysics *pf = (SPageFilePhysics *)m_physics.mapFileBuffer;

    // Create an array to hold all the values
    const size_t arraySize = 134; // Adjust based on the number of elements in your struct

    v8::Local<v8::Array> resultArray = Nan::New<v8::Array>(arraySize);

    // Set simple scalar values (int and float) directly
    Nan::Set(resultArray, 0, Nan::New<v8::Number>(pf->packetId));
    Nan::Set(resultArray, 1, Nan::New<v8::Number>(pf->gas));
    Nan::Set(resultArray, 2, Nan::New<v8::Number>(pf->brake));
    Nan::Set(resultArray, 3, Nan::New<v8::Number>(pf->fuel));
    Nan::Set(resultArray, 4, Nan::New<v8::Number>(pf->gear));
    Nan::Set(resultArray, 5, Nan::New<v8::Number>(pf->rpms));
    Nan::Set(resultArray, 6, Nan::New<v8::Number>(pf->steerAngle));
    Nan::Set(resultArray, 7, Nan::New<v8::Number>(pf->speedKmh));

    // Set velocity and accG as arrays
    for (size_t i = 0; i < 3; ++i)
    {
        Nan::Set(resultArray, 8 + i, Nan::New<v8::Number>(pf->velocity[i]));
        Nan::Set(resultArray, 11 + i, Nan::New<v8::Number>(pf->accG[i]));
    }

    // Set wheelSlip, wheelLoad, etc. as arrays
    for (size_t i = 0; i < 4; ++i)
    {
        Nan::Set(resultArray, 14 + i, Nan::New<v8::Number>(pf->wheelSlip[i]));
        Nan::Set(resultArray, 18 + i, Nan::New<v8::Number>(pf->wheelLoad[i]));
        Nan::Set(resultArray, 22 + i, Nan::New<v8::Number>(pf->wheelsPressure[i]));
        Nan::Set(resultArray, 26 + i, Nan::New<v8::Number>(pf->wheelAngularSpeed[i]));
        Nan::Set(resultArray, 30 + i, Nan::New<v8::Number>(pf->tyreWear[i]));
        Nan::Set(resultArray, 34 + i, Nan::New<v8::Number>(pf->tyreDirtyLevel[i]));
        Nan::Set(resultArray, 38 + i, Nan::New<v8::Number>(pf->tyreCoreTemperature[i]));
        Nan::Set(resultArray, 42 + i, Nan::New<v8::Number>(pf->camberRAD[i]));
        Nan::Set(resultArray, 46 + i, Nan::New<v8::Number>(pf->suspensionTravel[i]));
        Nan::Set(resultArray, 50 + i, Nan::New<v8::Number>(pf->carDamage[i]));
        Nan::Set(resultArray, 54 + i, Nan::New<v8::Number>(pf->brakeTemp[i]));
        Nan::Set(resultArray, 58 + i, Nan::New<v8::Number>(pf->tyreTempI[i]));
        Nan::Set(resultArray, 62 + i, Nan::New<v8::Number>(pf->tyreTempM[i]));
        Nan::Set(resultArray, 66 + i, Nan::New<v8::Number>(pf->tyreTempO[i]));
        Nan::Set(resultArray, 70 + i, Nan::New<v8::Number>(pf->suspensionDamage[i]));
        Nan::Set(resultArray, 74 + i, Nan::New<v8::Number>(pf->tyreTemp[i]));
    }

    // Set remaining scalar values
    Nan::Set(resultArray, 78, Nan::New<v8::Number>(pf->drs));
    Nan::Set(resultArray, 79, Nan::New<v8::Number>(pf->tc));
    Nan::Set(resultArray, 80, Nan::New<v8::Number>(pf->heading));
    Nan::Set(resultArray, 81, Nan::New<v8::Number>(pf->pitch));
    Nan::Set(resultArray, 82, Nan::New<v8::Number>(pf->roll));
    Nan::Set(resultArray, 83, Nan::New<v8::Number>(pf->cgHeight));
    Nan::Set(resultArray, 84, Nan::New<v8::Number>(pf->numberOfTyresOut));
    Nan::Set(resultArray, 85, Nan::New<v8::Number>(pf->pitLimiterOn));
    Nan::Set(resultArray, 86, Nan::New<v8::Number>(pf->abs));
    Nan::Set(resultArray, 87, Nan::New<v8::Number>(pf->kersCharge));
    Nan::Set(resultArray, 88, Nan::New<v8::Number>(pf->kersInput));
    Nan::Set(resultArray, 89, Nan::New<v8::Number>(pf->autoShifterOn));
    Nan::Set(resultArray, 90, Nan::New<v8::Number>(pf->turboBoost));
    Nan::Set(resultArray, 91, Nan::New<v8::Number>(pf->ballast));
    Nan::Set(resultArray, 92, Nan::New<v8::Number>(pf->airDensity));
    Nan::Set(resultArray, 93, Nan::New<v8::Number>(pf->airTemp));
    Nan::Set(resultArray, 94, Nan::New<v8::Number>(pf->roadTemp));
    Nan::Set(resultArray, 95, Nan::New<v8::Number>(pf->finalFF));
    Nan::Set(resultArray, 96, Nan::New<v8::Number>(pf->performanceMeter));
    Nan::Set(resultArray, 97, Nan::New<v8::Number>(pf->engineBrake));
    Nan::Set(resultArray, 98, Nan::New<v8::Number>(pf->ersRecoveryLevel));
    Nan::Set(resultArray, 99, Nan::New<v8::Number>(pf->ersPowerLevel));
    Nan::Set(resultArray, 100, Nan::New<v8::Number>(pf->ersHeatCharging));
    Nan::Set(resultArray, 101, Nan::New<v8::Number>(pf->ersIsCharging));
    Nan::Set(resultArray, 102, Nan::New<v8::Number>(pf->kersCurrentKJ));
    Nan::Set(resultArray, 103, Nan::New<v8::Number>(pf->drsAvailable));
    Nan::Set(resultArray, 104, Nan::New<v8::Number>(pf->drsEnabled));
    Nan::Set(resultArray, 105, Nan::New<v8::Number>(pf->clutch));
    Nan::Set(resultArray, 106, Nan::New<v8::Number>(pf->isAIControlled));
    Nan::Set(resultArray, 107, Nan::New<v8::Number>(pf->P2PActivations));
    Nan::Set(resultArray, 108, Nan::New<v8::Number>(pf->P2PStatus));
    Nan::Set(resultArray, 109, Nan::New<v8::Number>(pf->currentMaxRpm));

    // Set mz, fx, fy, slipRatio, slipAngle arrays
    for (size_t i = 0; i < 4; ++i)
    {
        Nan::Set(resultArray, 110 + i, Nan::New<v8::Number>(pf->mz[i]));
        Nan::Set(resultArray, 114 + i, Nan::New<v8::Number>(pf->fx[i]));
        Nan::Set(resultArray, 118 + i, Nan::New<v8::Number>(pf->fy[i]));
        Nan::Set(resultArray, 122 + i, Nan::New<v8::Number>(pf->slipRatio[i]));
        Nan::Set(resultArray, 126 + i, Nan::New<v8::Number>(pf->slipAngle[i]));
    }

    // Set tcinAction, absInAction
    Nan::Set(resultArray, 130, Nan::New<v8::Number>(pf->tcinAction));
    Nan::Set(resultArray, 131, Nan::New<v8::Number>(pf->absInAction));

    info.GetReturnValue().Set(resultArray);
}

void Initialize(v8::Local<v8::Object> exports)
{
    Nan::Set(exports, Nan::New("getPhysics").ToLocalChecked(),
             Nan::GetFunction(Nan::New<v8::FunctionTemplate>(GetPhysics)).ToLocalChecked());
    Nan::Set(exports, Nan::New("getArrayOfArrays").ToLocalChecked(),
             Nan::GetFunction(Nan::New<v8::FunctionTemplate>(GetArrayOfArrays)).ToLocalChecked());
}

NODE_MODULE(addon, Initialize)
