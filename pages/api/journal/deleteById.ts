import { NextApiResponse, NextApiRequest } from "next";
import { deleteJournalEntryById } from "server/actions/Contentful";
import errors from "utils/errors";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    try {
        if (req.method == "DELETE") {
            if (!req.query.id) throw new Error("Bad request.");

            await deleteJournalEntryById(req.query.id as string);
            res.status(200).json({
                success: true,
                payload: {},
            });
        }
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
