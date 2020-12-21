import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Router from "next/router";
import Header from "components/Header";
import Footer from "components/Footer";
import { useState, useRef, FormEvent } from "react";
import urls from "utils/urls";

const Home: NextPage = () => {
    const userEmail = useRef<HTMLInputElement>(null);
    const userPassword = useRef<HTMLInputElement>(null);

    const [failedLogin, setFailed] = useState(false);

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch(`${urls.baseUrl}${urls.api.admin.login}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userEmail.current?.value,
                password: userPassword.current?.value,
            }),
        });

        const responseJson = (await response.json()) as { success: boolean; payload: never };

        if (responseJson?.success) {
            void Router.push("/portal/dashboard");
        } else {
            setFailed(true);
        }

        console.log(responseJson);
    };

    return (
        <div className="container">
            <Head>
                <title>Login | MindVersity</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main>
                <div className="loginWrapper">
                    <div className="loginContainer">
                        <h1>Log In</h1>
                        <form onSubmit={handleLogin} action="" method="post">
                            <div className="formLabel">Email</div>
                            <input
                                type="text"
                                className="textInput"
                                name=""
                                placeholder="username@email.com"
                                id=""
                                ref={userEmail}
                            />
                            <div className="formLabel">Password</div>
                            <input
                                type="password"
                                className="textInput"
                                name=""
                                placeholder="password"
                                id=""
                                ref={userPassword}
                            />
                            <p className="passwordResetText">
                                Forgot your password? <a href="/portal/password-reset">click here</a>.
                            </p>
                            {failedLogin && <p className="invalidPasswordText">Invalid Email or Password</p>}
                            <div className="submitInputParent">
                                <input type="submit" className="submitInput" value="Log In" />
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />

            <style jsx>{`
                main {
                    height: auto;
                    width: auto;
                    min-height: calc(100vh - 407px);
                    position: relative;
                    display: block;
                    background-color: #e0d0ee;
                    padding: 60px;
                }

                .formLabel {
                    padding-bottom: 5px;
                }

                h1 {
                    margin-top: 20px;
                    margin-bottom: 40px;
                    font-size: 34px;
                }

                .invalidPasswordText {
                    margin-top: 10px;
                    margin-bottom: 5px;
                    padding-left: 80px;
                    font-size: 14px;
                    color: #714b92;
                }

                .passwordResetText {
                    margin-top: 10px;
                    margin-bottom: 40px;
                    padding-left: 10px;
                    font-size: 14px;
                    color: #714b92;
                }

                .passwordResetText a {
                    color: #714b92;
                }

                .loginWrapper {
                    height: auto;
                    width: auto;
                    position: relative;
                    display: block;
                    background-color: rgba(255, 255, 255, 0);
                    z-index: 100;
                    text-align: center;
                    overflow: auto;
                }

                @media screen and (min-width: 575px) {
                    .loginContainer {
                        height: auto;
                        width: 400px;
                        position: relative;
                        display: inline-block;
                        background-color: white;
                        padding: 10px 40px 40px 40px;
                        text-align: left;
                        border-radius: 15px;
                    }
                }

                @media screen and (max-width: 575px) {
                    .loginContainer {
                        height: auto;
                        width: auto;
                        position: relative;
                        display: inline-block;
                        background-color: white;
                        padding: 10px 40px 40px 40px;
                        text-align: left;
                        border-radius: 15px;
                    }
                }

                .textInput {
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
                }

                .submitInputParent {
                    width: auto;
                    height: auto;
                    position: relative;
                    display: block;
                    text-align: center;
                }

                .submitInput {
                    height: auto;
                    width: auto;
                    padding: 10px 40px;
                    position: relative;
                    display: inline-block;
                    border: none;
                    font-size: 16px;
                    margin-top: 20px;
                    outline: none;
                    border-radius: 15px;
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

    if (resp.status === 200 && context.req) {
        context.res?.writeHead(302, {
            Location: `${urls.baseUrl}${urls.pages.portal.dashboard}`,
        });
        context.res?.end();
        return { props: {} };
    }

    return { props: {} };
}

export default Home;
