import { GraphicsData } from "../types/graphics";

export const parseGraphicsArray = (data: any[]): GraphicsData => {
  return {
    packetId: data[0],
    status: data[1],
  };
};
