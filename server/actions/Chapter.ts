import mongoDB from "../index";
import ChapterSchema from "../models/Chapter";
import { Chapter } from "utils/types";


/**
* @param chapterInfo Chapter type that contains the properties to query by.
For example, this function can be used to query a chapter by name, region, 
etc and can even return all chapters. It expects the caller to properly specify 
the parameters they want to query.
* @returns An array of chapters that match the query.
*/
export const getChapters = async function (chapterInfo: Chapter) {
    await mongoDB();
    if(!chapterInfo) chapterInfo = {}

    return await ChapterSchema.find(chapterInfo)
    .exec()
    .then(async (chapters) => {
        if(chapters == null) 
            throw new Error("Chapter does not exist")
        
        return chapters;
    })
}

/**
* @param chapterInfo The chapter object that needs to be inserted into our database.
* @returns True if inserted successfully, false otherwise. 
*/
export const addChapter = async function (chapterInfo: Chapter) {
    try {
        await mongoDB();
        const chapter = new ChapterSchema(chapterInfo);

        // saving the model uploads it to the collection.
        await chapter.save();
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

/**
* @param queryChapter Chapter containing just the _id field. Used by Mongoose 
to find the original object to replace.
* @param newChapter The new chapter object that should replace the old object.
* @returns True if updated successfully, false otherwise.
*/
export const updateChapter = async function (queryChapter: Chapter, newChapter: Chapter) {
    try {
        await mongoDB();
        const chapter = new ChapterSchema(newChapter);

        // update only updates a single item since we specify the _id field 
        // in queryChapter. newChapter replaces the old object.
        await chapter.findOneAndUpdate(queryChapter, newChapter);
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
