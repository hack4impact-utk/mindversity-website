import React from "react";
import { Chapter } from "utils/types";
import style from "./chaptercard.module.scss";

const NationalChapterComp: React.FC = () => {
    return (
        <div className={style.chapterCard}>
            <div className={style.chapterCardText}>
                <div className={style.chapterCardTitle}>
                    <div className={style.chapterName}>National</div>
                </div>
            </div>
            <div className={style.chapterCardBtn}>
                <a className={style.editChapterBtn} href={"chapters/national/officers"}>
                    Edit Officers
                </a>
            </div>
        </div>
    );
};

export default NationalChapterComp;
