import { NextApiResponse, NextApiRequest } from "next";
import {getJournalEntryByType} from "server/actions/Contentful";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        if(req.method == "GET"){
            if (!req.query.type) 
                throw new Error("Bad request.");

            const entry = await getJournalEntryByType(req.query.type as string);
            res.status(200).json({
                success: true,
                payload: entry
            });
        }
    }
    catch (error) {
        console.error(error);    
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
