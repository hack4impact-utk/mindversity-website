import { Schema } from "mongoose";

// This schema isn't a collection itself, but is instead embedded within other collections
export const ContentfulImageSchema = new Schema({
    assetID: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: false,
    },
});

export default ContentfulImageSchema;
