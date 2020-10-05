import { NextApiRequest, NextApiResponse } from "next";
import { getChapterByName } from "server/actions/Chapter";
import { handleRequestWithPayloadResponse } from "utils/util";

// @route   post api/login
// @desc    Gets chapters by name
// @access  Public
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handleRequestWithPayloadResponse(req, res, getChapterByName, ["chapterName"]);
