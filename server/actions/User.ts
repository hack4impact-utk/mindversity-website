import mongoDB from "../index";
import { User } from "utils/types";
import  UserModel from "server/models/User";
import bcrypt from "bcrypt";

export async function login(user: User) {
    
    if (user.email == null || user.password == null) {
        throw Error("Parameters cannot be empty")
    }

    await mongoDB()


    let hashedPass = await UserModel.findOne({email: user.email}).exec()
    .then((gottenUser)=>{
        if(gottenUser){
            bcrypt.compare(user.password, gottenUser.password)
        }
    })

}

export async function createUser(user: User){
    
}