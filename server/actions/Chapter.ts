import mongoDB from "../index";
import Chapter from "../models/Chapter";

export async function getChapterByName(chapterName: string) {
    if (chapterName == "") {
        throw new Error("Chapter name must be provided.");
    }

    chapterName = "Ohio_State";
    await mongoDB();
    console.log("connected to mongo, will do query now\n")
    try {
        const ret = await Chapter.findOne({"name": chapterName}).lean();
        console.log(ret);
        return ret;
    } catch (error) {
        throw new Error(error.message);
    } 

    // try {
    //     return await Chapter.findOne({"name": chapterName});
    // } catch (error) {
    //     throw new Error(error.message);
    // } 
}

export async function getChaptersByRegion(region: string) {
    
}

export async function getAllChapters() {
    
}