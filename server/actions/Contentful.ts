import {createClient} from "contentful-management";
import fs from "fs";
import {File} from "formidable";
import {JournalEntry} from "utils/types";

const client = createClient({
    accessToken: process.env.CONTENTFUL_PERSONAL_TOKEN as string
});


/**
* @param image Image file of type Formidable.File to be uploaded
* @returns An object containing the uploaded image's asset ID and url. 
* @throws  Error if resource creation is unsuccessful
*/
export async function uploadImage(image: File){
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE as string);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT as string);
    let asset = await environment.createAssetFromFiles({
        fields: {
            title: {
                'en-US': image.name,
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

/**
* @param ID ID of the Contentful Asset to be deleted
* @returns True if deletion is successful, false if deletion failed.
*/
export async function deleteAssetByID(ID: string){
    try{
        const space = await client.getSpace(process.env.CONTENTFUL_SPACE as string);
        const environment = await  space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT as string);
        const asset = await environment.getAsset(ID);
        //Before an asset can be deleted, it has to be unpublished.
        await asset.unpublish();
        await asset.delete();
        console.log("Asset deleted.");
        return true;
    } catch (error){
        if(error) console.error(error);
        return false;
    }
}

/**
* @param journalEntry Journal Entry information to be uploaded to Contentful
* @returns True if creation is successful, false if creation is unsuccessful.
*/
export async function createJournalEntry(journalEntry: JournalEntry){
    try{
        const space = await client.getSpace(process.env.CONTENTFUL_SPACE as string);
        const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT as string);
        const entry = await environment.createEntry('blogPost', {
            fields: {
                title: {
                    'en-US': journalEntry.title,
                },
                description: {
                    'en-US': journalEntry.description,
                },
                category: {
                    'en-US': journalEntry.category,
                },
                body: {
                    'en-US': journalEntry.body,
                },
                reviewed: {
                    'en-US': false,
                },
                image:{
                    'en-US': journalEntry.image,
                }
            }
        });
        if(entry){
            return true;
        } 
        return false;
    } catch(error) {
        if(error) console.error(error);
        return false;
    }
}

/**
* @param reviewed review status of the Journal Entries to be retrieved
* @returns An array filled with Journal Entries retrieved or an empty object if there's an error.
*/
export async function getJournalEntriesByReviewStatus(reviewed: boolean){
    try{
        const space = await client.getSpace(process.env.CONTENTFUL_SPACE as string);
        const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT as string);
        const entries = await environment.getEntries({
            content_type: 'blogPost',
            fields: {
                reviewed: reviewed,
            },
        });

        var journalEntries : JournalEntry[] = [];
        for (var i=0; i < entries.total; i++) {
            console.log(entries.items[i])
            var journalEntry: JournalEntry = {};
            journalEntry.id = entries.items[i].sys.id; // unique id for the asset
            journalEntry.body = entries.items[i].fields.body['en-US']
            journalEntry.category = entries.items[i].fields.category['en-US']
            journalEntry.description = entries.items[i].fields.description['en-US'];
            journalEntry.image = entries.items[i].fields.image['en-US']
            journalEntry.title = entries.items[i].fields.title['en-US']
            journalEntries.push(journalEntry);
        }

        return journalEntries;
    } catch (error) {
        if(error) console.error(error);
        return {};
    }
}


