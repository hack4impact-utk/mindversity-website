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
  return (
    <a href={"/chapters/" + chap.name}>
      <div className={style.chapterCard}>
        <div className={style.chapterCardImage}>
          {/* TODO: Replace src with actual pictures from contentful */}
          <img src={picUrl} alt=""/>
        </div>
        <div className={style.chapterCardTitle}>
          <span className={style.chapterName}>{cleanName}</span>
        </div>
      </div>
    </a>
  );
};

export default ChapterComp;
