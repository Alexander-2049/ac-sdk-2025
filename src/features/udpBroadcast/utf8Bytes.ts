export const utf8Bytes = (str: string): number[] => {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c >= 0xd800 && c <= 0xdbff && i + 1 < str.length) {
      const cn = str.charCodeAt(i + 1);
      if (cn >= 0xdc00 && cn <= 0xdfff) {
        const pt = (c - 0xd800) * 0x400 + cn - 0xdc00 + 0x10000;

        bytes.push(
          0xf0 + Math.floor(pt / 64 / 64 / 64),
          0x80 + (Math.floor(pt / 64 / 64) % 64),
          0x80 + (Math.floor(pt / 64) % 64),
          0x80 + (pt % 64)
        );
        i += 1;
        continue;
      }
    }
    if (c >= 2048) {
      bytes.push(
        0xe0 + Math.floor(c / 64 / 64),
        0x80 + (Math.floor(c / 64) % 64),
        0x80 + (c % 64)
      );
    } else if (c >= 128) {
      bytes.push(0xc0 + Math.floor(c / 64), 0x80 + (c % 64));
    } else {
      bytes.push(c);
    }
  }
  return bytes;
};
