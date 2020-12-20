import { ObjectID } from "mongodb";

// Keep these in sync with the backend schema

export interface User {
    _id?: ObjectID;
    email?: string;
    password?: string;
    role?: string;
    resetKey?: string;
}

export interface Officer {
    _id?: ObjectID;
    name?: string;
    picture?: ContentfulImage;
    role?: string;
    chapter?: string;
    bio?: string;
}

export interface Chapter {
    _id?: ObjectID;
    name?: string;
    region?: string;
    city?: string;
    state?: string;
    description?: string;
    universityLogo?: ContentfulImage;
    campusPic?: ContentfulImage;
}

export interface ContentfulImage {
    assetID: string;
    url: string;
}

export interface Resource {
    _id?: ObjectID|string;
    name?: string;
    category?: string;
    link?: string;
}

export interface JournalEntry {
    id?: string, // not an Object since this isn't tied to mongodb
    title?: string,
    description?: string,
    image?: ContentfulImage,
    category?: string,
    body?: string,
    dateCreated?: string,
    reviewed?: boolean,
}

export interface ApiResponse{
    success: boolean,
    message?: string,
    payload?: unknown, //Unknown since there are several different types that the payload could be.
}