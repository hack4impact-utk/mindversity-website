import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Header from "components/Header";
import Footer from "components/Footer";
import { Resource } from "utils/types";
import { getResources } from "server/actions/Resource";

interface Props {
    resources: Resource[];
}

const Resources: NextPage<Props> = ({ resources }) => {
    // Defines number of resources to display after "Load more" button is clicked.
    const COUNT_INCREMENT = 5;

    // Tracks how many resources of each category are currently displayed for "Load more" feature.
    const [nationalCount, setNationalCount] = useState(COUNT_INCREMENT);
    const [mindversityCount, setMindversityCount] = useState(COUNT_INCREMENT);
    const [helpCount, setHelpCount] = useState(COUNT_INCREMENT);

    // Gets certain number of links for a specified category.
    const getLinks = (category: string, count: number) => {
        const links: Array<Resource> = [];
        // Get "count" number of resources in "category."
        for (let i = 0; i < resources.length; i++) {
            if (resources[i].category == category || (category == "national" && !resources[i].category)) {
                // If specified category matches that of resource, append to its list.
                // Also, by default, place resources with no category in the national list.
                links.push(resources[i]);
            }

            // Once the number of appended resources matches that of how many should be loaded, stop appending.
            if (links.length == count) break;
        }

        // Styling for links.
        const textStyle = {
            marginTop: "30px",
            fontSize: "24px",
            fontWeight: 500,
        };
        const linkStyle = {
            textDecoration: "none",
            color: "#000000",
        };

        // Links elements
        return links.map(link => (
            <p style={textStyle} key={category + (link.link as string)}>
                <a style={linkStyle} href={link.link}>
                    {link.name}
                </a>
            </p>
        ));
    };

    // Used to display certain number of "loaded" resources per category.
    const nationalLinks = getLinks("national", nationalCount);
    const mindversityLinks = getLinks("mindversity", mindversityCount);
    const helpLinks = getLinks("help", helpCount);

    return (
        <main className="container">
            <Head>
                <title>Resources | MindVersity</title>
            </Head>

            <Header />

            <div className="heroContainer">
                <div className="textContainer">
                    <h1>Resources</h1>
                    <p>Need help or want to discover something new? Use these links!</p>
                </div>
            </div>

            <div className="wrapper">
                <div className="contentContainer">
                    <div className="nationalResources">
                        <h2>National Resources</h2>
                        {nationalLinks.length != 0 ? (
                            nationalLinks
                        ) : (
                            <p>There are no resources currently. Check back again later!</p>
                        )}
                        {resources.filter(resource => resource.category == "national" || resource.category == null)
                            .length > nationalCount && (
                            <button onClick={() => setNationalCount(nationalCount + COUNT_INCREMENT)}>Load more</button>
                        )}
                    </div>
                    <div className="mindversityResources">
                        <h2>MindVersity Resources</h2>
                        {mindversityLinks.length != 0 ? (
                            mindversityLinks
                        ) : (
                            <p>There are no resources currently. Check back again later!</p>
                        )}
                        {resources.filter(resource => resource.category == "mindversity").length > mindversityCount && (
                            <button onClick={() => setMindversityCount(mindversityCount + COUNT_INCREMENT)}>
                                Load more
                            </button>
                        )}
                    </div>
                </div>
                <div className="immediateHelp">
                    <h2>Immediate Help Resources</h2>
                    {helpLinks.length != 0 ? (
                        helpLinks
                    ) : (
                        <p>There are no resources currently. Check back again later!</p>
                    )}
                    {resources.filter(resource => resource.category == "help").length > helpCount && (
                        <button onClick={() => setHelpCount(helpCount + COUNT_INCREMENT)}>Load more</button>
                    )}
                </div>
            </div>

            <Footer />

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
            <style jsx>{`
                .heroContainer {
                    width: 100%;
                    height: 30vh;
                    position: relative;
                    display: block;
                    text-align: center;
                    background: rgb(234, 224, 241);
                    margin: 0;
                    background: linear-gradient(90deg, rgba(234, 224, 241, 1) 0%, rgba(181, 156, 204, 1) 100%);
                }
                .textContainer {
                    position: relative;
                    display: block;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .textContainer > h1 {
                    color: #503e8c;
                    font-size: 41px;
                    padding: 0px 0px 20px 0px;
                    margin: 0;
                }
                .textContainer > p {
                    margin-top: 0px;
                    position: relative;
                    display: block;
                    font-size: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    padding: 0 20px;
                }

                .wrapper {
                    display: grid;
                    grid-template-columns: 1fr min-content;
                    margin: 40px 0;
                }
                .contentContainer {
                    margin-left: 6vw;
                }
                .nationalResources {
                    padding: 20px 20px;
                }
                .mindversityResources {
                    margin-top: 30px;
                    padding: 20px 20px;
                }
                .immediateHelp {
                    width: 350px;
                    background-color: #e7d8f2;
                    margin-right: 4.5vw;
                    padding: 20px 20px;
                }

                .wrapper h2 {
                    color: #503e8c;
                    font-size: 28px;
                    font-weight: bold;
                }
                .wrapper p {
                    font-size: 24px;
                    font-weight: normal;
                }

                .wrapper button {
                    font-size: 20px;
                    margin-top: 10px;
                    padding: 10px 30px;
                    background-color: #8c69aa;
                    color: #ffffff;
                    border-radius: 15px;
                    border: none;
                    text-decoration: none;
                    transition: background-color 0.5s;
                }
                .wrapper button:hover {
                    cursor: pointer;
                    background-color: #503e8c;
                }
                .wrapper button:focus {
                    outline: none;
                }

                @media screen and (max-width: 860px) {
                    .wrapper {
                        grid-template-columns: none;
                    }
                    .contentContainer {
                        order: 2;
                    }
                    .immediateHelp {
                        order: 1;
                        width: auto;
                        margin: 0 6vw 30px 6vw;
                    }
                }
            `}</style>
        </main>
    );
};

export async function getStaticProps() {
    // Get all resources, divide into categories later.
    const resources: Resource[] = await getResources({ chapter: "national" });

    return {
        props: {
            resources: JSON.parse(JSON.stringify(resources)) as Resource[],
        },
    };
}

export default Resources;
