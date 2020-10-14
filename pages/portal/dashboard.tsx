import { NextPage } from "next";
import Head from "next/head";

import Header from "components/portal/header";

const Dashboard: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>MindVersity | Admin Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <h1>Welcome to MindVersity</h1>
      <h2>Admin Portal</h2>

      <a className="dashChip" href="chapters">
        Manage Chapters
      </a>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .dashChip{
          width: auto;
          height: auto;
          position: relative;
          display: inline-block;
          padding: 20px;
          border-radius: 5px;
          border 0.1px solid black;
        }
      `}</style>

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
    </div>
  );
};

export default Dashboard;
