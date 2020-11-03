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
}

// Keep in sync with the backend schema
export interface Chapter {
    id?: ObjectID;
    name?: string;
    region?: string;
    description?: string;
    universityLogo?: ContentfulImage;
    campusPic?: ContentfulImage;
    officers?: Officer[];
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
