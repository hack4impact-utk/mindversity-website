import { Document, model, models, Schema } from "mongoose"
import ContentfulImageSchema from "./ContentfulImage"

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
    type: ContentfulImageSchema,
    required: false,
  },
  universityLogo: {
    type: ContentfulImageSchema,
    required: false,
  }
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
