import mongoDB from "../index";
import ChapterSchema from "../models/Chapter";
import { Chapter } from "utils/types";


// This function can be used to query a chapter by name, region, etc and can even
// return all chapters. It expects the caller to properly specify the parameters 
// they want to query. Returns an array of chapters that match the query.
export const getChapters = async function (chapterInfo: Chapter) {
    await mongoDB();
    console.log("connected to mongo, will do query now");

    if(!chapterInfo) chapterInfo = {}

    return await ChapterSchema.find(chapterInfo)
    .exec()
    .then(async (chapters) => {
        if(chapters == null) 
            throw new Error("Chapter does not exist")
        
        return chapters;
    })

    // old way of merging officers into the chapter
    // let chapterName = chapterInfo.name;
    // let chapters: Chapter[] = await ChapterSchema.find(chapterInfo).lean();
    // let officers: Officer[] = await OfficerSchema.find({chapter: chapterName}).lean();
    // let returnChapter: Chapter = chapters[0];
    // returnChapter.officers = officers;
    // 
    // return returnChapter;
}

// todo these 2 below need authentication to use
export const addChapter = async function (chapterInfo: Chapter) {
    //Connect to MongoDB.
    await mongoDB();
    //Define a new chapter model to work with and pass in all the chapterInfo.
    const chapter = new ChapterSchema(chapterInfo);
    //Saving the model uploads it to the collection.
    await chapter.save((err:any) => {
        if(err) console.log(err);
    });
}

export const updateChapter = async function (chapterInfo: Chapter) {

}

export const deleteChapter = async function (chapterInfo: Chapter) {

}