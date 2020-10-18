import mongoDB from "../index";
import ChapterModel from "../models/Chapter";
import { Chapter } from "utils/types";


// This function can be used to query a chapter by name, region, etc and can even
// return all chapters. It expects the caller to properly specify the parameters 
// they want to query.
export const getChapter = async function (chapterInfo: Chapter) {
    await mongoDB()
    console.log("connected to mongo, will do query now")

    return await ChapterModel.find(chapterInfo)
    .exec()
    .then(async (chapter) => {
        if(chapter == null) 
            throw new Error("Chapter does not exist")
        
        return chapter;
    })
}

// todo these 2 below need authentication to use
export const addChapter = async function (chapterInfo: Chapter) {

}

export const updateChapter = async function (chapterInfo: Chapter) {

}
