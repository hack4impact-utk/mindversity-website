import { NextPage, NextPageContext, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

import Head from "next/head";
import Header from "components/Header";
import SelectBtn from "components/Journal/SelectBtn";
import BlogPostThumbnail from "components/Journal/BlogPostThumbnail"
import Footer from "components/Footer";

import { getEntriesByType } from "requests/Journal"
import { JournalEntry, ContentfulImage } from "utils/types"
import { useEffect, useState } from "react";
import {getJournalEntryByType} from "server/actions/Contentful";

const ITEMS_PER_PAGE = 6

interface Props {
  journalEntries: JournalEntry[]
}

const JournalPage: NextPage<Props> = ({journalEntries}) => {
  const router = useRouter();
  console.log(journalEntries)
  // var selectedPosts = journalEntries.filter((post) => post.category == journalType)

  // generates paginated array based on ITEMS_PER_PAGE
  // this uses frontend resources so it may be better to
  // have this be implemented on the backend
  var [page, setPage] = useState(0)
  var paginatedEntries: JournalEntry[][] = []
  var tmp: JournalEntry[] = []
  for(var i = 0; i < journalEntries.length; i++) {
    if ((i + 1) % (ITEMS_PER_PAGE + 1) === 0) {
      paginatedEntries.push(tmp)
      tmp = [journalEntries[i]]
    } else {
      tmp.push(journalEntries[i])
    }
  }
  if (tmp.length > 0) paginatedEntries.push(tmp)

  // console.log(selectedPosts)
  return (
    <main className="container">
      <Head>
        <title>Journal | MindVersity</title>
      </Head>
      <Header />

      <div className="heroContainer">
        <div className="textContainer">
          <h1>Journal</h1>
        </div>
      </div>

      <div className="btnRow">
        <SelectBtn />
      </div>

      <div className="thumbnailContainer">
        {
        paginatedEntries.length > 0 && paginatedEntries[page].map((post, index) => (
          <a href={`/journal/${post.id}`} key={post.id}>
            <BlogPostThumbnail post={post} />  
          </a>
        ))
        }
      </div>
      <div className="pagination">
        {
          paginatedEntries.map((n, i) => (
          <a className={page === i ? 'active' : ''} onClick={() => setPage(i)}>{i + 1}</a>
          ))
        }
      </div>

      <Footer />
      <style jsx global>{`
        html,
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
        .heroContainer {
          width: 100%;
          height: 400px;
          position: relative;
          display: block;
          text-align: center;
          margin-top: -20px;
          margin-bottom: 20px;
          background-color: #ccc;
        }
        .textContainer {
          position: relative;
          display: block;
          top: 50%;
          transform: translateY(-50%);
        }
        .textContainer > h1 {
          color: #8c69aa;
          font-size: 36px;
          padding: 0px 20px;
        }
        .textContainer > p {
          margin-top: 0px;
          position: relative;
          display: block;
          font-size:18px;
          top: 50%;
          transform: translateY(-50%);
          padding: 0 20px;
        }
        h2 {
          color: #503E8C;
          font-size: 28px;
          font-weight: normal;
        }
        .contentContainer{
          width: 80vw;
          position: relative;
          margin-left: -40vw;
          left: 50%;
          display:flex;
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
          margin:20px 0 20px -35%;
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
          color: #8C69AA;
          cursor: default;
        }

        a.active:hover {
          text-decoration: none;
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

export async function getServerSideProps(context: NextPageContext) {
  var data = await getJournalEntryByType(context.query.category as string);
  return {
    props: {
      journalEntries: data,
    }
  }
}

export default JournalPage;