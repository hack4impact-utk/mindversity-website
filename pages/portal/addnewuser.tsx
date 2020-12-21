import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Navigation from "components/Portal/Navigation";
import urls from "utils/urls";
import Router from "next/router";
import { Chapter, User } from "utils/types";
import { FormEvent, useRef, useState } from "react";
import { getChapters } from "server/actions/Chapter";

interface Props {
    chapters: Chapter[];
}

const NewUser: NextPage<Props> = ({ chapters }) => {
    const [validEmail, setValidEmail] = useState(true);
    const emailEle = useRef<HTMLInputElement>(null);
    const passwordEle = useRef<HTMLInputElement>(null);
    const chapterEle = useRef<HTMLSelectElement>(null);

    const cleanName = (name: string | undefined) => {
        if (name == undefined) return;
        return name.replace(/_/g, " ");
    };

    const emailIsValid = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!emailIsValid(emailEle.current?.value as string)) {
            setValidEmail(false);
            return;
        }

        setValidEmail(true);

        const chagedResource: User = {
            email: emailEle.current?.value,
            password: passwordEle.current?.value,
            role: chapterEle.current?.value,
        };

        const response = await fetch(`${urls.baseUrl}${urls.api.admin.signup}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(chagedResource),
        });

        void Router.push("/portal/dashboard");
    };

    return (
        <div className="container">
            <Head>
                <title>MindVersity | Admin Portal</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation admin={true} />

            <div className="bodyContent">
                <div className="formContainer">
                    <form onSubmit={handleSubmit} method="post">
                        <label htmlFor="email">Email</label>
                        {validEmail || <p className="invalidEmailText">Invalid Email Address</p>}
                        <input ref={emailEle} type="text" name="email" placeholder="Email" />
                        <label htmlFor="password">Password</label>
                        <input ref={passwordEle} type="text" name="password" placeholder="password" />
                        <label htmlFor="chapter">Chapter</label>
                        <select ref={chapterEle} name="chapter" id="chapterChoice">
                            {chapters.map((chap, i) => {
                                return (
                                    <option key={i} value={chap.name}>
                                        {cleanName(chap.name)}
                                    </option>
                                );
                            })}
                        </select>

                        <input type="submit" value="Add" className="submitInput" />
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
                textarea {
                    height: auto;
                    width: 75%;
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

                .invalidEmailText {
                    margin-top: 10px;
                    margin-bottom: 5px;
                    font-size: 14px;
                    text-align: left;
                    color: #714b92;
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

    const jsonRes = (await resp.json()) as { success: boolean; payload: unknown };
    const user = (jsonRes.payload as User) || null;
    const chapter = user?.role || null;

    if ((resp.status === 401 && context.req) || (chapter != "admin" && chapter != "national")) {
        context.res?.writeHead(302, {
            Location: `${urls.baseUrl}`,
        });
        context.res?.end();
        return { props: {} };
    }

    const chapters = await getChapters({});

    return { props: { chapters: JSON.parse(JSON.stringify(chapters)) as Chapter[] } };
}

export default NewUser;
