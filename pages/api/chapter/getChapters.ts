import { NextApiRequest, NextApiResponse } from "next";
import { getChapters } from "server/actions/Chapter"
import { Chapter } from "utils/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        let chapterInfo: Chapter = req.body;

        const chapters: Chapter[] = await getChapters(chapterInfo);
        res.status(200).json({
            success: true,
            payload: chapters
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success: false, 
            message: error.message
        })
    }
}
