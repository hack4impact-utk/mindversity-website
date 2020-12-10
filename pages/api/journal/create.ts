import { NextApiResponse, NextApiRequest } from "next";
import formidable from "formidable";
import {uploadImage, createJournalEntry} from "server/actions/Contentful";
import {JournalEntry} from "utils/types";

//To get formidable to work, bodyParser has to be turned off. Otherwise, the parse request will never end.
export const config = {
  api: {
    bodyParser: false,
  },
};


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const form = new formidable.IncomingForm();
    form.parse(req, async (err:string, fields: formidable.Fields ,files: formidable.Files) => { 
        let journalEntry: JournalEntry = fields;
        //In Contentful, Entries store links to Assets (in this case, our Journal Entry images), so we get the asset ID and url for the JournalEntry's image
        journalEntry.image = await uploadImage(files.image);
        const created = await createJournalEntry(journalEntry);
        if(created){
            res.status(200).json({message: "Post successfully created!"});
        } else {
            res.status(400).json({message: 'Something went wrong. Please try again.'});
        }
    });
        
}
