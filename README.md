# Assetto Corsa \[Competizione\] SDK

## Description

This library provides a simple connection between NodeJS programs and Assetto Corsa / Assetto Corsa Competizione games realtime data.
It uses Shared Memory for Assetto Corsa and Shared Memory x UDP for Assetto Corsa Competizione.

## Installation

```bash
npm install https://github.com/Alexander-2049/ac-sdk-2025
```

### Assetto Corsa

```ts
import AssettoCorsaSDK, { Game } from "ac-sdk-2025";

const acsdk = new AssettoCorsaSDK({
  updateIntervalMs: 1000 / 60, // 60fps
});

acsdk.addListener("ac_shared_memory_update", (data) => {
  console.log(data.speedKmh);
});

acsdk.addListener("open", (game: Game) => {
  if (game === Game.AssettoCorsaCompetizione) {
    console.log("ACC open");
  }
  if (game === Game.AssettoCorsa) {
    console.log("AC open");
  }
});

acsdk.addListener("close", () => {
  console.log("Game closed");
});
```
