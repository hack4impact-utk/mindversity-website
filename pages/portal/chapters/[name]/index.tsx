import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { getChapters, updateChapter } from "requests/Chapter";
import { Chapter, User } from "utils/types";
import Router from "next/router";
import urls from "utils/urls";
import Navigation from "components/Portal/Navigation";

const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const chapter: Chapter = await updateChapter(formData);
    //After submitting the form send the user to the list of chapters
    window.location.href = "/portal/chapters";
};

interface Props {
    chapter: Chapter;
    admin: boolean;
}

const Chapters: NextPage<Props> = ({ chapter, admin }) => {
    const cleanName = chapter.name?.replace(/_/g, " ");

    return (
        <div className="container">
            <Head>
                <title>MindVersity | Admin Portal</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation admin={admin} />

            <div className="bodyContent">
                <h1>Edit {cleanName}</h1>
                <div className="formContainer">
                    <form method="post" onSubmit={handleSubmit}>
                        <label htmlFor="name">Chapter Name</label>
                        <input type="text" name="name" placeholder="Chapter Name" defaultValue={cleanName} required />
                        <label htmlFor="region">Region</label>
                        <select name="region" defaultValue={chapter.region}>
                            <option value="northeast">Northeast</option>
                            <option value="south">South</option>
                            <option value="west">West</option>
                            <option value="midwest">Midwest</option>
                        </select>
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" placeholder="City" defaultValue={chapter.city} />
                        <label htmlFor="state">State</label>
                        <input type="text" name="state" placeholder="State" defaultValue={chapter.state} />
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            placeholder="Description"
                            defaultValue={chapter.description}
                        ></textarea>
                        <label htmlFor="campus">Campus Picture</label>
                        <div className="inputContainer">
                            <img src={chapter.campusPic?.url}></img>
                            <input type="file" name="campus" />
                        </div>
                        <label htmlFor="logo">Logo</label>
                        <div className="inputContainer">
                            <img src={chapter.universityLogo?.url}></img>
                            <input type="file" name="logo" />
                        </div>
                        <input type="submit" value="Save" className="submitInput" />
                    </form>
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

                .formContainer {
                    width: 100%;
                    height: auto;
                    position: relative;
                    display: block;
                    padding: 20px 40px;
                    text-align: center;
                }

                input[type="text"],
                select,
                textarea,
                .inputContainer {
                    height: auto;
                    width: 100%;
                    padding: 10px 15px;
                    position: relative;
                    display: block;
                    border: none;
                    font-size: 16px;
                    margin-bottom: 15px;
                    outline: none;
                    border-radius: 5px;
                    background-color: #eae0f1;
                    font-family: inherit;
                    text-align: left;
                }

                .inputContainer {
                    padding: 20px;
                }

                input[type="file"] {
                    display: block;
                    padding-top: 10px;
                }

                textarea {
                    min-height: 150px;
                    resize: vertical;
                }

                img {
                    max-height: 250px;
                    max-width: 250px;
                }

                label {
                    display: block;
                    margin-bottom: 5px;
                    padding-left: 5px;
                    text-align: left;
                    font-size: 16px;
                }

                .submitInput {
                    height: auto;
                    width: auto;
                    padding: 10px 40px;
                    position: relative;
                    display: block;
                    border: none;
                    font-size: 16px;
                    margin-top: 40px;
                    outline: none;
                    border-radius: 6px;
                    background-color: #8c69aa;
                    color: white;
                    transition: background 0.5s ease;
                }

                .submitInput:hover {
                    cursor: pointer;
                    background-color: #b59ccc;
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

export async function getServerSideProps(context: NextPageContext) {
    const cookie = context.req?.headers.cookie;

    const resp = await fetch(`${urls.baseUrl}${urls.api.admin.validateLogin}`, {
        headers: {
            cookie: cookie!,
        },
    });

    const respJSON = (await resp.json()) as { success: boolean; payload: unknown };
    const user = (respJSON.payload as User) || null;
    const usersChapter = user?.role || null;

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

    if (usersChapter != context.query.name && usersChapter != "admin" && usersChapter != "national") {
        context.res?.writeHead(302, {
            Location: `${urls.baseUrl}`,
        });
        context.res?.end();
        return { props: {} };
    }

    const chapterQuery: Chapter = new Object();
    chapterQuery.name = context.query.name as string;

    let chapter: Chapter = new Object();

    const chapterInfo: Chapter[] = await getChapters(chapterQuery);

    if (chapterInfo.length == 1) {
        chapter = chapterInfo[0];
    }

    return {
        props: {
            chapter: chapter,
            admin: usersChapter == "admin" || usersChapter == "national",
        },
    };
}

export default Chapters;
