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

void GetPhysics(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
    initPhysics();
    SPageFilePhysics *pf = (SPageFilePhysics *)m_physics.mapFileBuffer;

    // Create an array to hold all the values
    const size_t arraySize = 11; // Adjust based on the number of elements in your struct

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

    // Create an array for accG in global coordinates
    v8::Local<v8::Array> wheelSlip = Nan::New<v8::Array>(4);
    Nan::Set(wheelSlip, 0, Nan::New(pf->wheelSlip[0]));
    Nan::Set(wheelSlip, 1, Nan::New(pf->wheelSlip[1]));
    Nan::Set(wheelSlip, 2, Nan::New(pf->wheelSlip[2]));
    Nan::Set(wheelSlip, 3, Nan::New(pf->wheelSlip[3]));
    // Put wheelSlip[4] to resultArray
    Nan::Set(resultArray, 10, wheelSlip);

    info.GetReturnValue().Set(resultArray);
}

void Initialize(v8::Local<v8::Object> exports)
{
    Nan::Set(exports, Nan::New("getPhysics").ToLocalChecked(),
             Nan::GetFunction(Nan::New<v8::FunctionTemplate>(GetPhysics)).ToLocalChecked());
}

NODE_MODULE(addon, Initialize)
