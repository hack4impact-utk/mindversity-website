import { NextPage } from "next";
import Head from "next/head";
import Footer from "components/Footer";
import Header from "components/Header";
import MainInfo from "components/MainInfo";
import Partners from "components/Partners";
import HomeChapters from "components/HomeChapters";
import OfficerCarouselComp from "components/OfficerCarousel"
import { Officer, Chapter } from "utils/types";
import { getOfficers } from "server/actions/Officer";
import { getChapters } from "server/actions/Chapter";

interface Props {
  officers: Officer[],
  chapters: Chapter[]
}

const Home: NextPage<Props> = ({officers,chapters}) => {

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
      <HomeChapters chapters={chapters} />
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

export async function getStaticProps() {
  let officerQuery: Officer = {chapter: 'national'}
  let officers: Officer[] = await getOfficers(officerQuery)

  // Get all chapters. Filter by region in component once user's location is retrieved.
  // Navigator is undefined in async getStaticProps(), so must do it in component.
  let chapters: Chapter[] = await getChapters({})

  return {
    props: {
      officers: JSON.parse(JSON.stringify(officers)),
      chapters: JSON.parse(JSON.stringify(chapters)),
    }
  }
}

export default Home;
