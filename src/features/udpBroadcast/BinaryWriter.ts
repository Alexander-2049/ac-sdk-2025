export class BinaryWriter {
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
