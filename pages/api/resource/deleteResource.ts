import { NextApiRequest, NextApiResponse } from "next";
import { deleteResource } from "server/actions/Resource";
import { Resource } from "utils/types";
import auth from "server/actions/Authenticate";

export default auth("admin", async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const resource = req.body as Resource;
        await deleteResource(resource);
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
