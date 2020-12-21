import React from "react";
import style from "./style.module.scss";
import { Chapter } from "utils/types";
import { getRegion } from "utils/helpers";

interface Props {
    chapters: Chapter[];
}

const HomeChapters: React.FC<Props> = ({ chapters }) => {
    const [region, setRegion] = React.useState("unknown");
    const [randomChapters, setChapters] = React.useState([] as Chapter[]);

    // If allowed, get user's coordinates to pinpoint region.
    React.useEffect(() => {
        if (navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos: GeolocationPosition) => {
                    const [lat, long] = [
                        pos.coords.latitude,
                        pos.coords.longitude,
                    ];
                    setRegion(getRegion(lat, long));
                }
            );
        }
    });

    // Used to select up to three randomized chapters after render.
    // Must include in useEffect or will get text content mismatch error.
    React.useEffect(() => {
        // Create array copy to manipulate values without changing chapters prop.
        const chaptersCopy: Chapter[] = chapters.slice();
        // Using "Fisher-Yates shuffle" for an unbiased algorithm (unlike the easier ".sort" method).
        for (let i = chaptersCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [chaptersCopy[i], chaptersCopy[j]] = [
                chaptersCopy[j],
                chaptersCopy[i],
            ];
        }

        // Since array randomized by shuffle, just select first three in array using ".slice".
        setChapters(chaptersCopy.slice(0, 3));
    }, []);

    // Creates "card" elements for specified chapter.
    // Used for both chapters in region and randomized chapters.
    const createCard = (chapter: Chapter) => {
        // Format chapter name to remove underscores.
        const name = chapter.name?.replace(/_/g, " ");

        // Get campus' picture if exists. If not, use default color.
        let picURL, cardStyle;
        if (chapter.campusPic?.url) {
            picURL = chapter.campusPic.url;
        } else {
            cardStyle = { backgroundColor: "rgba(234,224,241,1.0)" };
        }

        // Chapter card elements.
        return (
            <a
                href={`chapters/${chapter.name as string}`}
                className={style.card}
                key={JSON.stringify(chapter._id)}
            >
                <div className={style.cardOverlay} style={cardStyle}>
                    <div className={style.cardText}>{name}</div>
                </div>
                <img src={picURL} className={style.cardImage} alt={name}></img>
            </a>
        );
    };

    // Returns "card" element for each chapter in region.
    const chaptersCards = chapters
        .filter(chapter => chapter.region == region)
        .map(chapter => {
            return createCard(chapter);
        });

    // Returns "card" element for up to three random chapters.
    // Displayed if no chapters in region or geolocation disabled.
    const randomChapterCards = randomChapters.map(chapter => {
        return createCard(chapter);
    });

    return (
        <div className={style.parentContainer}>
            <h2 className={style.title}>
                {chapters.filter(chapter => chapter.region == region).length !=
                0
                    ? "Chapters In Your Region"
                    : "Our Chapters"}
            </h2>
            <div className={style.cardWrapper}>
                {chapters.filter(chapter => chapter.region == region).length !=
                0
                    ? chaptersCards
                    : randomChapterCards}
            </div>
            <a href="chapters" className={style.exploreBtn}>
                Explore All
            </a>
        </div>
    );
};

export default HomeChapters;
