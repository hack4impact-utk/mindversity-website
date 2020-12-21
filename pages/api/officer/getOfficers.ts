import { NextApiRequest, NextApiResponse } from "next";
import { getOfficers } from "server/actions/Officer";
import errors from "utils/errors";
import { Officer } from "utils/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    try {
        const officerInfo: Officer = req.body as Officer;

        const officers: Officer[] = await getOfficers(officerInfo);
        res.status(200).json({
            success: true,
            payload: officers,
        });
    } catch (error) {
        console.error(error instanceof Error && error);
        res.status(400).json({
            success: false,
            message:
                (error instanceof Error && error.message) ||
                errors.GENERIC_ERROR,
        });
    }
}
