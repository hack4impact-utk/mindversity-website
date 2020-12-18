import { NextApiResponse, NextApiRequest } from "next";
import { uploadImage } from "server/actions/Contentful";
import { addChapter } from "server/actions/Chapter";
import formidable from "formidable";
import { Chapter } from "utils/types";

// To get formidable to work, bodyParser has to be turned off. 
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
            //Fields is used for everything other than files, so all this data can be passed in directly to the chapter type.
            let chapterInfo: Chapter = fields;
            
            //Since we use names in the url, names need to be parsed and have all whitespace converted to underscores
            chapterInfo.name = chapterInfo?.name?.replace(/ /g, "_");

            //Since these two don't rely on each other to be uploaded, doing this allows them to be done simultaneously, and should be more efficient
            [chapterInfo.campusPic, chapterInfo.universityLogo] = await Promise.all([uploadImage(files.campus), uploadImage(files.logo)]);

            //Now that all data is prepped, we can add chapter.
            await addChapter(chapterInfo);
            res.status(200).json({
                success: true,
                payload: {}
            });
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
