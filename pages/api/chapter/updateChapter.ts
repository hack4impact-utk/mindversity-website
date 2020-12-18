import { NextApiRequest, NextApiResponse } from "next";
import { updateChapter, getChapters } from "server/actions/Chapter";
import { Chapter } from "utils/types";
import { deleteAssetByID, uploadImage } from "server/actions/Contentful";
import formidable from "formidable";

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
            // convert formdata into a chapter object
            let chapterInfo: Chapter = fields;
            if (!chapterInfo || !chapterInfo.name)
                res.status(500).json({
                    success: false, 
                    message: "Invalid form!"
                });

            // replace all whitespaces with underscores
            chapterInfo.name = chapterInfo?.name?.replace(/ /g, "_");

            // find existing chapter by name since _id isn't in the form
            let chapterQuery: Chapter = {};
            chapterQuery.name = chapterInfo.name;
            let chapters: Chapter[] = await getChapters(chapterQuery);

            if (chapters.length != 1)
                throw new Error("Chapter with the given name not found!");

            let chapter: Chapter = chapters[0];

            /*
            if images on contentful exist, they need to removed while uploading the 
            new images (deletes can happen async here):
                - both images exist -> delete contentful, insert form image
                - only form image exists (chapterInfo) -> insert image normally
                - else nothing happens
            */
            if (files?.logo) {
                if (chapter.universityLogo?.assetID) deleteAssetByID(chapter.universityLogo.assetID);
                chapterInfo.universityLogo = await uploadImage(files.logo);
            }
            if (files?.campus) {
                if (chapter.campusPic?.assetID) deleteAssetByID(chapter.campusPic.assetID);
                chapterInfo.campusPic = await uploadImage(files.campus);
            }

            // update the chapter's data in MongoDB
            chapterQuery = {};
            chapterQuery._id = chapter._id;
            await updateChapter(chapterQuery, chapterInfo);
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