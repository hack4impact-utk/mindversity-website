import { NextApiRequest, NextApiResponse } from "next";
import { getChapter, getChapterByName } from "server/actions/Chapter";
import { Chapter } from "utils/types";
//import { handleRequestWithPayloadResponse } from "utils/util";

// @route   post api/login
// @desc    Gets chapters by name
// @access  Public
// export default async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<void> =>
//   handleRequestWithPayloadResponse(req, res, getChapterByName, ["chapterName"]);



export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
  const {query:{name}} = req
  
  let chapterInfo: Chapter = {name: name.toString()}

    await getChapter(chapterInfo)
    .then(
      (payload) => {
        res.status(200).json({success: true, payload})
      }
    )
    .catch(
      (error) => {
        res.status(400).json({success: false, message: error.message})
      }
    )
}