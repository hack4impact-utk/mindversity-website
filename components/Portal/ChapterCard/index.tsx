import React from 'react'
import { Chapter } from 'utils/types'
import style from './chaptercard.module.scss';
import defaultPicture from './defaultpicture.png'

interface Props {
    chap: Chapter;
}

const ChapterComp: React.FC<Props> = ({ chap }) => {
    //Remove the underscores from the chapter name
    var cleanName = chap.name?.replace(/_/g, " ");
    //Check to see if the campus picture exits in the database
    var picUrl;
    if(chap.campusPic?.url){
        picUrl = chap.campusPic.url;
    }
    else{ //If it doesnt exist use the default picture
        picUrl = defaultPicture;
    }
    //Only display location if the city and state exist in the db
    var location;
    if(chap.city && chap.state){
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
                <a className={style.editChapterBtn} href={"chapters/" + chap.name}>Edit</a>
            </div>
        </div>
    );
};

export default ChapterComp;
