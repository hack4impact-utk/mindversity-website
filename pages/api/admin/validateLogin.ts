import { NextApiRequest, NextApiResponse } from "next";
import { User } from "utils/types";
import { verify } from "jsonwebtoken";

// This is really only used to validiate when someone is logged in
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const secret = process.env.JWTSECRET as string;
        verify(req.cookies.auth!, secret, function (error, decoded: any) {
            if (!error && decoded) {
                const dMessage = decoded as User;

                res.status(200).json({
                    success: true,
                    payload: dMessage,
                });
            } else {
                res.setHeader("Set-Cookie", "auth=; Max-Age=0; SameSite=Lax; Path=/");
                res.status(401).json({
                    success: false,
                    message: "Not Authenticated",
                });
            }
        });
    } catch (error) {
        const err = error as Error;
        console.error(err);
        res.setHeader("Set-Cookie", "auth=; Max-Age=0; SameSite=Lax; Path=/");
        res.status(401).json({
            success: false,
            message: err.message,
        });
    }
}
