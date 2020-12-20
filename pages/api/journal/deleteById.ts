import { NextApiResponse, NextApiRequest } from "next";
import {deleteJournalEntryById} from "server/actions/Contentful";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        if(req.method == "DELETE") {
            if (!req.query.id) 
                throw new Error("Bad request.");
            
            await deleteJournalEntryById(req.query.id as string);
            res.status(200).json({
                success: true,
                payload: {}
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
