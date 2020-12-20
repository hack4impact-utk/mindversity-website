import { NextApiRequest, NextApiResponse } from "next";
import { resetPassword } from "server/actions/User";

interface resetTokens {
    email: string;
    resetKey: string;
    newPassword: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const resetData = req.body as resetTokens;
        await resetPassword(
            resetData.email,
            resetData.resetKey,
            resetData.newPassword
        );
        res.status(200).json({ 
            success: true, 
            payload: "Password Reset" 
        });
    } 
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
