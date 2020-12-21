import { NextApiRequest, NextApiResponse } from "next";
import { getResources } from "server/actions/Resource";
import errors from "utils/errors";
import { Resource } from "utils/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const resourceData = req.body as Resource;
        const resources = await getResources(resourceData);
        res.status(200).json({
            success: true,
            payload: resources,
        });
    } catch (error) {
        console.error(error instanceof Error && error);
        res.status(400).json({
            success: false,
            message: (error instanceof Error && error.message) || errors.GENERIC_ERROR,
        });
    }
}
