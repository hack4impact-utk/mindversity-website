import fetch from "isomorphic-unfetch";
import { Officer } from "utils/types";
import urls from "utils/urls";

export const getOfficers = (officer: Officer) =>
    fetch(`${urls.baseUrl}${urls.api.officer.get}`, {
        method: "POST",
        mode: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(officer),
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

export const addOfficer = (form: FormData) =>
    fetch(`${urls.baseUrl}${urls.api.officer.add}`, {
        method: "POST",
        mode: "same-origin",
        body: form,
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

export const deleteOfficer = (officer: Officer) =>
    fetch(`${urls.baseUrl}${urls.api.officer.delete}`, {
        method: "POST",
        mode: "same-origin",
        body: JSON.stringify(officer),
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
