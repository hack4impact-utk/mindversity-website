import { Document, model, models, Schema } from "mongoose"


// var OfficerSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     required: true,
//   },
//   picture: {
//     type: String,
//     required: true,
//   }
// });
//  officers: [Schema.Types.ObjectId],


export const ChapterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: false
  }
})

export interface IChapter extends Document{
  name: string,
  region?: string
}

export default models.Chapter ?? model<IChapter>('Chapter', ChapterSchema)