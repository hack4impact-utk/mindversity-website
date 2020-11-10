import mongoDB from "server/index";
import ResourceModel from "server/models/Resource";
import { Resource } from "utils/types";

/**
 * Adds the given resource to the database
 * @param resource New Resource to add to DB
 */
export const addResource = async function (
  resource: Resource
): Promise<boolean> {
  await mongoDB();

  if (await ResourceModel.create(resource)) {
    return true;
  }

  return false;
};

/**
 * Retrieves the resources that match the given resource
 * @param resource The resource info to search for
 * @returns An array containing the matching resources
 * @throws Error if resource does not exist
 */
export const getResource = async function (
  resource: Resource
): Promise<Resource[]> {
  await mongoDB();

  if (!resource) resource = {};

  const resourcesList = await ResourceModel.find(resource).lean();

  if (!resourcesList) throw new Error("Resourece does not exist");

  return resourcesList;
};

/**
 * Updates the fields of the given resource
 * @param resource The resource to update (must include resource ID)
 * @throws Error if document does not exist and if ID is not provided
 */
export const updateResource = async function (
  resource: Resource
): Promise<boolean> {
  if (!resource.id) throw new Error("Id must be provided for update");

  await mongoDB();

  const oldResource = { _id: resource.id };

  if (
    await ResourceModel.findOneAndUpdate(oldResource, resource, {
      upsert: false,
    })
  ) {
    return true;
  }

  return false;
};

/**
 * Deletes the given resource from the database
 * @param resource The resource to delete
 * @throws Error if resource is not found
 */
export const deleteResource = async function (
  resource: Resource
): Promise<boolean> {
  await mongoDB();
  let deleted = false;

  if (resource.id) {
    await ResourceModel.findByIdAndDelete(resource.id).then(
      (resource: Resource) => {
        if (resource) deleted = true;
      }
    );
  } else {
    await ResourceModel.findOneAndDelete(resource).then(
      (resource: Resource) => {
        if (resource) deleted = true;
      }
    );
  }

  return deleted;
};
