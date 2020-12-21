import { Document, model, models, Schema } from "mongoose";

export const ResourceSchema = new Schema({
    name: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    link: {
        type: String,
        required: false,
    },
    chapter: {
        type: String,
        required: false,
    },
});

export interface IResource extends Document {
    name?: string;
    category?: string;
    link?: string;
    chapter?: string;
}

export default models.Resource ?? model<IResource>("Resource", ResourceSchema);
