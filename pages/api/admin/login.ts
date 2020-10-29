import { NextApiRequest, NextApiResponse } from "next"
import { login } from "server/actions/User";
import { User } from "utils/types";


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    let currentUser: User = req.body

    await login(currentUser)
    .then((payload) => 
        res.status(200).json({
            success: true,
            payload
        })
    )
    .catch((error)=>
        res.status(400).json({
            success: false, 
            message: error.message
        })
    )

}