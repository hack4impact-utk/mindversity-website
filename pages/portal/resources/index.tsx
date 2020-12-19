import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { getResources } from "requests/Resource";
import { Resource } from 'utils/types';

import Navigation from "components/Portal/Navigation";
import ChapterCard from "components/Portal/ChapterCard";

interface Props {
    resource: Resource[];
}

const Resources: NextPage<Props> = ({resource}) => {
    return (
        <div className="container">
            <Head>
                <title>MindVersity | Admin Portal</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation />

            <div className="bodyContent">
                <h1>Edit Resources</h1>
                <div className="newResourceBtnParent">
                    <a href="resource/create" className="newResourceBtn">New Resource</a>
                </div>
                <div className="resourcesContainer">
                    {
                        resource && (
                            resource.map(reso => {
                                return (
                                    <p>{reso.name}</p>
                                )
                            })
                        )
                    }
                </div>
                
            </div>

            <style jsx>{`
                .container{
                    padding-top: 50px;
                    text-align: left;
                }

                @media screen and (min-width: 1000px){
                    .bodyContent{
                        width: auto;
                        height: auto;
                        position: relative;
                        display: body;
                        margin-left: 375px;
                    }
                }

                h1{
                    color: black;
                    padding: 0px 40px;
                }

                .newResourceBtnParent {
                    width: auto;
                    height: auto;
                    position: relative;
                    display: block;
                    text-align: left;
                    padding: 0px 40px;
                    margin-bottom: 20px;
                }

                .newResourceBtn {
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

                .newResourceBtn:hover {
                    cursor: pointer;
                    background-color: #b59ccc;
                }

                .resourcesContainer{
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

Resources.getInitialProps = async ( context: NextPageContext ) => {
    let resources: Resource[] = await getResources({})
    //Return an array of the chapters
    return {
        resource: resources
    }
}

export default Resources;
