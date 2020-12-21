import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "server/actions/User";
import errors from "utils/errors";
import { User } from "utils/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const newUser = req.body as User;
        await createUser(newUser);
        res.status(200).json({
            success: true,
            payload: {},
        });
    } catch (error) {
        console.error(error instanceof Error && error);
        res.status(400).json({
            success: false,
            message: (error instanceof Error && error.message) || errors.GENERIC_ERROR,
        });
    }
}
