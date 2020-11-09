import { NextPage } from "next";
import Head from "next/head";
import Header from "components/Header";
import Footer from "components/Footer";

const Resources: NextPage = () => {
  return (
    <main className="container">
      <Head>
        <title>Resources | MindVersity</title>
      </Head>
      <Header />

      <div className="heroContainer">
        <div className="textContainer">
          <h1>Resources</h1>
          <p>Description of page content goes here</p>
        </div>
      </div>

      <div className="contentContainer">
        <div className="nationalResources">
          <h2>National Resources</h2>
          <p>
            <a href="tel:800-273-8255">Lifeline Suicide Prevention</a>
          </p>
          <p>
            <a href="https://www.nimh.nih.gov/index.shtml">
              National Institute of Mental Health
            </a>
          </p>
          <p>Hotlines</p>
          <p>Websites</p>
        </div>

        <div className="immediateHelp">
          <h2>Immediate Help Resources</h2>
          <p>
            <a href="tel:800-273-8255">Help ###</a>
          </p>
          <p>
            <a href="tel:">Help ###</a>
          </p>
          <p>Hotlines</p>
          <p>Websites</p>
        </div>
      </div>

      <div className="mindversityResources">
        <h2>MindVersity Resources</h2>
        <p>Articles</p>
        <p>Podcasts</p>
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
      `}</style>
      <style jsx>{`
        .heroContainer {
          width: 100%;
          height: 15vh;
          position: relative;
          display: block;
          text-align: center;
          margin-bottom: 20px;
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
        .nationalResources {
          width: 60%;
          padding: 20px 20px;
        }
        .immediateHelp {
          width 350px;
          background-color:#E7D8F2;
          padding: 20px 20px;
        }
        .immediateHelp > h2 {
          font-weight: bold;
        }
        .mindversityResources {
          width: 80vw;
          position: relative;
          margin-left: -40vw;
          left: 50%;
          padding: 20px 20px;
        }
        a, p {
          text-decoration: none;
          color: black;
          font-size: 1.15rem;
          margin: 40px 0;
        }
        @media screen and (max-width: 510px) {
          .contentContainer {
            flex-wrap: wrap;
            width: 100vw;
            left: 0;
            margin-left: 0;
          }
          .nationalResources,
          .mindversityResources,
          .immediateHelp {
            width: 100%;
            left:0;
            margin-left: 0;
          }
        }
      `}</style>
    </main>
  );
};

export default Resources;
