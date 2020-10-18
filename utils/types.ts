import { Mongoose } from "mongoose";
import { ObjectID } from "mongodb";


// Keep in sync with the backend schema
export interface Chapter {
    id?: ObjectID
    name?: string;
    region?: string;
    memberCount?: number
}