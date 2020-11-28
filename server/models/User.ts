import { Document, model, Schema } from "mongoose";

export const UserSchema = new Schema({
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: false,
    },
    resetKey: {
        type: String,
        required: false,
    },
});

export interface User {
    email?: string;
    password?: string;
    role?: string;
    resetKey?: string;
}

export interface UserDocument extends User, Document {}

export default model<UserDocument>("User", UserSchema);
