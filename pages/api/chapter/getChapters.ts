import { NextApiRequest, NextApiResponse } from "next";
import { getChapters } from "server/actions/Chapter";
import { Chapter } from "utils/types";
import errors from "utils/errors";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const chapterInfo: Chapter = req.body as Chapter;

        const chapters: Chapter[] = await getChapters(chapterInfo);
        res.status(200).json({
            success: true,
            payload: chapters,
        });
    } catch (error) {
        console.error(error instanceof Error && error);
        res.status(400).json({
            success: false,
            message: (error instanceof Error && error.message) || errors.GENERIC_ERROR,
        });
    }
}
