import { ObjectID } from "mongodb";

// Keep these in sync with the backend schema

export interface User {
  _id?: ObjectID;
  email?: string;
  password?: string;
  role?: string;
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
  id?: ObjectID;
  name?: string;
  category?: string;
  link?: string;
}
