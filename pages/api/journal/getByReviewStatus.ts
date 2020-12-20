import { NextApiResponse, NextApiRequest } from "next";
import { getJournalEntriesByReviewStatus } from "server/actions/Contentful";
import errors from "utils/errors";

// This API route takes in a query from the url. By default, the route will
// return all entries that have not been reviewed. To get reviewed entries,
// use the following route: /api/journal/getByReviewStatus?reviewed=true
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    try {
        if (req.method == "GET") {
            if (!req.query.reviewed) throw new Error("Bad request.");

            // Req.query.reviewed is a string, but getJournalEntriesByReviewStatus expects a boolean.
            // To make it one, we check if req.query.reviewed === "true". If it is, then we have a
            // boolean review status with true. If not, the boolean status remains false.
            const reviewed: boolean = req.query.reviewed === "true";
            const entries = await getJournalEntriesByReviewStatus(reviewed);
            res.status(200).json({
                success: true,
                payload: entries,
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
