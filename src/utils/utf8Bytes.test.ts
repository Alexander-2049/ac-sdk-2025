import { utf8Bytes } from "./utf8Bytes";

describe("utf8Bytes", () => {
  test("encodes ASCII characters correctly", () => {
    expect(utf8Bytes("Hello")).toEqual([72, 101, 108, 108, 111]);
  });

  test("encodes extended Latin characters correctly", () => {
    expect(utf8Bytes("é")).toEqual([0xc3, 0xa9]);
    expect(utf8Bytes("ñ")).toEqual([0xc3, 0xb1]);
  });

  test("encodes Cyrillic characters correctly", () => {
    expect(utf8Bytes("Привет")).toEqual([
      0xd0, 0x9f, 0xd1, 0x80, 0xd0, 0xb8, 0xd0, 0xb2, 0xd0, 0xb5, 0xd1, 0x82,
    ]);
  });

  test("encodes emoji (surrogate pairs) correctly", () => {
    expect(utf8Bytes("😊")).toEqual([0xf0, 0x9f, 0x98, 0x8a]);
    expect(utf8Bytes("🚀")).toEqual([0xf0, 0x9f, 0x9a, 0x80]);
  });

  test("encodes mixed text correctly", () => {
    expect(utf8Bytes("Hello, 世界!")).toEqual([
      72, 101, 108, 108, 111, 44, 32, 0xe4, 0xb8, 0x96, 0xe7, 0x95, 0x8c, 33,
    ]);
  });
});
