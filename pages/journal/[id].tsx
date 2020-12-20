import Header from "components/Header";
import Footer from "components/Footer";
import BlogPostThumbnail from "components/Journal/BlogPostThumbnail"

import { JournalEntry } from 'utils/types';

import { NextPage, NextPageContext } from 'next';
import errors from 'utils/errors';
import Head from "next/head";
import { getPostById, getEntriesByType } from "requests/Journal";

// When routing here we have a journal id we can get from the url name
// We can get that param with useRouter(), but its also given in the context

interface Props {
  post: JournalEntry,
  relatedEntries: JournalEntry[]
}

const JournalPostPage: NextPage<Props> = ({ post, relatedEntries }) => {

  return (
    <main className="container">
      <Head>
        <title>Journal | MindVersity</title>
      </Head>
      <Header />
      <div className="blogContainer">
        <h1 className="blogTitle">{post.title}</h1>
        <i className="datePublished">Published {post.dateCreated}</i>
        <img src={post.image?.url} style={{ width: '100%', marginTop: "30px", }} />
        <div className="blogContent" dangerouslySetInnerHTML={{__html: post.body as string}}>
        </div>
      </div>

      <hr style={{width: "90%", position: "relative", margin: "50px 0 50px -45%", left: "50%", border: "1px solid #aaa"}} />

      <div className="relatedContainer">
        <h1 className="relatedTitle">Read Other Compelling Journals</h1>

        <div className="thumbnailGrid">
        {
        relatedEntries && relatedEntries.map((post, index) => (
          <a href={`/journal/${post.id}`} key={post.id}>
            <BlogPostThumbnail post={post} />  
          </a>
        ))
        }

      </div>
      </div>

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
        color: #8C69AA;
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

export async function getServerSideProps(context: NextPageContext) {
  var post: JournalEntry = await getPostById(context.query.id)
  var related: JournalEntry[] = await getEntriesByType(post.category)
  // console.log(related)
  return {
    props: {
      post: post,
      relatedEntries: related.filter((entry) => entry.id !== post.id)
    }
  }
}

export default JournalPostPage;