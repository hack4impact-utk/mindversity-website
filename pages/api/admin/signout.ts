import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        res.setHeader("Set-Cookie", "auth=; Max-Age=0; SameSite=Lax; Path=/");

        res.status(200).json({
            success: true,
            payload: {},
        });
    } catch (error) {
        const err = error as Error;

        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}
