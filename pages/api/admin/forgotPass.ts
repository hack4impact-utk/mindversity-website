import { NextApiRequest, NextApiResponse } from "next";
import { sendForgotPasswordEmail } from "server/actions/User";

interface Email {
    email: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    const recipient = req.body as Email;

    try {
        const success = await sendForgotPasswordEmail(recipient.email);
        if (!success) throw new Error("Failed");
        res.status(200).json({ success: true, message: "Reset Email Sent" });
    } catch (_err) {
        const err = _err as Error;
        res.status(400).json({ sucess: false, message: err.message });
    }
}
