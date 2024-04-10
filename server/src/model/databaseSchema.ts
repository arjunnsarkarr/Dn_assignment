import { Document, Schema, model } from "mongoose";

export interface IDATA extends Document {
  box: string;
  img_url: string;
  count: string;
}

const dataSchema: Schema = new Schema<IDATA>({
  box: {
    type: String,
  },
  img_url: {
    type: String,
  },
  count: {
    type: String,
  },
});

const Data = model<IDATA>("data", dataSchema);
export default Data;
