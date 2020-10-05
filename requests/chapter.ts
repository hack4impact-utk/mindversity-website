import { fetchRequestWithPayloadResponse } from "utils/util";
import { Chapter } from "utils/types";

export const getChapterByName = async (chapterName: string): Promise<Chapter> =>
  fetchRequestWithPayloadResponse<Chapter>("http://localhost:3000/api/getChapterByName", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ chapterName })
  });
