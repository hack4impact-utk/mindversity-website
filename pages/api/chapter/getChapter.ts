import { NextApiRequest, NextApiResponse } from "next";
import { getChapter } from "server/actions/Chapter"
import { Chapter } from "utils/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let chapterInfo: Chapter = req.body;
    console.log(chapterInfo);
    await getChapter(chapterInfo)
    .then((payload) => 
        res.status(200).json({
            success: true,
            payload
        })
    )
    .catch((error)=>
        res.status(400).json({
            success: false, 
            message: error.message
        })
    )
}
