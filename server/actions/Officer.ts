import mongoDB from "../index";
import OfficerSchema from "../models/Officer";
import { Officer } from "utils/types";
import { deleteAssetByID } from "./Contentful";

/**
 * Query the officers collection with the information in officerInfo.
 * @param officerInfo Officer object that contains the fields to filter by.
 * @returns Returns an array of all the officers that match the query.
 */
export const getOfficers = async function (officerInfo: Officer) {
    await mongoDB();
    if (!officerInfo) officerInfo = {};

    const officers: Officer[] = await OfficerSchema.find(officerInfo);
    return officers;
};

/**
 * Insert a single officer into the collection
 * @param officerInfo Officer object that contains the fields to filter and delete by.
 */
export const addOfficer = async function (officerInfo: Officer) {
    await mongoDB();
    await OfficerSchema.create(officerInfo);
};

/**
 * Delete a single officer from the collection.
 * @param officerInfo Officer object that contains the fields to filter and delete by.
 */
export const deleteOfficer = async function (officerInfo: Officer) {
    console.log(officerInfo._id);
    await mongoDB();
    if (officerInfo.picture?.assetID) await deleteAssetByID(officerInfo.picture?.assetID);

    await OfficerSchema.findOneAndDelete({ _id: officerInfo._id });
};
