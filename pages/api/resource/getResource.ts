import { NextApiRequest, NextApiResponse } from "next";
import { getResource } from "server/actions/Resource";
import { Resource } from "utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resourceData = req.body as Resource;

  try {
    const resources = await getResource(resourceData);

    if (resources) res.status(200).json({ success: true, resources });
    else res.status(400).json({ success: false });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err as Error,
    });
  }
}
