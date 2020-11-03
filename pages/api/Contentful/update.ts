import { NextApiResponse, NextApiRequest } from "next";
import {uploadImage, deleteAssetByID} from "server/actions/Contentful";
import formidable from "formidable";
import {Chapter, ContentfulImage} from "utils/types";
//To get formidable to work, bodyParser has to be turned off. Otherwise, the parse request will never end.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const form = new formidable.IncomingForm();
    form.parse(req, async (err:any, fields: formidable.Fields ,files: formidable.Files) => {
        //We would need to fetch the old data here and delete the old images only if images have been uploaded.
        
        //Fields is used for everything other than files, so all this data can be passed in directly to the chapter type.
        let chapterInfo: Chapter = fields;
        //Since these two don't rely on each other to be uploaded, doing this allows them to be done simultaneously, and should be more efficient
        [chapterInfo.campusPic, chapterInfo.universityLogo] = await Promise.all([uploadImage(files.campus), uploadImage(files.logo)])
        
        console.log("Chapter Name: " + chapterInfo.name);
        console.log("Chapter Description: " + chapterInfo.description);
        console.log("Chapter Region: " + chapterInfo.region);
        console.log("Campus Image URL: " + chapterInfo.campusPic.url);
        console.log("Campus Image ID: " + chapterInfo.campusPic.id);
        console.log("University Logo URL: " + chapterInfo.universityLogo.url);
        console.log("University Logo ID: " + chapterInfo.universityLogo.id);
        console.log("Chapter Region: " + chapterInfo.region);
        //const asset = await uploadImage(files.file);
        //await deleteAssetByID(asset.id); 

        

    });

}
