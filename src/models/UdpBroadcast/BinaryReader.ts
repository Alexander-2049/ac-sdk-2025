export class BinaryReader {
  ByteBuffer: Uint8Array;
  Endianness: "big" | "little";
  Encoding: string;
  Length: number;
  Position: number;

  constructor(
    input: Buffer | number[] | string,
    p_Endianness: "big" | "little" = "big",
    p_Encoding: BufferEncoding = "ascii"
  ) {
    if (input instanceof Buffer) {
      this.ByteBuffer = new Uint8Array(input);
    } else if (Array.isArray(input)) {
      this.ByteBuffer = new Uint8Array(input);
    } else if (typeof input === "string") {
      this.ByteBuffer = new Uint8Array(Buffer.from(input, p_Encoding));
    } else {
      throw new Error(`Invalid buffer input for BinaryReader: ${typeof input}`);
    }

    this.Endianness = p_Endianness;
    this.Encoding = p_Encoding;
    this.Length = this.ByteBuffer.length;
    this.Position = 0;
  }

  private getBuffer(): Buffer {
    return Buffer.from(
      this.ByteBuffer.buffer,
      this.ByteBuffer.byteOffset,
      this.ByteBuffer.byteLength
    );
  }

  ReadUInt8(): number {
    if (this.ByteBuffer.length < 1) return 0;
    const buffer = this.getBuffer();
    const s_Val = buffer.readUInt8(0);
    this.ByteBuffer = this.ByteBuffer.slice(1);
    ++this.Position;
    return s_Val;
  }

  ReadUInt16(): number {
    if (this.ByteBuffer.length < 2) return 0;
    const buffer = this.getBuffer();
    const s_Val =
      this.Endianness === "little"
        ? buffer.readUInt16LE(0)
        : buffer.readUInt16BE(0);
    this.ByteBuffer = this.ByteBuffer.slice(2);
    this.Position += 2;
    return s_Val;
  }

  ReadUInt32(): number {
    if (this.ByteBuffer.length < 4) return 0;
    const buffer = this.getBuffer();
    const s_Val =
      this.Endianness === "little"
        ? buffer.readUInt32LE(0)
        : buffer.readUInt32BE(0);
    this.ByteBuffer = this.ByteBuffer.slice(4);
    this.Position += 4;
    return s_Val;
  }

  ReadInt8(): number {
    if (this.ByteBuffer.length < 1) return 0;
    const buffer = this.getBuffer();
    const s_Val = buffer.readInt8(0);
    this.ByteBuffer = this.ByteBuffer.slice(1);
    ++this.Position;
    return s_Val;
  }

  ReadInt16(): number {
    if (this.ByteBuffer.length < 2) return 0;
    const buffer = this.getBuffer();
    const s_Val =
      this.Endianness === "little"
        ? buffer.readInt16LE(0)
        : buffer.readInt16BE(0);
    this.ByteBuffer = this.ByteBuffer.slice(2);
    this.Position += 2;
    return s_Val;
  }

  ReadInt32(): number {
    if (this.ByteBuffer.length < 4) return 0;
    const buffer = this.getBuffer();
    const s_Val =
      this.Endianness === "little"
        ? buffer.readInt32LE(0)
        : buffer.readInt32BE(0);
    this.ByteBuffer = this.ByteBuffer.slice(4);
    this.Position += 4;
    return s_Val;
  }

  ReadFloat(): number {
    if (this.ByteBuffer.length < 4) return 0.0;
    const buffer = this.getBuffer();
    const s_Val =
      this.Endianness === "little"
        ? buffer.readFloatLE(0)
        : buffer.readFloatBE(0);
    this.ByteBuffer = this.ByteBuffer.slice(4);
    this.Position += 4;
    return s_Val;
  }

  ReadDouble(): number {
    if (this.ByteBuffer.length < 8) return 0.0;
    const buffer = this.getBuffer();
    const s_Val =
      this.Endianness === "little"
        ? buffer.readDoubleLE(0)
        : buffer.readDoubleBE(0);
    this.ByteBuffer = this.ByteBuffer.slice(8);
    this.Position += 8;
    return s_Val;
  }

  ReadBytes(p_Count: number): Uint8Array {
    if (p_Count > this.ByteBuffer.length) {
      return new Uint8Array(0);
    }

    const s_Val = this.ByteBuffer.slice(0, p_Count);
    this.ByteBuffer = this.ByteBuffer.slice(p_Count);
    this.Position += p_Count;
    return s_Val;
  }
}
