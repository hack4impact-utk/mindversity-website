import { ObjectID } from "mongodb";

export interface User {
  id?: ObjectID;
  email?: string;
  password?: string;
  role?: string;
}

export interface Officer {
    id?: ObjectID;
    name?: string;
    picture?: ContentfulImage;
    role?: string;
    chapter?: string;
    // bio
}

// Keep in sync with the backend schema
export interface Chapter {
    id?: ObjectID;
    name?: string;
    region?: string;
    city?: string;
    state?: string;
    description?: string;
    universityLogo?: ContentfulImage;
    campusPic?: ContentfulImage;
    officers?: Officer[]; //only use for return and not query
}

export interface ContentfulImage {
  assetID: string;
  url: string;
}

export interface Resource {
  id?: ObjectID;
  name?: string;
  category?: string;
  link?: string;
}
