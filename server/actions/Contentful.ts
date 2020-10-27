import {createClient} from "contentful-management";
const client = createClient({
    accessToken: 'dZnP7loBCYnMaIWQ-fVsm0hecMyWkMRaP_x2XOkmytA',
});



export async function getImageUrlByID(ID: string){
    const asset = await client.getSpace('8ox1k5lbvsgt') //dotenv this here.
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
    const asset = await client.getSpace('8ox1k5lbvsgt') //dotenv this here..
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
                    contentType: "image/png", //Image.type?
                    fileName: "test.png", //Image.fileName,
                    file: image.data,
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
       return asset.fields.file.url;
   }

}

//https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/links/links-to-a-specific-item/query-entries/console/js
//To get an image, we can use the Content Delivery API's search query to search by the URL of the image
