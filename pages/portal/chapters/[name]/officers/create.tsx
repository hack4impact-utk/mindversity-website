import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { addOfficer } from "requests/Officer";
import { Officer, User } from "utils/types";
import urls from "utils/urls";
import Navigation from "components/Portal/Navigation";

const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const officer: Officer = await addOfficer(formData);
    //Return the user to the list of officers
    window.location.href = "../officers";
};

interface Props {
    admin: boolean;
}

const CreateOfficer: NextPage<Props> = ({ admin }) => {
    //Get the chapter that is associated with this officer
    const router = useRouter();
    const chapterName = router.query.name;

    return (
        <div className="container">
            <Head>
                <title>MindVersity | Admin Portal</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation admin={admin} />

            <div className="bodyContent">
                <h1>New Officer</h1>
                <div className="formContainer">
                    <form onSubmit={handleSubmit} method="post">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="Name" required />
                        <label htmlFor="role">Position</label>
                        <input type="text" name="role" placeholder="Position" required />
                        <label htmlFor="bio">Bio</label>
                        <textarea name="bio" placeholder="Bio" required></textarea>
                        <label htmlFor="campus">Picture</label>
                        <input type="file" name="picture" required />
                        {/* Hidden input type will store the chapter name from the url */}
                        <input type="hidden" name="chapter" value={chapterName} />
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

    const respJSON = (await resp.json()) as { success: boolean; payload: unknown };
    const user = (respJSON.payload as User) || null;
    const usersChapter = user?.role || null;

    if (resp.status === 401 && !context.req) {
        void Router.replace(`${urls.pages.portal.login}`);
        return { props: {} };
    }

    if ((resp.status === 401 && context.req) || (usersChapter != "admin" && usersChapter != "national")) {
        context.res?.writeHead(302, {
            Location: `${urls.baseUrl}`,
        });
        context.res?.end();
        return { props: {} };
    }

    return { props: { admin: usersChapter == "admin" || usersChapter == "national" } };
}

export default CreateOfficer;
