{
  "targets": [
    {
      "target_name": "AssettoCorsaSDK",
      "sources": ["src/cpp/AssettoCorsaSDK.cc"],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}
