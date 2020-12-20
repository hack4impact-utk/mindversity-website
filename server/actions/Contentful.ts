import {createClient} from "contentful-management";
import fs from "fs";
import {File} from "formidable";
import {JournalEntry, ContentfulImage} from "utils/types";
import format from 'date-fns/format';
const client = createClient({
    accessToken: process.env.CONTENTFUL_PERSONAL_TOKEN as string
});


/**
 * @param image Image file of type Formidable.File to be uploaded.
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
    
    if(!asset){
       throw new Error("Asset creation unsuccessful.");
    } else {
       //Delete image from local storage before ending upload
       fs.unlinkSync(image.path);
       //The url is returned without the http/https, so it's added here.
       return {'url': "https:" + asset.fields.file['en-US'].url, 'assetID': asset.sys.id};
   }

}

/**
 * @param ID ID of the Contentful Asset to be deleted.
 */
export async function deleteAssetByID(ID: string){
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE as string);
    const environment = await  space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT as string);
    const asset = await environment.getAsset(ID);

    //Before an asset can be deleted, it has to be unpublished.
    await asset.unpublish();
    await asset.delete();
}

/**
 * @param journalEntry Journal Entry information to be uploaded to Contentful.
 */
export async function createJournalEntry(journalEntry: JournalEntry){
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

    await entry.publish();
    if(!entry) 
        throw new Error("Error creating journal entry.");
}

/**
 * @param reviewed review status of the Journal Entries to be retrieved
 * @returns An array filled with Journal Entries retrieved.
 */
export async function getJournalEntriesByReviewStatus(reviewed: boolean){
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE as string);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT as string);
    const entries = await environment.getEntries({
        'content_type': 'blogPost',
        'fields.reviewed': reviewed,
    });

    var journalEntries : JournalEntry[] = [];
    for (var i=0; i < entries.total; i++) {
        var journalEntry: JournalEntry = {};
        journalEntry.id = entries.items[i].sys.id; // unique id for the asset
        journalEntry.body = entries.items[i].fields.body['en-US'];
        journalEntry.category = entries.items[i].fields.category['en-US'];
        journalEntry.reviewed =  entries.items[i].fields.reviewed['en-US'];
        journalEntry.description = entries.items[i].fields.description['en-US'];
        journalEntry.image = entries.items[i].fields.image['en-US'];
        journalEntry.title = entries.items[i].fields.title['en-US'];

        // pass in ISO format and format to: Month Day, Year
        var date: Date = new Date(entries.items[0].sys.createdAt); 
        journalEntry.dateCreated = format(date, 'MMMM dd, yyyy');

        journalEntries.push(journalEntry);
    }

    return journalEntries;
}

/**
 * @param id The unique journal identifier (given by contentful) to query by.
 * @returns A single journal entry.
 */
export async function getJournalEntryById(id: string){
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE as string);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT as string);
    const entry = await environment.getEntry(id);

    var journalEntry: JournalEntry = {};
    journalEntry.id = entry.sys.id; // unique id for the asset
    journalEntry.body = entry.fields.body['en-US'];
    journalEntry.category = entry.fields.category['en-US'];
    journalEntry.reviewed =  entry.fields.reviewed['en-US'];
    journalEntry.description = entry.fields.description['en-US'];
    journalEntry.image = entry.fields.image['en-US'];
    journalEntry.title = entry.fields.title['en-US'];
    
    // pass in ISO format and format to: Month Day, Year
    var date: Date = new Date(entry.sys.createdAt); 
    journalEntry.dateCreated = format(date, 'MMMM dd, yyyy');

    return journalEntry;
}

/**
 * @param id The unique journal identifier given by contentful.
 */
export async function deleteJournalEntryById(id: string){
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE as string);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT as string);
    const entry = await environment.getEntry(id);

    // First delete the image associated with the journal, then 
    // delete the journal itself.
    var image: ContentfulImage = entry.fields.image['en-US'];
    deleteAssetByID(image.assetID);
    await entry.unpublish();
    await entry.delete();
}

/**
 * @param type what journal category to filter by: creative-space or vent-place
 * @returns An array of *reviewed* entries containing to the type specified. It only
 * returns the fields that are used in the journal preview. 
 */
export async function getJournalEntryByType(type: string){
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE as string);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT as string);
    const entries = await environment.getEntries({
        'content_type': 'blogPost',
        'fields.category': type,
        'fields.reviewed': true,
    });

    var journalEntries : JournalEntry[] = [];
    for (var i=0; i < entries.total; i++) {
        var journalEntry: JournalEntry = {};
        journalEntry.id = entries.items[i].sys.id; // unique id for the asset
        journalEntry.category = entries.items[i].fields.category['en-US'];
        journalEntry.description = entries.items[i].fields.description['en-US'];
        journalEntry.image = entries.items[i].fields.image['en-US'];
        journalEntry.title = entries.items[i].fields.title['en-US'];

        journalEntries.push(journalEntry);
    }

    return journalEntries;
}

/**
 * @param id ID of the JournalEntry to be updated
 */
export async function updateJournalEntryReviewStatus(id: string){
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE as string);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT as string);
    const entry = await environment.getEntry(id);

    //Review status would only ever go from false to true (or be deleted), so there's 
    //no need to specify what the status would be.
    entry.fields.reviewed['en-US'] = true;
    await entry.update();
}