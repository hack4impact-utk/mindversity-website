import { User } from "utils/types";
import { Document, model, models, Schema } from "mongoose"


export const UserSchema = new Schema({
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    }
})

export interface IUser extends Document{
    email: string;
    password: string;
}

export default models.User ?? model<IUser>('User', UserSchema)