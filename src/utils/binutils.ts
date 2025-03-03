class BinaryReader {
  ByteBuffer: Buffer;
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
      this.ByteBuffer = input;
    } else if (Array.isArray(input)) {
      this.ByteBuffer = Buffer.from(input);
    } else if (typeof input === "string") {
      this.ByteBuffer = Buffer.from(input, p_Encoding);
    } else {
      throw new Error(`Invalid buffer input for BinaryReader: ${typeof input}`);
    }

    this.Endianness = p_Endianness;
    this.Encoding = p_Encoding;
    this.Length = this.ByteBuffer.length;
    this.Position = 0;
  }

  ReadUInt8(): number {
    if (this.ByteBuffer.length < 1) {
      return 0;
    }

    const s_Val = this.ByteBuffer.readUInt8(0);
    this.ByteBuffer = this.ByteBuffer.slice(1);
    ++this.Position;
    return s_Val;
  }

  ReadUInt16(): number {
    if (this.ByteBuffer.length < 2) {
      return 0;
    }

    const s_Val =
      this.Endianness === "little"
        ? this.ByteBuffer.readUInt16LE(0)
        : this.ByteBuffer.readUInt16BE(0);
    this.ByteBuffer = this.ByteBuffer.slice(2);
    this.Position += 2;
    return s_Val;
  }

  ReadUInt32(): number {
    if (this.ByteBuffer.length < 4) {
      return 0;
    }

    const s_Val =
      this.Endianness === "little"
        ? this.ByteBuffer.readUInt32LE(0)
        : this.ByteBuffer.readUInt32BE(0);
    this.ByteBuffer = this.ByteBuffer.slice(4);
    this.Position += 4;
    return s_Val;
  }

  ReadInt8(): number {
    if (this.ByteBuffer.length < 1) {
      return 0;
    }

    const s_Val = this.ByteBuffer.readInt8(0);
    this.ByteBuffer = this.ByteBuffer.slice(1);
    ++this.Position;
    return s_Val;
  }

  ReadInt16(): number {
    if (this.ByteBuffer.length < 2) {
      return 0;
    }

    const s_Val =
      this.Endianness === "little"
        ? this.ByteBuffer.readInt16LE(0)
        : this.ByteBuffer.readInt16BE(0);
    this.ByteBuffer = this.ByteBuffer.slice(2);
    this.Position += 2;
    return s_Val;
  }

  ReadInt32(): number {
    if (this.ByteBuffer.length < 4) {
      return 0;
    }

    const s_Val =
      this.Endianness === "little"
        ? this.ByteBuffer.readInt32LE(0)
        : this.ByteBuffer.readInt32BE(0);
    this.ByteBuffer = this.ByteBuffer.slice(4);
    this.Position += 4;
    return s_Val;
  }

  ReadFloat(): number {
    if (this.ByteBuffer.length < 4) {
      return 0.0;
    }

    const s_Val =
      this.Endianness === "little"
        ? this.ByteBuffer.readFloatLE(0)
        : this.ByteBuffer.readFloatBE(0);
    this.ByteBuffer = this.ByteBuffer.slice(4);
    this.Position += 4;
    return s_Val;
  }

  ReadDouble(): number {
    if (this.ByteBuffer.length < 8) {
      return 0.0;
    }

    const s_Val =
      this.Endianness === "little"
        ? this.ByteBuffer.readDoubleLE(0)
        : this.ByteBuffer.readDoubleBE(0);
    this.ByteBuffer = this.ByteBuffer.slice(8);
    this.Position += 8;
    return s_Val;
  }

  ReadBytes(p_Count: number): Buffer {
    if (p_Count > this.ByteBuffer.length) {
      return Buffer.from([]);
    }

    const s_Val = Buffer.alloc(p_Count);
    this.ByteBuffer.copy(s_Val, 0, 0, p_Count);
    this.ByteBuffer = this.ByteBuffer.slice(p_Count);
    this.Position += p_Count;
    return s_Val;
  }
}

class BinaryWriter {
  ByteBuffer: Buffer;
  Endianness: "big" | "little";
  Encoding: string;
  Length: number;

  constructor(
    p_Endianness: "big" | "little" = "big",
    p_Encoding: string = "ascii"
  ) {
    this.ByteBuffer = Buffer.from([]);
    this.Endianness = p_Endianness;
    this.Encoding = p_Encoding;
    this.Length = 0;
  }

