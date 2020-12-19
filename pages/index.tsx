import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Footer from "components/Footer";
import Header from "components/Header";
import MainInfo from "components/MainInfo";
import Partners from "components/Partners";
import HomeChapters from "components/HomeChapters";
import OfficerCarouselComp from "components/OfficerCarousel"
import { Officer } from "utils/types";
import { getOfficers } from "server/actions/Officer";

interface Props {
  officers: Officer[]
}

const Home: NextPage<Props> = ({officers}) => {
  return (
    <div className="container">
      <Head>
        <title>MindVersity | A peer mental health network.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <MainInfo />
      <Partners />
      {
      <div className="bodyContent">
        <div className="chapterOfficerParent bodySection">
           <h2>Meet the National Board</h2>
           <OfficerCarouselComp officers={officers} />
       </div>
      </div>
    }
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

        .chapterOfficerParent h2{
          position: relative;
          display: block;
          text-align: left;
          font-size: 38px;
          color: black;
        }
        
        .bodySection{
          width: auto;
          height: auto;
          position: relative;
          display: block;
          padding: 20px 0px;
        }

        .bodyContent{
          width: auto;
          height: auto;
          position: relative;
          display: block;
          padding: 60px;
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

export async function getStaticProps(context:NextPageContext) {
  let offficerQuery: Officer = {chapter: 'national'}
  let officers: Officer[] = await getOfficers(offficerQuery)

  return {
    props: {
      officers: JSON.parse(JSON.stringify(officers))
    }
  }
}

export default Home;
