import mongoDB from "../index";
import { User } from "utils/types";
import UserModel from "server/models/User";
import { hash, compare } from "bcrypt";
import { Secret, sign } from "jsonwebtoken";

export async function login(user: User) {
    
    if (user.email == null || user.password == null) {
        throw Error("Parameters cannot be empty")
    }

    await mongoDB()

    return UserModel.findOne({email: user.email})
    .then((gottenUser)=>{
        if(gottenUser){
            return compare(user.password, gottenUser.password).then((result)=>{
                if(result) return Promise.resolve(gottenUser)

                return Promise.reject(
                    new Error("Password does not match")
                )
            })
        }
    })
    .then((theUser)=>{

        const secret: Secret = process.env.JWTSECRET as string

        return sign(
            {
                _id: theUser._id,
                email: theUser.email
            },
            secret,
            {
                expiresIn: "7d"
            }
        )
    })

}

export async function createUser(user: User){

    if (user.email == null || user.password == null) {
        throw Error("Parameters cannot be empty")
    }

    if(!checkEmail(user.email))
    {
        throw Error("Email already used")
    }

    await mongoDB()
    const secret = process.env.JWTSECRET as string

    const {email, password} = user
    const hashedPassword = await hash(password, 10)

    const newUser = new UserModel({
        email,
        password: hashedPassword
    })

    return newUser.save(function(err:any){
        if(err) console.log(err)
        else
        {
            return sign({_id: newUser._id, email: newUser.email}, secret, {expiresIn: "7d"})
        }
    })
}


export async function checkEmail(email: string)
{
    await mongoDB()

    return UserModel.findOne({email: email})
    .then((user) => {
        if(user) return true
        else return false
    })
}