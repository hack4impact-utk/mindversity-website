import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Header from "components/Header";
import SelectBtn from "components/Journal/SelectBtn";
import Footer from "components/Footer";
import { useRouter } from "next/router";
import { getEntries } from "requests/Journal"
import { JournalEntry, ContentfulImage } from "utils/types"

interface Props {
  journalEntries: JournalEntry[]
}


const Journal: NextPage<Props> = ({ journalEntries }) => {
  const router = useRouter();
  var journalType = router.query.category;
  // console.log(journalEntries)

  // var selectedPosts = journalEntries.filter((post) => post.category == journalType)

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

      {/* <div className="thumbnailContainer">
        {selectedPosts.map((post, index) => (
          <div key={index} className="postPreview">
            <div className="thumbnail">
              <div className="timePill">
                {post.readMins} min read
              </div>
            </div>
            <h3>{post.title}</h3>
            <p className="descText">{post.desc}</p>
            <p className="authorText">Written by {post.author}</p>
          </div>
        ))}
      </div> */}

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
          width: 60%;
          position: relative;
          left: 50%;
          margin-left: -30%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .postPreview {
          width: 400px;
          margin: 20px 0 20px 0;
        }
        .postPreview > .thumbnail {
          background-color: #c2c2c2;
          height: 200px;
        }
        .timePill {
          padding: 7px 20px 7px 20px;
          display: inline-block;
          border-radius: 20px;
          color: white;
          font-size: 12px;
          font-weight: bold;
          background-color: #C1A6D4;
          position: relative;
          top: 150px;
          left: 20px;
        }
        `}</style>
    </main>
  );
};

Journal.getInitialProps = async ( context: NextPageContext ) => {
  let entries = await getEntries();
  console.log(entries)

  return {
    journalEntries: entries
  }
}

export default Journal;