import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { addChapter } from "requests/Chapter";
import { Chapter } from "utils/types";
import urls from "utils/urls";
import Navigation from "components/Portal/Navigation";
import Router from "next/router";
import { FormEvent } from "react";

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const chapter: Chapter = (await addChapter(formData)) as Chapter;
    //After submitting the form send the user to the chapter edit page
    const chapterName = String(formData.get("name"));
    window.location.href = chapterName?.replace(/ /g, "_");
};

const Chapters: NextPage = () => {
    return (
        <div className="container">
            <Head>
                <title>MindVersity | Admin Portal</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation />

            <div className="bodyContent">
                <h1>New Chapter</h1>
                <div className="formContainer">
                    <form onSubmit={handleSubmit} method="post">
                        <label htmlFor="name">Chapter Name</label>
                        <input type="text" name="name" placeholder="Chapter Name" required />
                        <label htmlFor="region">Region</label>
                        <select name="region" id="">
                            <option value="northeast">Northeast</option>
                            <option value="south">South</option>
                            <option value="west">West</option>
                            <option value="midwest">Midwest</option>
                        </select>
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" placeholder="City" />
                        <label htmlFor="state">State</label>
                        <input type="text" name="state" placeholder="State" />
                        <label htmlFor="description">Description</label>
                        <textarea name="description" placeholder="Description"></textarea>
                        <label htmlFor="campus">Campus Picture</label>
                        <input type="file" name="campus" required />
                        <label htmlFor="logo">Logo</label>
                        <input type="file" name="logo" required />
                        <input type="submit" value="Create" className="submitInput" />
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
                input[type="file"],
                select,
                textarea {
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
                }

                textarea {
                    min-height: 150px;
                    resize: vertical;
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

    return { props: {} };
}

export default Chapters;
