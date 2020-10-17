// these functions call the /pages/api/... endpoints
import fetch from "isomorphic-unfetch";
import { Chapter } from 'utils/types'

export const getChapter = (chapter: Chapter) =>
  fetch("http://localhost:3000/api/chapter/getChapter", {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chapter)
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const addChapter = (chapter: Chapter) =>
    fetch("http://localhost:3000/api/chapter/addChapter", {
      method: "PUT",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chapter)
    })
      .then((response) => response.json())
      .then((json) => {
        if (json == null) {
          throw new Error("Could not connect to API!");
        } else if (!json.success) {
          throw new Error(json.message);
        }
  
        return json.payload;
      });
    

export const updateChapter = (chapter: Chapter) =>
  fetch("http://localhost:3000/api/chapter/updateChapter", {
    method: "PUT",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chapter)
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
