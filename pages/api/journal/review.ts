import {NextApiRequest, NextApiResponse} from "next";
import {updateJournalEntryReviewStatus, deleteJournalEntryById} from "server/actions/Contentful";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    let success;
    if(req.query.approved === "true"){
         success =  await updateJournalEntryReviewStatus(req.query.id as string);
         //If update was successful, return a message to the client saying so.
         if(success){
             res.status(200).json({message: "Entry successfully approved."});
         } else {
             res.status(400).json({message:"Something went wrong. Please try again."});
         }
    }

    if(req.query.approved === "false"){
        success = await deleteJournalEntryById(req.query.id as string);
        //If entry was successfully deleted, return a message to the client.
        if(success){
            res.status(200).json({message: "Entry successfully rejected."});
        } else {
            res.status(400).json({message: "Something went wrong, please try again."});
        }
    }

}
