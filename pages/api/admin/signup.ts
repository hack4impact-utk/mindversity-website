import { NextApiRequest, NextApiResponse } from "next"
import { createUser } from "server/actions/User"
import { User } from 'utils/types'
import cookie from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    let newUser: User = req.body

    await createUser(newUser)
    .then((jwt) => 
        {
            res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 604800,
                path: '/'
            }))
            res.status(200).json({success: true})
        }
    )
    .catch((error)=>
        res.status(400).json({
            success: false, 
            message: error.message
        })
    )
}