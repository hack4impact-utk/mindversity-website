import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { getChapters } from "server/actions/Chapter";
import { Chapter } from "utils/types";
import urls from "utils/urls";
import Navigation from "components/Portal/Navigation";
import ChapterCard from "components/Portal/ChapterCard";
import Router from "next/router";

interface Props {
    chapter: Chapter[];
}

const Chapters: NextPage<Props> = ({ chapter }) => {
    return (
        <div className="container">
            <Head>
                <title>MindVersity | Admin Portal</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation />

            <div className="bodyContent">
                <h1>Edit Chapters</h1>
                <div className="newChapterBtnParent">
                    <a href="chapters/create" className="newChapterBtn">
                        New Chapter
                    </a>
                </div>
                <div className="chaptersContainer">
                    {
                        //Display all of the chapters from the database
                        chapter &&
                            chapter.map((chap, i) => {
                                return <ChapterCard key={i} chap={chap} />;
                            })
                    }
                </div>
            </div>

            <style jsx>{`
                .container {
                    padding-top: 50px;
                    text-align: left;
                }

                @media screen and (min-width: 1000px) {
                    .bodyContent {
                        width: auto;
                        height: auto;
                        position: relative;
                        display: body;
                        margin-left: 375px;
                    }
                }

                h1 {
                    color: black;
                    padding: 0px 40px;
                }

                .newChapterBtnParent {
                    width: auto;
                    height: auto;
                    position: relative;
                    display: block;
                    text-align: left;
                    padding: 0px 40px;
                    margin-bottom: 20px;
                }

                .newChapterBtn {
                    height: auto;
                    width: auto;
                    padding: 10px 40px;
                    position: relative;
                    display: inline-block;
                    border: none;
                    font-size: 16px;
                    margin-top: 20px;
                    outline: none;
                    border-radius: 6px;
                    background-color: #8c69aa;
                    color: white;
                    text-decoration: none;
                    transition: background 0.5s ease;
                }

                .newChapterBtn:hover {
                    cursor: pointer;
                    background-color: #b59ccc;
                }

                .chaptersContainer {
                    width: 100%;
                    height: auto;
                    position: relative;
                    display: block;
                    padding: 20px 40px;
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
export async function getServerSideProps(context: NextPageContext) {
    const cookie = context.req?.headers.cookie;

    const resp = await fetch(`${urls.baseUrl}${urls.api.admin.validateLogin}`, {
        headers: {
            cookie: cookie!,
        },
    });

    if (resp.status === 401 && !context.req) {
        void Router.replace(`${urls.pages.portal.login}`);
        return { props: {} };
    }

    if (resp.status === 401 && context.req) {
        context.res?.writeHead(302, {
            Location: `${urls.baseUrl}`,
        });
        context.res?.end();
        return { props: {} };
    }

    //Query to get all of the chapters
    const chapterQuery: Chapter = new Object();
    const chapters: Chapter[] = await getChapters(chapterQuery);

    //Return an array of the chapters
    return { props: { chapter: JSON.parse(JSON.stringify(chapters)) as Chapter[] } };
}

export default Chapters;
