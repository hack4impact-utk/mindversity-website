import { Document, model, models, Schema } from "mongoose"
import ContentfulImageSchema from "./ContentfulImage"
import { ContentfulImage } from "utils/types"

export const OfficerSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  picture: {
    type: ContentfulImageSchema,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
  chapter: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  }
});

export interface IOfficer extends Document {
    name?: string;
    picture?: ContentfulImage;
    role?: string;
    chapter?: string;
}

export default models.Officer ?? model<IOfficer>('Officer', OfficerSchema)
