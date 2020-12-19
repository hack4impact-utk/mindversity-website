import { NextApiResponse, NextApiRequest } from "next";
import { getJournalEntryById } from "server/actions/Contentful";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "GET") {
        if (!req.query.id) res.status(400).json({ message: "Bad request." });

        const entry = await getJournalEntryById(req.query.id as string);
        if (entry != {}) {
            res.status(200).json(entry);
        } else {
            res.status(500).json({ message: "Server error." });
        }
    }
}
