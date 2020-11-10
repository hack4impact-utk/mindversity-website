import { NextApiRequest, NextApiResponse } from "next";
import { addResource } from "server/actions/Resource";
import auth from "server/actions/Authenticate";
import { Resource } from "utils/types";

export default auth("admin", async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resourceData = req.body as Resource;

  try {
    const added = await addResource(resourceData);

    if (added) res.status(200).json({ success: true });
    else res.status(400).json({ success: false });
  } catch (_err) {
    const err = _err as Error;

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
