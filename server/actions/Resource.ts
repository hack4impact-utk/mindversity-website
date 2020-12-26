import mongoDB from "server/index";
import ResourceModel from "server/models/Resource";
import { Resource } from "utils/types";

/**
 * Adds the given resource to the database
 * @param resource New Resource to add to DB
 */
export const addResource = async function (resource: Resource): Promise<void> {
    await mongoDB();
    await ResourceModel.create(resource);
};

/**
 * Retrieves the resources that match the given resource
 * @param resource The resource info to search for
 * @returns An array containing the matching resources
 */
export const getResources = async function (resource: Resource): Promise<Resource[]> {
    await mongoDB();

    if (!resource) resource = {};
    const resourcesList = await ResourceModel.find(resource).lean();
    return resourcesList;
};

/**
 * Updates the fields of the given resource
 * @param resource The resource to update (must include resource ID)
 * @throws Error if document does not exist and if ID is not provided
 */
export const updateResource = async function (resource: Resource): Promise<void> {
    if (!resource._id) throw new Error("Id must be provided for update");

    await mongoDB();

    const oldResource = { _id: resource._id };
    await ResourceModel.findOneAndUpdate(oldResource, resource, { upsert: false });
};

/**
 * Deletes the given resource from the database
 * @param resource The resource to delete
 * @throws Error if resource is not found
 */
export const deleteResource = async function (resource: Resource): Promise<void> {
    await mongoDB();

    if (resource._id) await ResourceModel.findByIdAndDelete(resource._id);
    else await ResourceModel.findOneAndDelete(resource);
};
