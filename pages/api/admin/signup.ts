import { NextApiRequest, NextApiResponse } from "next"
import { createUser } from "server/actions/User"
import { User } from 'utils/types'
import cookie from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    let newUser = req.body as User

    await createUser(newUser)
    .then((payload) => 
    res.status(200).json({
        success: true,
        payload
    })
    )
    .catch((error: Error)=>
    res.status(400).json({
        success: false, 
        message: error.message
    })
) 
}