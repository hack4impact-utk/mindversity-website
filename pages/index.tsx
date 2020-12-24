import { NextPage } from "next";
import Head from "next/head";
import Footer from "components/Footer";
import Header from "components/Header";
import MainInfo from "components/MainInfo";
import Partners from "components/Partners";
import HomeChapters from "components/HomeChapters";
import OfficerCarouselComp from "components/OfficerCarousel";
import { Officer, Chapter } from "utils/types";
import { getOfficers } from "server/actions/Officer";
import { getChapters } from "server/actions/Chapter";
import globals from "utils/globals";
import Custom404 from "pages/404";
import Loading from "components/Loading";
import { useRouter } from "next/router";

interface Props {
    officers: Officer[];
    chapters: Chapter[];
}

const Home: NextPage<Props> = ({ officers, chapters }) => {
    const router = useRouter();
    if (router.isFallback) {
        return <Loading />;
    }

    if (!officers || !chapters) {
        return <Custom404 />;
    }

    return (
        <div className="container">
            <Head>
                <title>MindVersity - A peer mental health network.</title>
                <meta
                    name="description"
                    content="Mindversity is a peer mental health network that strives to bridge the gaps between access to mental health resources and students of color worldwide."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <MainInfo />
            <Partners />
            {
                <div className="bodyContent">
                    <div className="chapterOfficerParent bodySection">
                        <h2>Meet the National Board</h2>
                        <OfficerCarouselComp officers={officers} />
                    </div>
                </div>
            }
            <HomeChapters chapters={chapters} />
            <Footer />

            <style jsx>{`
                .container {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .chapterOfficerParent h2 {
                    position: relative;
                    display: block;
                    text-align: left;
                    font-size: 38px;
                    color: black;
                }

                .bodySection {
                    width: auto;
                    height: auto;
                    position: relative;
                    display: block;
                    padding: 20px 0px;
                }

                .bodyContent {
                    width: auto;
                    height: auto;
                    position: relative;
                    display: block;
                    padding: 60px;
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

export async function getStaticProps() {
    try {
        const officerQuery: Officer = { chapter: "national" };
        const officers: Officer[] = await getOfficers(officerQuery);

        // Get all chapters. Filter by region in component once user's location is retrieved.
        // Navigator is undefined in async getStaticProps(), so must do it in component.
        const chapters: Chapter[] = await getChapters({});

        return {
            props: {
                officers: JSON.parse(JSON.stringify(officers)),
                chapters: JSON.parse(JSON.stringify(chapters)),
            },
            revalidate: globals.revalidate.home,
        };
    } catch (error) {
        return {
            props: {},
            revalidate: globals.revalidate.home,
        };
    }
}

export default Home;
