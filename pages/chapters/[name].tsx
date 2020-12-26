import Header from "components/Header";
import Footer from "components/Footer";
import OfficerCarouselComp from "components/OfficerCarousel";
import { getChapters } from "server/actions/Chapter";
import { getOfficers } from "server/actions/Officer";
import { getResources } from "server/actions/Resource";
import { Chapter, Officer, Resource } from "utils/types";
import { GetStaticPropsContext, NextPage } from "next";
import { FaMapMarkerAlt } from "react-icons/fa";
import errors from "utils/errors";
import Head from "next/head";
import globals from "utils/globals";
import { useRouter } from "next/router";
import Custom404 from "pages/404";
import Loading from "components/Loading";

// When routing here we have a chapter name we can get from the url name
// We can get that param with useRouter(), but its also given in the context

interface Props {
    chapter: Chapter;
    officers: Officer[];
    resources: Resource[];
}

const ChapterPage: NextPage<Props> = ({ chapter, officers, resources }) => {
    const router = useRouter();
    if (router.isFallback) {
        return <Loading />;
    }

    if (!chapter) {
        return <Custom404 />;
    }

    //Replace any underscores in the chapter name with spaces
    const cleanName = chapter.name?.replace(/_/g, " ");
    //Make the first letter of the region name capital

    let heroStyle;
    if (chapter.campusPic?.url) {
        //Add the background image to the style if the url exists in the db
        heroStyle = {
            backgroundImage: "url(" + chapter.campusPic.url + ")",
        };
    } else {
        //Use placeholder gradient if no background image url exists in the db
        heroStyle = {
            backgroundImage: "linear-gradient(90deg, rgba(234,224,241,1) 0%, rgba(181,156,204,1) 100%)",
        };
    }

    return (
        <div>
            <Head>
                <title>{cleanName} Chapter | MindVersity - A peer mental health network.</title>
                <meta
                    name="description"
                    content={
                        chapter
                            ? `${chapter.description?.substring(0, 157).concat("...")}`
                            : "A chapter at MindVersity."
                    }
                />
                <link rel="icon" href="../favicon.ico" />
            </Head>

            <Header />

            <div className="hero" style={heroStyle}>
                <div className="heroOverlay">
                    <div className="heroText">
                        <h1>{cleanName}</h1>
                        <h2>
                            <FaMapMarkerAlt className="locationIcon" /> {chapter.city}, {chapter.state}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="bodyContent">
                <div className="bodySection">
                    <div className="topContentBox">
                        <div className="aboutTextParent topContentBox-child">
                            <h2>About</h2>
                            <p className="aboutText">{chapter.description}</p>
                        </div>
                        {resources.length > 0 && (
                            <div className="topContentBox-child">
                                <h2>Chapter Specific Resources</h2>
                                {resources.map((reso, i) => {
                                    return (
                                        <p className="resourceTextStyle" key={i}>
                                            <a className="resourceLinkStyle" href={reso.link}>
                                                {reso.name}
                                            </a>
                                        </p>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {officers.length > 0 && (
                    <div className="chapterOfficerParent bodySection">
                        <h2>Meet the Team</h2>
                        <OfficerCarouselComp officers={officers} />
                    </div>
                )}
            </div>

            <Footer />

            <style jsx>{`
                .hero {
                    width: 100%;
                    height: 50vh;
                    position: relative;
                    background-image: url("journal-hero.jpeg");
                    background-size: cover;
                    background-position: center;
                }

                .heroOverlay {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 2;
                    background-color: rgba(215, 215, 215, 0.7);
                }

                .heroText {
                    position: relative;
                    display: block;
                    top: 50%;
                    transform: translateY(-50%);
                    padding: 0px 40px;
                    text-align: center;
                }

                h1 {
                    position: relative;
                    display: block;
                    color: #503e8c;
                    font-size: 46px;
                    font-weight: bold;
                    padding-bottom: 0px;
                    margin-bottom: 0px;
                }

                .heroText h2 {
                    font-weight: normal;
                    margin-top: 0;
                    padding-top: 20px;
                    padding-left: 40px;
                }

                .locationIcon {
                    color: #707070;
                }

                .bodyContent {
                    width: auto;
                    height: auto;
                    position: relative;
                    display: block;
                    padding: 60px;
                }

                .bodySection {
                    width: auto;
                    height: auto;
                    position: relative;
                    display: block;
                    padding: 20px 0px;
                }

                .aboutTextParent h2 {
                    position: relative;
                    display: block;
                    text-align: left;
                    font-size: 38px;
                    color: #707070;
                }

                @media screen and (min-width: 770px) {
                    .aboutText {
                        font-size: 20px;
                        color: #707070;
                        width: 80%;
                    }

                    .topContentBox-child {
                        flex: 1;
                    }
                }

                @media screen and (max-width: 770px) {
                    .aboutText {
                        font-size: 20px;
                        color: #707070;
                        width: 100%;
                    }

                    .topContentBox-child {
                        flex: 1 1 auto;
                    }
                }

                .chapterOfficerParent h2 {
                    position: relative;
                    display: block;
                    text-align: left;
                    font-size: 38px;
                    color: black;
                }

                .topContentBox {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                }

                .resourceTextStyle {
                    margin-top: 30px;
                    font-size: 24px;
                    font-weight: 300;
                }

                .resourceLinkStyle {
                    text-decoration: none;
                    color: #000000;
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
                        Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
};

// This function cant be in child component, so we query the data and
// then pass it to the component. It's ran server-side
export async function getStaticProps(context: GetStaticPropsContext) {
    try {
        // query by the chapter's name
        const chapterQuery: Chapter = new Object();
        chapterQuery.name = context.params?.name as string;

        let chapter: Chapter = new Object();
        const chapters: Chapter[] = await getChapters(chapterQuery);
        if (chapters.length === 1) {
            chapter = chapters[0];
        } else {
            // TODO route to an error page
            throw new Error(errors.GENERIC_ERROR);
        }

        const officerQuery: Officer = new Object();
        officerQuery.chapter = chapter.name;

        const officers: Officer[] = await getOfficers(officerQuery);
        if (!(officers.length > 0)) {
            // TODO route to an error page
            //throw new Error(errors.GENERIC_ERROR);
        }

        const resources = await getResources({ chapter: chapterQuery.name });

        return {
            props: {
                chapter: JSON.parse(JSON.stringify(chapter)) as Chapter,
                officers: JSON.parse(JSON.stringify(officers)) as Officer[],
                resources: JSON.parse(JSON.stringify(resources)) as Resource[],
            },
            revalidate: globals.revalidate.chapter,
        };
    } catch (error) {
        return {
            props: {},
            revalidate: globals.revalidate.chapter,
        };
    }
}

export async function getStaticPaths() {
    const chapters: Chapter[] = await getChapters({});

    const paths = chapters.map(chapter => ({
        params: { name: chapter.name },
    }));

    return { paths, fallback: true };
}

export default ChapterPage;
