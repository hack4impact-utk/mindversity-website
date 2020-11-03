import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { verify } from "jsonwebtoken";

const authenticated = (func: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) =>
{
    let secret = process.env.JWTSECRET as string
    verify(req.cookies.auth!, secret, async function(err, decoded){
        if(!err && decoded)
        {
            return await func(req, res)
        }
        else
        {
            res.status(500).json({message: "Not Authenticated"})
        }
    })
}

export default authenticated