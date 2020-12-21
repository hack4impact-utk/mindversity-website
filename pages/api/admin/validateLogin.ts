import { NextApiRequest, NextApiResponse } from "next";
import auth from "server/actions/Authenticate";
import errors from "utils/errors";

// This is really only used to validiate when someone is logged in
async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        res.status(200).json({
            success: true,
            payload: {},
        });
    } catch (error) {
        console.error(error instanceof Error && error);
        res.setHeader("Set-Cookie", "auth=; Max-Age=0; SameSite=Lax; Path=/");
        res.status(401).json({
            success: false,
            message: (error instanceof Error && error.message) || errors.GENERIC_ERROR,
        });
    }
}

// Here the auth function is run and sets the status appropriately
export default auth("any", handler);
