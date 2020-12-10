import { NextPage } from "next";
import Head from "next/head";

import Header from "components/Portal/Header";

const Dashboard: NextPage = () => {
    return (
        <div className="container">
            <Head>
                <title>MindVersity | Admin Portal</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <h1>Welcome to MindVersity</h1>
            <h2>A national peer network.</h2>

            <div className="dashChipParent">
                <h2>What yould you like to do?</h2>
                <a className="dashChip" href="chapters">
                    Manage Chapters
                </a>
                <a className="dashChip" href="resources">
                    Edit Resources
                </a>
                <a className="dashChip" href="journal">
                    Update Journal
                </a>
            </div>

            <style jsx>{`
        .container{
          padding-top: 50px;
          text-align: center;
        }

        .dashChipParent{
          width: auto;
          height: auto;
          position: relative;
          display: block;
          margin-top: 50px;
          padding: 40px;
        }

        .dashChipParent h2{
          margin-bottom: 40px;
        }

        .dashChip{
          width: auto;
          height: auto;
          position: relative;
          display: inline-block;
          padding: 20px 40px;
          font-size: 20px;
          border-radius: 500px;
          border: 3px solid #2AB7CA;
          box-shadow: 0px 5px 5px #dedede;
          background-color: #FAFAFA;
          color: black;
          text-decoration: none;
          margin: 20px;
          transition background 0.5s ease;
        }

        .dashChip:hover{
          background-color: #2AB7CA;
          color: white;
          cursor: pointer;
        }
      `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
