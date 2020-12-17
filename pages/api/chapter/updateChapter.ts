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
    const form = new formidable.IncomingForm();
    form.parse(req, async (err: any, fields: formidable.Fields, files: formidable.Files) => {
        // convert formdata into a chapter object
        let chapterInfo: Chapter = req.body;
        
        // replace all whitespaces with underscores
        chapterInfo.name = chapterInfo?.name?.replace(/ /g, "_");

        // find existing chapter
        let chapterQuery: Chapter = {};
        chapterQuery._id = chapterInfo?._id;
        let chapters: Chapter[] = await getChapters(chapterQuery);

        // TODO fix error handling
        if (chapters.length != 1) throw ("Chapter not found")

        let chapter: Chapter = chapters[0];

        // if images exist (TODO and differ???), delete them from contentful
        // and upload the new images. Deletes can happen async here.
        if (chapter.universityLogo?.assetID) {
            deleteAssetByID(chapter.universityLogo.assetID);
            chapterInfo.universityLogo = await uploadImage(files.logo);
        }
        if (chapter.campusPic?.assetID) {
            deleteAssetByID(chapter.campusPic.assetID);
            chapterInfo.campusPic = await uploadImage(files.campus);
        }

        // update the chapter's data in MongoDB
        chapterQuery = {};
        chapterQuery._id = chapterInfo?._id;
        await updateChapter(chapterQuery, chapterInfo)
        .then((payload) => 
            res.status(200).json({
                success: true,
                payload
            })
        )
        .catch((error)=>
            res.status(400).json({
                success: false, 
                message: error.message
            })
        )
    });
}