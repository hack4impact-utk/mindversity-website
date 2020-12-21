import { NextApiRequest, NextApiResponse } from "next";
import { deleteResource } from "server/actions/Resource";
import { Resource } from "utils/types";
import auth from "server/actions/Authenticate";
import errors from "utils/errors";

export default auth("admin", async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const resource = req.body as Resource;
        await deleteResource(resource);
        res.status(200).json({
            success: true,
            payload: {},
        });
    } catch (error) {
        console.error(error instanceof Error && error);
        res.status(400).json({
            success: false,
            message: (error instanceof Error && error.message) || errors.GENERIC_ERROR,
        });
    }
});
