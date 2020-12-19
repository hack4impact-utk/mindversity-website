import Header from "components/Header";
import Footer from "components/Footer";
import { JournalEntry } from 'utils/types';
import { NextPage, NextPageContext } from 'next';
import errors from 'utils/errors';
import Head from "next/head";
import { getPostById } from "requests/Journal";

// When routing here we have a journal id we can get from the url name
// We can get that param with useRouter(), but its also given in the context

interface Props {
  post: JournalEntry,
}

const JournalPostPage: NextPage<Props> = ({ post }) => {

  return (
    <main className="container">
      <Head>
        <title>Journal | MindVersity</title>
      </Head>
      <Header />
  <h1>{post}</h1>
      <Footer />
    <style jsx global>{
      `html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
        sans-serif;
      }
      
      * {
        box-sizing: border-box;
      }`
    }</style>
    </main>
  );
};

JournalPostPage.getInitialProps = async ( context: NextPageContext ) => {
  return {
    post: await getPostById(context.query.id),
  }
}

export default JournalPostPage;