import { NextApiResponse, NextApiRequest } from "next";
import formidable from "formidable";
import { uploadImage, createJournalEntry } from "server/actions/Contentful";
import { JournalEntry } from "utils/types";
import errors from "utils/errors";
import globals from "utils/globals";

//To get formidable to work, bodyParser has to be turned off. Otherwise, the parse request will never end.
export const config = {
    api: {
        bodyParser: false,
    },
};

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err: string, fields: formidable.Fields, files: formidable.Files) => {
            const journalEntry: JournalEntry = fields;

            // check image size, should be less than 20 MB
            if (files.image.size >= globals.contentfulImageLimit) throw new Error(errors.IMAGE_TOO_LARGE);

            //In Contentful, Entries store links to Assets (in this case, our Journal Entry images),
            //so we get the asset ID and url for the JournalEntry's image
            journalEntry.image = await uploadImage(files.image);
            await createJournalEntry(journalEntry);
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
}
