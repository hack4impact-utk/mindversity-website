import mongoDB from "../index";
import ChapterModel from "../models/Chapter";
import { Chapter } from "utils/types";


export const getChapter = async function (chapterInfo: Chapter)
{
    await mongoDB()
    console.log("connected to mongo, will do query now\n")

    return await ChapterModel.find(chapterInfo)
    .exec()
    .then(async (chapter) => {
        if(chapter == null) 
            throw new Error("Chapter does not exist")
        
        return chapter
    })
}

export const getChapterByName = async function (chapterName: string) {
    if (chapterName == "") {
        throw new Error("Chapter name must be provided.");
    }

    //chapterName = "Ohio_State";
    await mongoDB();
    console.log("connected to mongo, will do query now\n")
    // try {
    //     const ret = await Chapter.findOne({"name": chapterName}).lean();
    //     console.log(ret);
    //     return ret;
    // } catch (error) {
    //     throw new Error(error.message);
    // } 


    return await ChapterModel.findOne({"name": chapterName})
    .exec()
    .then(async (chapt)=>{
        if(chapt == null)
            throw new Error("Chapter does not exist")

        return chapt
    })


    // try {
    //     return await Chapter.findOne({"name": chapterName});
    // } catch (error) {
    //     throw new Error(error.message);
    // } 
}

export async function getChaptersByRegion(region: string) {
  
}

export async function getAllChapters() {
    await mongoDB();
   
    return await ChapterModel.find()
    .exec()
    .then(async (chapt)=>{
        return chapt
    })
}