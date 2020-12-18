import React from "react";
import { Chapter } from "utils/types";

interface Props {
    chapter: Chapter;
}

const ChapterComp: React.FC<Props> = ({ chapter }) => {
    return (
        <div>
            <p> chapter name: {chapter?.name} </p>
            <p> chapter region: {chapter.region} </p>
            <p> the whole chapter object: {JSON.stringify(chapter)} </p>
        </div>
    );
};

export default ChapterComp;
