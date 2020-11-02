import {createClient} from "contentful-management";
import fs from "fs";
const client = createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});



export async function getImageUrlByID(ID: string){
    const asset = await client.getSpace(process.env.CONTENTFUL_SPACE) 
    .then((space) => space.getEnvironment('master'))
    .then(environment => environment.getAsset(ID))
    .then(asset => {return asset})
    .catch(error => {
            throw new Error("Asset retrieval unsuccessful: " + error);
    })
    return "https:" + asset.fields.file.url; 
}

export async function getAssetFromImage(url: string){
   //Need a content type,  
}
//https://www.contentful.com/developers/docs/references/content-management-api/#/reference/uploads/upload-a-file/creating-an-upload-resource/console/js
export async function uploadImage(image: any){
    //This could be refactored using async await instead of this long promise chain
    const asset = await client.getSpace(process.env.CONTENTFUL_SPACE) //dotenv this here..
    .then((space) => space.getEnvironment('master'))
    .then(environment => environment.createAssetFromFiles({
        fields: {
            title: {
                'en-US': "Image title",
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
            }

        },
    }))
    .then((asset) => asset.processForAllLocales())
    .then((asset) => asset.publish())
    .then((payload) => {return payload})
    .catch(console.error); 
   

    if(asset == null){
       throw new Error("Asset not found!");
   } else {
       //The url is returned without the http/https, so it's added here.
       return {'url': "https:" + asset.fields.file['en-US'].url, 'id': asset.sys.id}
   }

}

//https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/links/links-to-a-specific-item/query-entries/console/js
//To get an image, we can use the Content Delivery API's search query to search by the URL of the image
