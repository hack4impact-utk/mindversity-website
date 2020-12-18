import { NextApiRequest, NextApiResponse } from "next";
import { getOfficers } from "server/actions/Officer";
import { Officer } from "utils/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const officerInfo: Officer = req.body;
        
        const officers: Officer[] = await getOfficers(officerInfo);
        res.status(200).json({
            success: true,
            payload: officers
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
