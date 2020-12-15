import { NextApiResponse, NextApiRequest } from "next";
import {getJournalEntryByType} from "server/actions/Contentful";


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if(req.method == "GET"){
        if (!req.query.type) res.status(400).json({message:"Bad request."});

        const entry = await getJournalEntryByType(req.query.type as string);
        if(entry != {}){
            res.status(200).json(entry);
        } else {
            res.status(500).json({message:"Server error."});
        }
    }
}
