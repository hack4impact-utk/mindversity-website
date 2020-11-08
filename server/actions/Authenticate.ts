import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { User } from "utils/types";
import { verify } from "jsonwebtoken";

const authenticated = (role: string, func: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) =>
{
    let secret = process.env.JWTSECRET as string
    return verify(req.cookies.auth!, secret, async function (err, decoded: any) {

        if (!err && decoded)
        {
            let dMessage = decoded as User

            if((dMessage.role == role || role == "any"))
                return await func(req, res);
        }

        res.setHeader("Set-Cookie", "auth=; Max-Age=0; SameSite=Lax; Path=/");
        res.status(500).json({ message: "Not Authenticated" });
    })

}

export default authenticated