import { NextApiRequest, NextApiResponse } from "next";
import { sendForgotPasswordEmail } from "server/actions/User";
import errors from "utils/errors";

interface Email {
    email: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const recipient = req.body as Email;

        await sendForgotPasswordEmail(recipient.email);
        res.status(200).json({
            success: true,
            payload: "Reset Email Sent",
        });
    } catch (error) {
        console.error(error instanceof Error && error);
        res.status(400).json({
            success: false,
            message: (error instanceof Error && error.message) || errors.GENERIC_ERROR,
        });
    }
}
