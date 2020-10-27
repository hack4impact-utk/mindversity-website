import { ObjectID } from "mongodb";

export interface Officer {
    id?: ObjectID;
    name?: string;
    picture?: string;
    role?: string;
}

// Keep in sync with the backend schema
export interface Chapter {
    id?: ObjectID;
    name?: string;
    region?: string;
    description?: string;
    universityLogo?: string;
    campusPic?: string;
    officers?: Officer[];
}