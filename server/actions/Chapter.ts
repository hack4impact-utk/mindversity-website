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
    if(!chapterInfo) chapterInfo = {};

    const chapters: Chapter[] = await ChapterSchema.find(chapterInfo).exec();
    if(chapters == null || chapters.length == 0)
        throw new Error("Chapter does not exist");
        
    return chapters;
}

/**
 * @param chapterInfo The chapter object that needs to be inserted into our database.
 */
export const addChapter = async function (chapterInfo: Chapter) {
    await mongoDB();
    await ChapterSchema.create(chapterInfo);
}

/**
 * @param queryChapter Chapter containing just the _id field. Used by Mongoose 
 to find the original object to replace.
 * @param newChapter The new chapter object that should replace the old object.
 */
export const updateChapter = async function (queryChapter: Chapter, newChapter: Chapter) {
    await mongoDB();
    const options = {useFindAndModify: true};
    
    // update only updates a single item since we specify the _id field 
    // in queryChapter. newChapter replaces the old object.
    await ChapterSchema.findOneAndUpdate(queryChapter, newChapter, options);
}
