import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import urls from "utils/urls";

interface resetFormData {
    email: string;
    resetKey: string;
}

const Home: NextPage = () => {
    const router = useRouter();

    const fData: resetFormData = {
        email: router.query.email as string,
        resetKey: router.query.key as string,
    };

    const [newPassword, changeNewPassword] = useState("");
    const [verifyPassword, changeVerifyPassword] = useState("");

    const onChangenp = (event: ChangeEvent<HTMLInputElement>) => {
        changeNewPassword(event.target.value);
    };

    const onChangevp = (event: ChangeEvent<HTMLInputElement>) => {
        changeVerifyPassword(event.target.value);
    };

    const onSubmission = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newPassword != verifyPassword) {
            alert("Passwords Don't Match");
            return;
        }

        const obj = {
            email: fData.email,
            resetKey: fData.resetKey,
            newPassword: newPassword,
        };
        void fetch(urls.api.admin.resetPass, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
    };

    return (
        <div className="container">
            <Head>
                <title>Password Reset | MindVersity</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="loginWrapper">
                    <div className="loginContainer">
                        <a href="/">
                            <img
                                src="mindversity-logo.png"
                                alt="MindVersity Logo"
                            ></img>
                        </a>
                        <h1>Create Password</h1>
                        <p>Create a new password below.</p>
                        <form onSubmit={onSubmission} action="" method="post">
                            <input
                                type="text"
                                className="textInput"
                                name="newPass"
                                placeholder="New Password"
                                id=""
                                onChange={onChangenp}
                            />
                            <input
                                type="text"
                                className="textInput"
                                name="verifyPass"
                                placeholder="Verify Password"
                                id=""
                                onChange={onChangevp}
                            />
                            <input
                                type="submit"
                                className="submitInput"
                                value="Reset Password"
                            />
                        </form>
                        <p>
                            <a href="login">Return to Log In</a>
                        </p>
                    </div>
                </div>
            </main>

            <style jsx>{`
                main {
                    height: 100vh;
                    width: auto;
                    position: relative;
                    display: block;
                    background-image: url("login/background.jpeg");
                }

                .loginWrapper {
                    height: auto;
                    width: auto;
                    position: fixed;
                    display: block;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background-color: rgba(255, 255, 255, 0);
                    z-index: 100;
                    text-align: center;
                }

                @media screen and (min-height: 500px) {
                    .loginContainer {
                        height: auto;
                        width: 400px;
                        position: relative;
                        display: inline-block;
                        background-color: #1e315c;
                        color: white;
                        padding: 10px 40px;
                        text-align: center;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }

                @media screen and (max-height: 500px) {
                    .loginContainer {
                        height: auto;
                        width: 400px;
                        position: relative;
                        display: inline-block;
                        background-color: #1e315c;
                        color: white;
                        padding: 10px 40px;
                        margin: 20px 0px;
                        text-align: center;
                    }
                }

                .textInput {
                    height: auto;
                    width: 100%;
                    padding: 15px 20px;
                    position: relative;
                    display: block;
                    border: none;
                    font-size: 16px;
                    margin-bottom: 15px;
                    outline: none;
                    border-radius: 500px;
                    background-color: #eae0f1;
                }

                .submitInput {
                    height: auto;
                    width: 100%;
                    padding: 15px;
                    position: relative;
                    display: block;
                    border: none;
                    font-size: 16px;
                    margin-top: 20px;
                    outline: none;
                    border-radius: 500px;
                    background-color: #05b2dc;
                    color: white;
                    transition: background 0.5s ease;
                }

                .submitInput:hover {
                    cursor: pointer;
                    background-color: #6be9fa;
                }

                p a {
                    color: white;
                }

                h1 {
                    margin-top: 20px;
                    margin-bottom: 20px;
                }

                img {
                    max-height: 100px;
                    margin-top: 20px;
                    width: auto;
                }

                p {
                    margin-top: 20px;
                    margin-bottom: 20px;
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
};

export default Home;
