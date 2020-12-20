import { NextApiRequest, NextApiResponse } from "next";
import { addResource } from "server/actions/Resource";
import auth from "server/actions/Authenticate";
import { Resource } from "utils/types";

export default auth("admin", async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const resourceData = req.body as Resource;
        await addResource(resource);
        res.status(200).json({ 
            success: true, 
            payload: {}
        });
    } 
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
