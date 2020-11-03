import { NextApiResponse, NextApiRequest } from "next";
import {uploadImage, deleteAssetByID} from "server/actions/Contentful";
import formidable from "formidable";

//To get formidable to work, bodyParser has to be turned off. Otherwise, the parse request will never end.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const form = new formidable.IncomingForm();
    form.parse(req, async (err:any, fields: formidable.Fields ,files: formidable.Files) => {
        //Formidable produces an object with information about the file, including type, name, size, and a buffer of the file's data.
        const asset = await uploadImage(files.file);
        console.log("Asset URL: ", asset.url);
        res.status(200).json({'URL': asset.url, 'ID': asset.id});
        console.log("Deleting asset...");
        await deleteAssetByID(asset.id); 

        if(err){
            res.status(500).json({'error': err});
        }
        

    });

}
