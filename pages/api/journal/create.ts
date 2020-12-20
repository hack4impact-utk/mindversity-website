import { NextApiResponse, NextApiRequest } from "next";
import formidable from "formidable";
import { uploadImage, createJournalEntry } from "server/actions/Contentful";
import { JournalEntry } from "utils/types";

//To get formidable to work, bodyParser has to be turned off. Otherwise, the parse request will never end.
export const config = {
  api: {
    bodyParser: false,
  },
};


export default async function handler(req: NextApiRequest, res: NextApiResponse){
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err: string, fields: formidable.Fields, files: formidable.Files) => { 
      let journalEntry: JournalEntry = fields;

      //In Contentful, Entries store links to Assets (in this case, our Journal Entry images), 
      //so we get the asset ID and url for the JournalEntry's image
      journalEntry.image = await uploadImage(files.image);
      await createJournalEntry(journalEntry);
      res.status(200).json({
        success: true,
        payload: {}
      });
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
