import { NextApiResponse, NextApiRequest } from "next";
import {getJournalEntriesByReviewStatus} from "server/actions/Contentful";
//This API route takes in a query from the url. By default, the route will return all entries that have not been reviewed. To get reviewed entries, use the following route: /api/journal/get?reviewed=true
export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if(req.method == "GET"){
        let reviewed = false;
        if(req.query.reviewed){
           reviewed = (req.query.reviewed === "true") || (req.query.reviewed === "false");
        }
        const entries = await getJournalEntriesByReviewStatus(reviewed);
        if(entries != {}){
            res.status(200).json(entries);
        } else {
            res.status(500).json({message:"Server error."});
        }
    }
}
