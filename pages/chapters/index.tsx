import Footer from "components/Footer";
import Header from "components/Header";
import ChapterCard from "components/ChapterCard";
import { getChapters } from "server/actions/Chapter";
import { Chapter } from "utils/types";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import errors from "utils/errors";
import globals from "utils/globals";

// When routing here we have a chapter name we can get from the url name
// We can get that param with useRouter(), but its also given in the context

interface Props {
    chapter: Chapter[];
}

const ChapterPage: NextPage<Props> = ({ chapter }) => {
    return (
        <div>
            <Head>
                <title>Chapters | MindVersity | A peer mental health network.</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Header />

                <div className="hero">
                    <div className="heroOverlay">
                        <div className="heroText">
                            <h1>Our Chapters</h1>
                        </div>
                    </div>
                </div>

                <div className="chapterParent">
                    {
                        //Display all of the chapters from the database
                        chapter &&
                            chapter.map((chap, i) => {
                                return <ChapterCard key={i} chap={chap}></ChapterCard>;
                            })
                    }
                </div>

                <Footer />
            </main>

            <style jsx>{`
                .wrapper {
                    min-height: auto;
                    padding-bottom: 40px;
                }

                .hero {
                    width: 100%;
                    height: 30vh;
                    position: relative;
                    background: rgb(234, 224, 241);
                    background: linear-gradient(90deg, rgba(234, 224, 241, 1) 0%, rgba(181, 156, 204, 1) 100%);
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
                    background-color: rgba(215, 215, 215, 0.3);
                }

                .heroText {
                    position: relative;
                    display: block;
                    top: 40%;
                    transform: translateY(-40%);
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
                    text-align: center;
                }

                .chapterParent {
                    height: auto;
                    width: auto;
                    padding: 20px;
                    text-align: center;
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

//Get all of the chapters
export async function getStaticProps(context: NextPageContext) {
    //Query to get all of the chapters
    const chapterQuery: Chapter = new Object();
    const chapters: Chapter[] = await getChapters(chapterQuery);
    //Return an array of the chapters
    return {
        props: {
            chapter: JSON.parse(JSON.stringify(chapters)) as Chapter[],
        },
        revalidate: globals.revalidate.chapter,
    };
}

export default ChapterPage;
