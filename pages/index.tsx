import { NextPage } from "next";
import Head from "next/head";
import Footer from "components/Footer";
import Header from "components/Header";
import MainInfo from "components/MainInfo";
import Partners from "components/Partners";
import HomeChapters from "components/HomeChapters";
const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>MindVersity | A peer mental health network.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <MainInfo />
      <Partners />
      <HomeChapters />
      <Footer />

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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

export default Home;
