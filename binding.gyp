{
  "targets": [
    {
      "target_name": "AssettoCorsaSDK",
      "sources": [
        "src/cpp/AssettoCorsaSDK.cc",
        "src/cpp/SharedFileOut.h",
        "src/cpp/stdafx.h",
        "src/cpp/targetver.h"
      ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}
