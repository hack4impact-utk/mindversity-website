import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "server/actions/User";
import { User } from "utils/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    const newUser = req.body as User;

    try {
        await createUser(newUser);
        res.status(200).json({ success: true });
    } catch (_err) {
        const err = _err as Error;
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}
