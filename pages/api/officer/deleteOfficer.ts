import { NextApiRequest, NextApiResponse } from "next";
import { deleteOfficer } from "server/actions/Officer";
import { Officer } from "utils/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let officerInfo: Officer = JSON.parse(req.body);
    
    await deleteOfficer(officerInfo)
    .then((payload) => 
        res.status(200).json({
            success: true,
            payload
        })
    )
    .catch((error)=>
        res.status(400).json({
            success: false, 
            message: error.message
        })
    )
}
