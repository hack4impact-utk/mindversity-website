import { NextApiRequest, NextApiResponse } from "next";
import { addResource } from "server/actions/Resource";
import auth from "server/actions/Authenticate";
import { Resource } from "utils/types";

export default auth("admin", async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const resourceData = req.body as Resource;
        await addResource(resourceData);
        res.status(200).json({
            success: true,
            payload: {},
        });
    } catch (error) {
        const err = error as Error;
        console.error(err);
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
});
