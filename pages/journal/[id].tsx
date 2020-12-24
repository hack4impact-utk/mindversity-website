import Header from "components/Header";
import Footer from "components/Footer";
import BlogPostThumbnail from "components/Journal/BlogPostThumbnail";
import { JournalEntry } from "utils/types";
import { GetStaticPropsContext, NextPage } from "next";
import errors from "utils/errors";
import Head from "next/head";
import { getJournalEntryById, getJournalEntryByType, getJournalEntriesByReviewStatus } from "server/actions/Contentful";
import { useRouter } from "next/router";
import globals from "utils/globals";

// When routing here we have a journal id we can get from the url name
// We can get that param with useRouter(), but its also given in the context

interface Props {
    post: JournalEntry;
    relatedEntries: JournalEntry[];
}

const JournalPostPage: NextPage<Props> = ({ post, relatedEntries }) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>No Post</div>;
    }

    return (
        <main className="container">
            <Head>
                <title>Journal | MindVersity</title>
            </Head>
            <Header />
            <div className="blogContainer">
                <h1 className="blogTitle">{post.title}</h1>
                <i className="datePublished">Published {post.dateCreated}</i>
                <img src={post.image?.url} alt="" style={{ width: "100%", marginTop: "30px" }} />
                <div className="blogContent" dangerouslySetInnerHTML={{ __html: post.body as string }}></div>
            </div>

            <hr
                style={{
                    width: "90%",
                    position: "relative",
                    margin: "50px 0 50px -45%",
                    left: "50%",
                    border: "1px solid #aaa",
                }}
            />

            <div className="relatedContainer">
                <h1 className="relatedTitle">Read Other Compelling Journals</h1>

                <div className="thumbnailGrid">
                    {relatedEntries &&
                        relatedEntries.map((post, index) => (
                            <a href={`/journal/${post.id as string}`} key={post.id}>
                                <BlogPostThumbnail post={post} />
                            </a>
                        ))}
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

                .blogContainer {
                    width: 90%;
                    margin-left: -45%;
                    left: 50%;
                    position: relative;
                    margin-bottom: 50px;
                    margin-top: 30px;
                }

                .blogTitle {
                    color: #8c69aa;
                    font-size: 36px;
                    margin-bottom: 10px;
                }

                .datePublished {
                    color: #999;
                    font-size: 17px;
                    margin-bottom: 30px;
                }

                .blogContent::first-letter {
                    font-size: 150%;
                    font-weight: bold;
                }

                .blogContent {
                    font-size: 18px;
                    margin: 50px 0;
                }

                .relatedContainer {
                    width: 90%;
                    margin-left: -45%;
                    position: relative;
                    left: 50%;
                }

                .relatedTitle {
                    font-size: 34px;
                    color: #707070;
                }

                .thumbnailGrid {
                    width: 100%;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, 400px);
                    justify-content: center;
                    grid-gap: 1rem;
                    margin-bottom: 50px;
                }

                a {
                    text-decoration: inherit;
                    color: inherit;
                }

                @media only screen and (min-width: 770px) {
                    .blogContainer {
                        width: 60%;
                        margin-left: 5%;
                        left: 0;
                    }
                    .thumbnailGrid {
                        justify-content: space-between;
                    }
                }

                @media only screen and (min-width: 1200px) {
                    .blogContainer {
                        width: 50%;
                    }
                }
            `}</style>
        </main>
    );
};

export async function getStaticProps(context: GetStaticPropsContext) {
    const post: JournalEntry = await getJournalEntryById(context.params?.id as string);
    const related: JournalEntry[] = await getJournalEntryByType(post.category as string);
    return {
        props: {
            post: post,
            relatedEntries: related.filter(entry => entry.id !== post.id),
        },
        revalidate: globals.revalidate.journal,
    };
}

export async function getStaticPaths() {
    const posts: JournalEntry[] = await getJournalEntriesByReviewStatus(true);

    const paths = posts.map(post => ({
        params: { id: post.id },
    }));

    return { paths, fallback: true };
}

export default JournalPostPage;
