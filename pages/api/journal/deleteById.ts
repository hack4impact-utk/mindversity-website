import { NextApiResponse, NextApiRequest } from "next";
import {deleteJournalEntryById} from "server/actions/Contentful";


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if(req.method == "DELETE"){
        if (!req.query.id) res.status(400).json({message:"Bad request."});
        
        const entry = await deleteJournalEntryById(req.query.id as string);
        if(entry == true){
            res.status(200).json(true);
        } else {
            res.status(500).json({message:"Server error."});
        }
    }
}
