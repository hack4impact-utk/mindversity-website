import mongoDB from "../index";
import OfficerSchema from "../models/Officer";
import { Officer } from "utils/types";

// Query officers collection with the information in officerInfo
// officerInfo should only have the chapterName field filled out
// Return an array of all the officers that match the queryt
export const getOfficers = async function (officerInfo: Officer) {
    await mongoDB();
    console.log("connected to mongo, will do query now");

    if(!officerInfo) officerInfo = {}

    return await OfficerSchema.find(officerInfo)
    .exec()
    .then(async (officers) => {
        // todo maybe handle this error on front end
        if(officers == null) 
            throw new Error("Officers do not exist")
        
        return officers;
    })


    // let chapterName = chapterInfo.name;
    // let chapters: Chapter[] = await ChapterSchema.find(chapterInfo).lean();
    // let officers: Officer[] = await OfficerSchema.find({chapter: chapterName}).lean();
    // let returnChapter: Chapter = chapters[0];
    // returnChapter.officers = officers;
    // 
    // return returnChapter;
}


// Insert a single officer into the collection
export const addOfficers = async function (officerInfo: Officer) {
    await mongoDB();
    await OfficerSchema.create(officerInfo);
}


// // Bulk insert all officers into the collection
// export const addOfficers = async function (officerInfoArray: Officer[]) {
//     await mongoDB();
//     await OfficerSchema.insertMany(officerInfoArray);
// }

export const updateOfficers = async function (officerInfoArray: Officer[]) {

}

export const deleteOfficers = async function (officerInfoArray: Officer[]) {
    await mongoDB();
    await OfficerSchema.deleteMany(officerInfoArray);
}