// call the pages/api/... files
import fetch from "isomorphic-unfetch";

export const getChapterByName = (chapterName) =>
  fetch("http://localhost:3000/api/Chapter/byName/" + chapterName, {
    method: "GET",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
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
