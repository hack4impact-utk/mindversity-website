import mongoDB from "../index";
import OfficerSchema from "../models/Officer";
import { Officer } from "utils/types";
import { deleteAssetByID } from "./Contentful";

// Query officers collection with the information in officerInfo
// officerInfo should only have the chapterName field filled out
// Return an array of all the officers that match the queryt
export const getOfficers = async function (officerInfo: Officer) {
    await mongoDB();
    console.log("connected to mongo, will do query now");

    if(!officerInfo) officerInfo = {}

    let officers = await OfficerSchema.find(officerInfo)
    
    if(officers == null) throw new Error("Officers do not exist")

    return officers
    // .then(async (officers) => {
    //     // todo maybe handle this error on front end
    //     if(officers == null)
            
        
    //     return officers;
    // })
}


// Insert a single officer into the collection
export const addOfficer = async function (officerInfo: Officer) {
    await mongoDB();
    await OfficerSchema.create(officerInfo);
}

export const updateOfficer = async function (officerInfo: Officer) {

}

export const deleteOfficer = async function (officerInfo: Officer) {
    await mongoDB();    
    if (officerInfo.picture?.assetID) 
        await deleteAssetByID(officerInfo.picture?.assetID);

    await OfficerSchema.deleteOne({_id: officerInfo._id });
}
