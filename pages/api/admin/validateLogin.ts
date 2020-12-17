import { NextApiRequest, NextApiResponse } from "next";
import auth from "server/actions/Authenticate";
import { User } from "utils/types";
import cookie from "cookie";

// This is really only used to validiate when someone is logged in
async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    try {
        res.status(200).json({ success: true });
    } catch (_err) {
        const err = _err as Error;
        res.setHeader("Set-Cookie", "auth=; Max-Age=0; SameSite=Lax; Path=/");
        res.status(401).json({
            success: false,
            message: err.message,
        });
    }
}

// Here the auth function is run and sets the status appropriately
export default auth('any', handler)