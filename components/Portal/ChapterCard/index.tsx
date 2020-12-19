import React from "react";
import { Chapter } from "utils/types";
import style from "./chaptercard.module.scss";
import Link from "next/link";
interface Props {
    chap: Chapter;
}

const ChapterComp: React.FC<Props> = ({ chap }) => {
    //Remove the underscores from the chapter name
    const cleanName = chap.name?.replace(/_/g, " ");
    //Only display location if the city and state exist in the db
    let location;
    if (chap.city && chap.state) {
        location = chap.city + ", " + chap.state;
    }
    return (
        <div className={style.chapterCard}>
            <div className={style.chapterCardText}>
                <div className={style.chapterCardTitle}>
                    <div className={style.chapterName}>{cleanName}</div>
                    <div className={style.chapterLocation}>{location}</div>
                </div>
            </div>
            <div className={style.chapterCardBtn}>
                <Link href={`/portal/journal/chapters/${chap.name as string}`}>
                    <span className={style.editChapterBtn}>Edit</span>
                </Link>
            </div>
        </div>
    );
};

export default ChapterComp;
