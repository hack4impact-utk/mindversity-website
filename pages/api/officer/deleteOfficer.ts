import { NextApiRequest, NextApiResponse } from "next";
import { deleteOfficer } from "server/actions/Officer";
import errors from "utils/errors";
import { Officer } from "utils/types";
import auth from "server/actions/Authenticate";

export default auth("any", async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const officerInfo: Officer = req.body as Officer;
        await deleteOfficer(officerInfo);
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
});
