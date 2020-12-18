import { NextApiResponse, NextApiRequest } from "next";
import { uploadImage } from "server/actions/Contentful";
import { addOfficer } from "server/actions/Officer";
import formidable from "formidable";
import { Officer } from "utils/types";

//To get formidable to work, bodyParser has to be turned off. 
// Otherwise, the parse request will never end.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err: any, fields: formidable.Fields, files: formidable.Files) => { 
            //Fields is used for everything other than files, so all this data can be passed in directly to the officer type.
            let officerInfo: Officer = fields;

            // check image size, should be less than 20 MB
            if (files.picture.size >= 20*1000*1000)
                throw new Error("File size is too large!");

            // upload the officer's profile pic to contentful
            // keep .picture in sync with the front-end input name in the form
            officerInfo.picture = await uploadImage(files.picture); 

            // now that all data is prepped, we can add the officer
            await addOfficer(officerInfo);
            res.status(200).json({
                success: true,
                payload: {}
            })
        });
    }
    catch (error) {      
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

