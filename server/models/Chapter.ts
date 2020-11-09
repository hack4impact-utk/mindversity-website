import { Document, model, models, Schema } from "mongoose"
import { Officer } from "utils/types";

const OfficerSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  picture: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: false
  }
});

export const ChapterSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  region: {
    type: String,
    required: false
  },
  description: {
      type: String,
      required: false,
  },
  campusPic: {
      assetID: {
          type: String,
      },
      url: {
          type: String,
      }
  },
  universityLogo: {
      assetID: {
          type: String,
      },
      url: {
          type: String,
      }
  },
})

export interface IChapter extends Document {
  name?: string;
  region?: string;
  description?: string;
  universityLogo?: string;
  campusPic?: string;
  officers?: Officer[];
}

export default models.Chapter ?? model<IChapter>('Chapter', ChapterSchema)
