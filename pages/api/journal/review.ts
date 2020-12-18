import {NextApiRequest, NextApiResponse} from "next";
import {updateJournalEntryReviewStatus, deleteJournalEntryById} from "server/actions/Contentful";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    try {
        if (!req.query.approved)
            throw new Error("Bad request.");

        if(req.query.approved === "true"){
            await updateJournalEntryReviewStatus(req.query.id as string);
        }
        else if(req.query.approved === "false"){
            await deleteJournalEntryById(req.query.id as string);
        }

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
}
