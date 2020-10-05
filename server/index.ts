import mongoose from "mongoose";
import config from "config";

export default async () => {
  if (mongoose.connections[0].readyState) return;
  // const DB_URL: string = config.db.url || "";
  // 
  // await mongoose
  //   .connect(DB_URL, {
  //     ...config.db.options,
  //     dbName: config.db.name
  //   })
  //   .catch(error => {
  //     console.error("Database connection failed.");
  //     console.error(" > " + error);

  //     throw error;
  //   });

    await mongoose
    .connect("mongodb+srv://kfidan:ZiPwdaph0GnqjlbF@cluster0.wzdut.mongodb.net/hack4impact?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .catch(error => {
      console.error("Database connection failed.");
      console.error(" > " + error);
      throw error;
    });
};
