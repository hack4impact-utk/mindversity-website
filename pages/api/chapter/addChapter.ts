import { NextApiResponse, NextApiRequest } from "next";
import { uploadImage } from "server/actions/Contentful";
import { addChapter } from "server/actions/Chapter";
import formidable from "formidable";
import { Chapter } from "utils/types";
import errors from "utils/errors";
import globals from "utils/globals";

// To get formidable to work, bodyParser has to be turned off.
// Otherwise, the parse request will never end.
export const config = {
    api: {
        bodyParser: false,
    },
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
): void {
    try {
        const form = new formidable.IncomingForm();
        form.parse(
            req,
            async (
                err: string,
                fields: formidable.Fields,
                files: formidable.Files
            ) => {
                //Fields is used for everything other than files, so all this data can be passed in directly to the chapter type.
                const chapterInfo: Chapter = fields;

                // check image sizes, both should be less than 20 MB
                if (files.campus.size >= globals.contentfulImageLimit || files.logo.size >= globals.contentfulImageLimit)
                    throw new Error(errors.IMAGE_TOO_LARGE);
                                
                //If the files for the campus pic and logo exist, upload them to Contentful
                if(files.campus.size > 0){
                    chapterInfo.campusPic = await uploadImage(files.campus);
                }
                if(files.logo.size > 0){
                    chapterInfo.universityLogo = await uploadImage(files.logo);
                }

                //Since we use names in the url, names need to be parsed and have all whitespace converted to underscores
                chapterInfo.name = chapterInfo?.name?.replace(/ /g, "_");

                //Now that all data is prepped, we can add chapter.
                await addChapter(chapterInfo);
                res.status(200).json({
                    success: true,
                    payload: {},
                });
            }
        );
    } catch (error) {
        console.error(error instanceof Error && error);
        res.status(400).json({
            success: false,
            message:
                (error instanceof Error && error.message) ||
                errors.GENERIC_ERROR,
        });
    }
}
