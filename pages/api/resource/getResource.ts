import { NextApiRequest, NextApiResponse } from "next";
import { getResources } from "server/actions/Resource";
import { Resource } from "utils/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const resourceData = req.body as Resource;
        const resources = await getResources(resourceData);
        res.status(200).json({ 
            success: true, 
            payload: resources
        });
    } 
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
