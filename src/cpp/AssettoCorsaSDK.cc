#include <nan.h>

void SayHello(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    info.GetReturnValue().Set(Nan::New("Hello from C++!").ToLocalChecked());
}

void Initialize(v8::Local<v8::Object> exports) {
    Nan::Set(exports, Nan::New("sayHello").ToLocalChecked(),
             Nan::GetFunction(Nan::New<v8::FunctionTemplate>(SayHello)).ToLocalChecked());
}

NODE_MODULE(addon, Initialize)
