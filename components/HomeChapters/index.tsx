import React from "react";
import style from "./style.module.scss";
import { Chapter } from "utils/types";
import { getRegion } from "utils/helpers";

interface Props {
  chapters: Chapter[];
}

const HomeChapters: React.FC<Props> = ({ chapters }) => {
  const [region, setRegion] = React.useState("unknown");

  // If allowed, get user's coordinates to pinpoint region.
  React.useEffect(() => {
    if (navigator)
    {
      navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
        const [lat, long] = [pos.coords.latitude, pos.coords.longitude];
        setRegion(getRegion(lat, long));
      });
    }
  });

  // Returns "card" element for each chapter in region.
  const chaptersCards = chapters.filter((chapter) => chapter.region == region).map((chapter) => {
    // Format chapter name to remove underscores.
    var name = chapter.name?.replace(/_/g, " ");

    // Get campus' picture if exists. If not, use default color.
    var picURL, cardStyle;
    if (chapter.campusPic?.url)
    {
      picURL = chapter.campusPic.url
    } else
    {
      cardStyle = { backgroundColor: 'rgba(234,224,241,1.0)' }
    }

    // Chapter card elements.
    return (
      <a href={"chapters/" + chapter.name} className={style.card} key={JSON.stringify(chapter._id)}>
        <div className={style.cardOverlay} style={cardStyle}>
          <div className={style.cardText}>{name}</div>
        </div>
        <img
          src={picURL}
          className={style.cardImage}
          alt={name}
        ></img>
      </a>
    );
  });
  
  return (
    <div className={style.parentContainer}>
      <h2 className={style.title}>Chapters In Your Region</h2>
      <div className={style.cardWrapper}>
        { chapters.filter((chapter) => chapter.region == region).length != 0
          ? chaptersCards
          : <h2>We were not able to locate any chapters in your region!</h2>
          // If above message appears, no chapters in region or geolocation disabled.
        }
      </div>
      <a href="chapters" className={style.exploreBtn}>
        Explore All
      </a>
    </div>
  );
};

export default HomeChapters;
