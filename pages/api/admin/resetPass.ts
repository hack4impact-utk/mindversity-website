import { NextApiRequest, NextApiResponse } from "next";
import { resetPassword } from "server/actions/User";

interface resetTokens {
    email: string;
    resetKey: string;
    newPassword: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    const resetData = req.body as resetTokens;

    try {
        await resetPassword(
            resetData.email,
            resetData.resetKey,
            resetData.newPassword
        );
        res.status(200).json({ success: true, message: "Password Reset" });
    } catch (_err) {
        const err = _err as Error;
        res.status(400).json({ success: false, message: err.message });
    }
}
