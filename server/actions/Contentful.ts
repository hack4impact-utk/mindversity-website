import {createClient} from "contentful-management";
import fs from "fs";
import {File} from "formidable";


const client = createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});


//https://www.contentful.com/developers/docs/references/content-management-api/#/reference/uploads/upload-a-file/creating-an-upload-resource/console/js
export async function uploadImage(image: File){
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE);
    const environment = await space.getEnvironment('master');
    let asset = await environment.createAssetFromFiles({
        fields: {
            title: {
                'en-US': "Title",
            },
            description: {
                "en-US": "Image description",
            },
            file: {
                'en-US': {
                    contentType: image.type,
                    fileName: image.name,
                    file: fs.readFileSync(image.path),
                },
            },
        }
    });

    asset = await asset.processForAllLocales();
    asset = await asset.publish();
    
    if(asset == null){
       throw new Error("Asset creation unsuccessful.");
   } else {
       
       //Delete image from local storage before ending upload
       fs.unlinkSync(image.path);
       //The url is returned without the http/https, so it's added here.
       return {'url': "https:" + asset.fields.file['en-US'].url, 'assetID': asset.sys.id}
   }

}


export async function deleteAssetByID(ID: string){
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE);
    const environment = await  space.getEnvironment('master');
    const asset = await environment.getAsset(ID); 
    //Before an asset can be deleted, it has to be unpublished.
    await asset.unpublish();
    await asset.delete();
    console.log("Asset deleted.");
}
