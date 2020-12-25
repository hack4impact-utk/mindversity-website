import fetch from "isomorphic-unfetch";
import { Resource } from "utils/types";
import urls from "utils/urls";

export const getResources = async (resource: Resource) =>
    fetch(`${urls.baseUrl}${urls.api.resource.get}`, {
        method: "POST",
        mode: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resource),
    })
        .then(response => response.json())
        .then(json => {
            if (json == null) {
                throw new Error("Could not connect to API!");
            } else if (!json.success) {
                throw new Error(json.message);
            }

            return json.payload;
        });

export const addResources = async (resource: Resource) => {
    fetch(`${urls.baseUrl}${urls.api.resource.add}`, {
        method: "POST",
        mode: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resource),
    })
        .then(response => response.json())
        .then(json => {
            if (json == null) {
                throw new Error("Could not connect to API!");
            } else if (!json.success) {
                throw new Error(json.message);
            }

            return json.payload;
        });
};
export const deleteResources = async (resource: Resource) => {
    fetch(`${urls.baseUrl}${urls.api.resource.delete}`, {
        method: "POST",
        mode: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resource),
    })
        .then(response => response.json())
        .then(json => {
            if (json == null) {
                throw new Error("Could not connect to API!");
            } else if (!json.success) {
                throw new Error(json.message);
            }

            return json.payload;
        });
};

export const updateResources = async (resource: Resource) => {
    fetch(`${urls.baseUrl}${urls.api.resource.update}`, {
        method: "POST",
        mode: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resource),
    })
        .then(response => response.json())
        .then(json => {
            if (json == null) {
                throw new Error("Could not connect to API!");
            } else if (!json.success) {
                throw new Error(json.message);
            }

            return json.payload;
        });
};
