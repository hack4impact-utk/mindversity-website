import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { User } from "utils/types";
import { verify } from "jsonwebtoken";

const authenticated = (role: string, func: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const secret = process.env.JWTSECRET as string;
    return verify(req.cookies.auth!, secret, async function (error, decoded: any) {
        if (!error && decoded) {
            const dMessage = decoded as User;
            if (dMessage.role == role || role == "any") return await func(req, res);
        }

        res.setHeader("Set-Cookie", "auth=; Max-Age=0; SameSite=Lax; Path=/");
        res.status(401).json({
            success: false,
            message: "Not Authenticated",
        });
    });
};

export default authenticated;
