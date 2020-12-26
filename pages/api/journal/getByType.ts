import { NextApiResponse, NextApiRequest } from "next";
import { getJournalEntryByType } from "server/actions/Contentful";
import errors from "utils/errors";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        if (req.method == "GET") {
            if (!req.query.type) throw new Error("Bad request.");

            const entry = await getJournalEntryByType(req.query.type as string);
            res.status(200).json({
                success: true,
                payload: entry,
            });
        }
    } catch (error) {
        console.error(error instanceof Error && error);
        res.status(400).json({
            success: false,
            message: (error instanceof Error && error.message) || errors.GENERIC_ERROR,
        });
    }
}
