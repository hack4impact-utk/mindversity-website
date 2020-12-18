// these functions call the /pages/api/... endpoints
import fetch from "isomorphic-unfetch";
import { ContentfulImage, JournalEntry } from 'utils/types';

// assuming we only want to show reviewed entries by default
export const getEntries = () =>
  fetch("http://localhost:3000/api/journal/getByReviewStatus?reviewed=true", {
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
      console.log(json.message);
    }

    return json.payload;
  });

export const getFakeEntries: JournalEntry[] = [
  {
    id: "1",
    title: "Awesome blog title",
    description: "Small but sweet description for this dope blog post.",
    category: "creative",
    image: { assetID: "", url: "" },
    dateCreated: new Date("11/22/2020").toDateString(),
    reviewed: true
  },
  {
    id: "2",
    title: "Awesome blog title",
    description: "Small but sweet description for this dope blog post.",
    category: "creative",
    image: { assetID: "", url: "" },
    dateCreated: new Date("11/22/2020").toDateString(),
    reviewed: true
  },
  {
    id: "3",
    title: "Awesome blog title",
    description: "Small but sweet description for this dope blog post.",
    category: "creative",
    image: { assetID: "", url: "" },
    dateCreated: new Date("11/22/2020").toDateString(),
    reviewed: true
  },
  {
    id: "4",
    title: "Awesome blog title",
    description: "Small but sweet description for this dope blog post.",
    category: "creative",
    image: { assetID: "", url: "" },
    dateCreated: new Date("11/22/2020").toDateString(),
    reviewed: true
  },
  {
    id: "",
    title: "Awesome blog title",
    description: "Small but sweet description for this dope blog post.",
    category: "resources",
    image: { assetID: "", url: "" },
    dateCreated: new Date("11/22/2020").toDateString(),
    reviewed: true
  },
  {
    id: "6",
    title: "Awesome blog title",
    description: "Small but sweet description for this dope blog post.",
    category: "creative",
    image: { assetID: "", url: "" },
    dateCreated: new Date("11/22/2020").toDateString(),
    reviewed: true
  },
  {
    id: "7",
    title: "Awesome blog title",
    description: "Small but sweet description for this dope blog post.",
    category: "creative",
    image: { assetID: "", url: "" },
    dateCreated: new Date("11/22/2020").toDateString(),
    reviewed: true
  },
  {
    id: "8",
    title: "Awesome blog title",
    description: "Small but sweet description for this dope blog post.",
    category: "vent",
    image: { assetID: "", url: "" },
    dateCreated: new Date("11/22/2020").toDateString(),
    reviewed: true
  },
  {
    id: "9",
    title: "Awesome blog title",
    description: "Small but sweet description for this dope blog post.",
    category: "vent",
    image: { assetID: "", url: "" },
    dateCreated: new Date("11/22/2020").toDateString(),
    reviewed: true
  },
  {
    id: "10",
    title: "Awesome blog title",
    description: "Small but sweet description for this dope blog post.",
    category: "creative",
    image: { assetID: "", url: "" },
    dateCreated: new Date("11/22/2020").toDateString(),
    reviewed: true
  },
]

