import mongoose from "mongoose";

const { Schema } = mongoose;

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


const ChapterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Chapter ?? 
  mongoose.model("Chapter", ChapterSchema);