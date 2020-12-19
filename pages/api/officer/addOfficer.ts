import { NextApiResponse, NextApiRequest } from "next";
import { uploadImage } from "server/actions/Contentful";
import { addOfficer } from "server/actions/Officer";
import formidable from "formidable";
import { Officer } from "utils/types";

//To get formidable to work, bodyParser has to be turned off. Otherwise, the parse request will never end.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err: any, fields: formidable.Fields, files: formidable.Files) => { 
        //Fields is used for everything other than files, so all this data can be passed in directly to the officer type.
        let officerInfo: Officer = fields;

        // remove the existing image if the officer exists
        // specifying the _id means it's an existing officer
        // having picture field means that the officer already has a pic
        if (officerInfo._id && officerInfo.picture) {
            console.log("need to delete image");
        }
        if (officerInfo._id) {
            console.log("need to update instead of add");
        }

        // TODO check file size here, should be less than 20 MB
        // upload the officer's profile pic to contentful
        officerInfo.picture = await uploadImage(files.picture); //keep .picture in sync with the front-end input name in the form

        //Now that all data is prepped, we can add the officers.
        await addOfficer(officerInfo)
        .then((payload) => {
            res.status(200).json({
                success: true,
                payload,
            })
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                success: false,
                message: error,
            })
        });
    });
}

