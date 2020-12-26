import { NextApiResponse, NextApiRequest } from "next";
import { uploadImage } from "server/actions/Contentful";
import { addOfficer } from "server/actions/Officer";
import formidable from "formidable";
import { Officer } from "utils/types";
import globals from "utils/globals";
import errors from "utils/errors";
import auth from "server/actions/Authenticate";

//To get formidable to work, bodyParser has to be turned off.
// Otherwise, the parse request will never end.
export const config = {
    api: {
        bodyParser: false,
    },
};

export default auth("any", function handler(req: NextApiRequest, res: NextApiResponse): void {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err: string, fields: formidable.Fields, files: formidable.Files) => {
            //Fields is used for everything other than files, so all this data can be passed in directly to the officer type.
            const officerInfo: Officer = fields;

            // check image size, should be less than 20 MB
            if (files.image.size >= globals.contentfulImageLimit) throw new Error(errors.IMAGE_TOO_LARGE);

            // upload the officer's profile pic to contentful
            // keep .picture in sync with the front-end input name in the form
            officerInfo.picture = await uploadImage(files.picture);

            // now that all data is prepped, we can add the officer
            await addOfficer(officerInfo);
            res.status(200).json({
                success: true,
                payload: {},
            });
        });
    } catch (error) {
        console.error(error instanceof Error && error);
        res.status(400).json({
            success: false,
            message: (error instanceof Error && error.message) || errors.GENERIC_ERROR,
        });
    }
});
