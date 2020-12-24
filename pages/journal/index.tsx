import { NextPage, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Header from "components/Header";
import BlogPostThumbnail from "components/Journal/BlogPostThumbnail";
import Footer from "components/Footer";
import { JournalEntry } from "utils/types";
import { ChangeEvent, useState } from "react";
import { getJournalEntryByType } from "server/actions/Contentful";
import globals from "utils/globals";
import Custom404 from "pages/404";
import Loading from 'components/Loading';

const ITEMS_PER_PAGE = 6;

interface Props {
    journalEntries: JournalEntry[];
}

const JournalPage: NextPage<Props> = ({ journalEntries }) => {
    const router = useRouter();
    // var selectedPosts = journalEntries.filter((post) => post.category == journalType)

    // generates paginated array based on ITEMS_PER_PAGE
    // this uses frontend resources so it may be better to
    // have this be implemented on the backend
    const [page, setPage] = useState(0);
    const [category, setCategory] = useState("");

    let tempEntries: JournalEntry[][];

    let tmp: JournalEntry[] = [];
    tempEntries = [];
    for (let i = 0; i < journalEntries.length; i++) {
        if ((i + 1) % (ITEMS_PER_PAGE + 1) === 0) {
            tempEntries.push(tmp);
            tmp = [journalEntries[i]];
        } else {
            tmp.push(journalEntries[i]);
        }
    }
    if (tmp.length > 0) tempEntries.push(tmp);

    const [paginatedEntries, setPagedEntries] = useState<JournalEntry[][]>(tempEntries);
    tempEntries = [];

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value);
        let list: JournalEntry[];
        if (e.currentTarget.value == "") list = journalEntries;
        else list = journalEntries.filter(entry => entry.category == e.currentTarget.value);

        let tmp: JournalEntry[] = [];
        tempEntries = [];
        for (let i = 0; i < list.length; i++) {
            if ((i + 1) % (ITEMS_PER_PAGE + 1) === 0) {
                tempEntries.push(tmp);
                tmp = [list[i]];
            } else {
                tmp.push(list[i]);
            }
        }
        if (tmp.length > 0) tempEntries.push(tmp);

        setPagedEntries(tempEntries);
    };


    if (router.isFallback) {
        return <Loading />;
    }

    if (!journalEntries) {
        return <Custom404 />;
    }

    return (
        <main className="container">
            <Head>
                <title>Journal | MindVersity</title>
            </Head>
            <Header />

            <div className="heroContainer">
                <div className="heroOverlay">
                    <div className="textContainer">
                        <h1>Journal</h1>
                    </div>
                </div>
            </div>

            <div className="btnRow">
                <Link href="/journal/create">
                    <span className="createBtn">Create a New Journal Entry</span>
                </Link>
                <select className="dropdown" defaultValue={category} onChange={handleCategoryChange}>
                    <option value="">All</option>
                    <option value="resources">Resources</option>
                    <option value="creative-space"> Creative Space</option>
                    <option value="vent-place">Vent Place</option>
                </select>
            </div>

            <div className="thumbnailContainer">
                {paginatedEntries.length > 0 &&
                    paginatedEntries[page].map((post, index) => (
                        <a href={`/journal/${post.id as string}`} key={post.id}>
                            <BlogPostThumbnail post={post} />
                        </a>
                    ))}
            </div>
            <div className="pagination">
                {paginatedEntries.map((n, i) => (
                    <a key={i} className={page === i ? "active" : ""} onClick={() => setPage(i)}>
                        {i + 1}
                    </a>
                ))}
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
                .heroContainer {
                    width: 100%;
                    height: 30vh;
                    position: relative;
                    background: rgb(234, 224, 241);
                    background: linear-gradient(90deg, rgba(234, 224, 241, 1) 0%, rgba(181, 156, 204, 1) 100%);
                }

                .heroOverlay {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 2;
                    background-color: rgba(215, 215, 215, 0.3);
                }

                .textContainer {
                    position: relative;
                    display: block;
                    top: 40%;
                    transform: translateY(-40%);
                    padding: 0px 40px;
                    text-align: center;
                }
                .textContainer > h1 {
                    position: relative;
                    display: block;
                    color: #503e8c;
                    font-size: 46px;
                    font-weight: bold;
                    padding-bottom: 0px;
                    margin-bottom: 0px;
                    text-align: center;
                }

                .textContainer > p {
                    margin-top: 0px;
                    position: relative;
                    display: block;
                    font-size: 18px;
                    top: 50%;
                    transform: translateY(-50%);
                    padding: 0 20px;
                }
                h2 {
                    color: #503e8c;
                    font-size: 28px;
                    font-weight: normal;
                }
                .contentContainer {
                    width: 80vw;
                    position: relative;
                    margin-left: -40vw;
                    left: 50%;
                    display: flex;
                    justify-content: space-between;
                }
                .btnRow {
                    width: 80%;
                    position: relative;
                    left: 50%;
                    margin: 50px 0 50px 0;
                    margin-left: -40%;
                    display: flex;
                    justify-content: flex-end;
                }
                .thumbnailContainer {
                    width: 70%;
                    position: relative;
                    left: 50%;
                    margin-left: -35%;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, 400px);
                    grid-gap: 1rem;
                    justify-content: center;
                    margin-bottom: 50px;
                }
                a {
                    text-decoration: inherit;
                    color: inherit;
                }
                .pagination {
                    width: 70%;
                    margin: 20px 0 20px -35%;
                    left: 50%;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: baseline;
                    font-size: 20px;
                }

                .pagination a {
                    margin: 10px;
                    cursor: pointer;
                }

                .pagination > a:hover {
                    text-decoration: underline;
                }

                a.active {
                    font-size: 25px;
                    color: #8c69aa;
                    cursor: default;
                }

                a.active:hover {
                    text-decoration: none;
                }

                .createBtn {
                    margin-right: auto;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    background: #8c69aa;
                    padding: 10px 20px 10px 20px;
                    text-align: center;
                    border-radius: 15px;
                    font-weight: bold;
                    color: white;
                    cursor: pointer;
                    transition: 0.3s ease;
                }
                .createBtn:hover {
                    filter: brightness(1.2);
                    transform: translateY(-2px);
                }

                .dropdown {
                    background-color: #8c69aa;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
                        Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                    border: none;
                    padding: 10px 50px 10px 20px;
                    font-size: 1em;
                    border-radius: 15px;
                    font-weight: bold;
                    line-height: inherit;
                    outline: none;
                    color: white;
                }

                @media only screen and (max-width: 999px) {
                    .btnRow {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .createBtn {
                        margin: 10px;
                    }
                }

                @media only screen and (min-width: 1200px) {
                    .thumbnailContainer {
                        justify-content: space-between;
                    }
                }
            `}</style>
        </main>
    );
};

export async function getStaticProps(context: GetStaticPropsContext) {
    try{
        const data = await getJournalEntryByType("");
        return {
            props: {
                journalEntries: data,
            },
            revalidate: globals.revalidate.journal,
        };
    } catch (error) {
        return {
            props: {},
            revalidate: globals.revalidate.journal,
        };
    }
}

export default JournalPage;
