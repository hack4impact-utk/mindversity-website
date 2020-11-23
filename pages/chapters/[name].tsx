import Header from "components/Header";
import Footer from "components/Footer";
import ChapterComp from "components/Chapter";
import { getChapters } from "requests/Chapter";
import { Chapter } from 'utils/types';
import { NextPage, NextPageContext } from 'next';
import { FaMapMarkerAlt } from "react-icons/fa";
import errors from 'utils/errors';
import Head from "next/head";

// When routing here we have a chapter name we can get from the url name
// We can get that param with useRouter(), but its also given in the context

interface Props {
  chapter: Chapter;
}

const ChapterPage: NextPage<Props> = ({ chapter }) => {

  //Replace any underscores in the chapter name with spaces
  var cleanName = chapter.name?.replace(/_/g, " ");
  //Make the first letter of the region name capital
  var cleanRegion = chapter.region?.charAt(0).toUpperCase().concat(chapter.region.substr(1));

  return(
    <div>
      
      <Head>
        <title>{cleanName} Chapter | MindVersity | A peer mental health network.</title>
        <link rel="icon" href="../favicon.ico" />
      </Head>
      
      <Header />

      <div className="hero" style={{backgroundImage: "url('/rutgers-placeholder.jpg')"}}>
        <div className="heroOverlay">
          <div className="heroText">
            <h1>{cleanName}</h1>
            <h2><FaMapMarkerAlt className="locationIcon" /> {cleanRegion}</h2>
          </div>
        </div>
      </div>
     
      <div className="bodyContent">
        <div className="aboutTextParent bodySection">
          <h2>About</h2>
          <p className="aboutText">
            {chapter.description}
          </p>
        </div>
        <div className="chapterOfficerParent bodySection">
          <h2>Meet the Team</h2>
        </div>
      </div>

      <ChapterComp chapter={chapter}/>
      
      <Footer />

      <style jsx>{`
      .hero{
        width: 100%;
        height: 50vh;
        position: relative;
        background-image: url('journal-hero.jpeg');
        background-size: cover;
        background-position: center;
      }

      .heroOverlay{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        background-color: rgba(215, 215, 215, 0.70);
      }

      .heroText{
        position: relative;
        display: block;
        top: 50%;
        transform: translateY(-50%);
        padding: 0px 40px;
      }

      h1{
        position: relative;
        display: block;
        color: #503E8C;
        font-size: 46px;
        font-weight: bold;
        padding-bottom: 0px;
        margin-bottom: 0px;
      }

      .heroText h2{
        font-weight: normal;
        margin-top: 0;
        padding-top: 20px;
        padding-left: 40px
      }

      .locationIcon{
        color: #707070;
      }

      .bodyContent{
        width: auto;
        height: auto;
        position: relative;
        display: block;
        padding: 60px;
      }

      .bodySection{
        width: auto;
        height: auto;
        position: relative;
        display: block;
        padding: 20px 0px;
      }

      .aboutTextParent h2{
        position: relative;
        display: block;
        text-align: left;
        font-size: 38px;
        color: #707070;
      }

      @media screen and (min-width: 770px){
        .aboutText{
          font-size: 20px;
          color: #707070;
          width: 40%;
        }  
      }

      @media screen and (max-width: 770px){
        .aboutText{
          font-size: 20px;
          color: #707070;
          width: 100%;
        }  
      }
      
      .chapterOfficerParent h2{
        position: relative;
        display: block;
        text-align: left;
        font-size: 38px;
        color: black;
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

// This function cant be in child component, so we query the data and 
// then pass it to the component. It's ran server-side
ChapterPage.getInitialProps = async ( context: NextPageContext ) => {
  // query by the chapter's name
  let chapterQuery: Chapter = new Object;
  chapterQuery.name = context.query.name as string;

  var chapter: Chapter = new Object;
  var chapters: Chapter[] = await getChapters(chapterQuery);
  if (chapters.length === 1) {
    chapter = chapters[0];
  }
  else {
    // TODO route to an error page
    throw new Error(errors.GENERIC_ERROR);
  }

  return {
      chapter: chapter,
  }
}

export default ChapterPage;