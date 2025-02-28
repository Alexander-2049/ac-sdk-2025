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
    const size_t arraySize = 26; // Adjust based on the number of elements in your struct

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

    info.GetReturnValue().Set(resultArray);

    dismiss(m_physics);
}

void GetGraphics(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
    initGraphics();

    SPageFileGraphics *pf = (SPageFileGraphics *)m_graphics.mapFileBuffer;

    // Create an array to hold all the values
    const size_t arraySize = 2; // Adjust based on the number of elements in your struct

    v8::Local<v8::Array> resultArray = Nan::New<v8::Array>(arraySize);

    // Set simple scalar values (int and float) directly
    Nan::Set(resultArray, 0, Nan::New<v8::Number>(pf->packetId));
    Nan::Set(resultArray, 1, Nan::New<v8::Number>(pf->status));

    info.GetReturnValue().Set(resultArray);

    dismiss(m_graphics);
}

void GetStatic(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
    initStatic();

    SPageFileStatic *pf = (SPageFileStatic *)m_static.mapFileBuffer;

    // Create an array to hold all the values
    const size_t arraySize = 2; // Adjust based on the number of elements in your struct

    v8::Local<v8::Array> resultArray = Nan::New<v8::Array>(arraySize);

    // Set simple scalar values (int and float) directly
    Nan::Set(resultArray, 0, Nan::New<v8::Number>(pf->numberOfSessions)); // REWORK
    Nan::Set(resultArray, 1, Nan::New<v8::Number>(pf->numCars));

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
