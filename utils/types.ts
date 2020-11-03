import { ObjectID } from "mongodb";

<<<<<<< HEAD
export interface User {
    id?: ObjectID;
    email?: string;
    password?: string;
    role?: string;
}

export interface Officer {
    id?: ObjectID;
    name?: string;
    picture?: string;
=======
export interface Officer {
    id?: ObjectID;
    name?: string;
    picture?: ContentfulImage;
>>>>>>> 62419f5 (Testing for updateChapter)
    role?: string;
}

// Keep in sync with the backend schema
export interface Chapter {
    id?: ObjectID;
    name?: string;
    region?: string;
    description?: string;
<<<<<<< HEAD
    universityLogo?: string;
    campusPic?: string;
    officers?: Officer[];
}
=======
    universityLogo?: ContentfulImage;
    campusPic?: ContentfulImage;
    officers?: Officer[];
}

export interface ContentfulImage {
    id: string;
    url: string;
}
>>>>>>> 62419f5 (Testing for updateChapter)