  WriteUInt8(p_Value: number): void {
    const s_TempBuffer = Buffer.alloc(1);
    s_TempBuffer.writeUInt8(p_Value, 0);
    this.Length += 1;
    this.ByteBuffer = Buffer.concat(
      [this.ByteBuffer, s_TempBuffer],
      this.Length
    );
  }

  WriteUInt16(p_Value: number): void {
    const s_TempBuffer = Buffer.alloc(2);
    if (this.Endianness === "little") {
      s_TempBuffer.writeUInt16LE(p_Value, 0);
    } else {
      s_TempBuffer.writeUInt16BE(p_Value, 0);
    }
    this.Length += 2;
    this.ByteBuffer = Buffer.concat(
      [this.ByteBuffer, s_TempBuffer],
      this.Length
    );
  }

  WriteUInt32(p_Value: number): void {
    const s_TempBuffer = Buffer.alloc(4);
    if (this.Endianness === "little") {
      s_TempBuffer.writeUInt32LE(p_Value, 0);
    } else {
      s_TempBuffer.writeUInt32BE(p_Value, 0);
    }
    this.Length += 4;
    this.ByteBuffer = Buffer.concat(
      [this.ByteBuffer, s_TempBuffer],
      this.Length
    );
  }

  WriteInt8(p_Value: number): void {
    const s_TempBuffer = Buffer.alloc(1);
    s_TempBuffer.writeInt8(p_Value, 0);
    this.Length += 1;
    this.ByteBuffer = Buffer.concat(
      [this.ByteBuffer, s_TempBuffer],
      this.Length
    );
  }

  WriteInt16(p_Value: number): void {
    const s_TempBuffer = Buffer.alloc(2);
    if (this.Endianness === "little") {
      s_TempBuffer.writeInt16LE(p_Value, 0);
    } else {
      s_TempBuffer.writeInt16BE(p_Value, 0);
    }
    this.Length += 2;
    this.ByteBuffer = Buffer.concat(
      [this.ByteBuffer, s_TempBuffer],
      this.Length
    );
  }

  WriteInt32(p_Value: number): void {
    const s_TempBuffer = Buffer.alloc(4);
    if (this.Endianness === "little") {
      s_TempBuffer.writeInt32LE(p_Value, 0);
    } else {
      s_TempBuffer.writeInt32BE(p_Value, 0);
    }
    this.Length += 4;
    this.ByteBuffer = Buffer.concat(
      [this.ByteBuffer, s_TempBuffer],
      this.Length
    );
  }

  WriteFloat(p_Value: number): void {
    const s_TempBuffer = Buffer.alloc(4);
    if (this.Endianness === "little") {
      s_TempBuffer.writeFloatLE(p_Value, 0);
    } else {
      s_TempBuffer.writeFloatBE(p_Value, 0);
    }
    this.Length += 4;
    this.ByteBuffer = Buffer.concat(
      [this.ByteBuffer, s_TempBuffer],
      this.Length
    );
  }

  WriteDouble(p_Value: number): void {
    const s_TempBuffer = Buffer.alloc(8);
    if (this.Endianness === "little") {
      s_TempBuffer.writeDoubleLE(p_Value, 0);
    } else {
      s_TempBuffer.writeDoubleBE(p_Value, 0);
    }
    this.Length += 8;
    this.ByteBuffer = Buffer.concat(
      [this.ByteBuffer, s_TempBuffer],
      this.Length
    );
  }

  WriteBytes(p_Value: Buffer | Array<number> | string): void {
    if (typeof p_Value === "string") {
      const s_BytesArray: number[] = [];
      for (let i = 0; i < p_Value.length; ++i) {
        s_BytesArray.push(p_Value.charCodeAt(i));
      }
      p_Value = s_BytesArray;
    }

    if (!(p_Value instanceof Buffer) && !Array.isArray(p_Value)) {
      throw new Error("Invalid Buffer object provided.");
    }

    const s_TempBuffer =
      p_Value instanceof Buffer ? p_Value : Buffer.from(p_Value);
    this.Length += s_TempBuffer.length;
    this.ByteBuffer = Buffer.concat(
      [this.ByteBuffer, s_TempBuffer],
      this.Length
    );
  }
}

const binutils = {
  BinaryReader,
  BinaryWriter,
};

export default binutils;
export { BinaryReader, BinaryWriter };
