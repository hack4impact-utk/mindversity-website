import Footer from "components/Footer";
import ChapterComp from "components/Chapter";
import { getChapter } from "requests/Chapter";
import { Chapter } from 'utils/types';
import { NextPage, NextPageContext } from 'next';
import errors from 'utils/errors';

// When routing here we have a chapter name we can get from the url name
// We can get that param with useRouter(), but its also given in the context

interface Props {
  chapter: Chapter;
}

const ChapterPage: NextPage<Props> = ({ chapter }) => {
  return(
    <div>
      <p> hello from the main page </p>
      <ChapterComp chapter={chapter}/>
      <Footer />
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
  // var chapters: Chapter[] = await getChapter(chapterQuery);
  // if (chapters.length === 1) {
  //   chapter = chapters[0];
  // }
  // else {
  //   // TODO route to an error page
  //   throw new Error(errors.GENERIC_ERROR);
  // }

  chapter = await getChapter(chapterQuery);
  return {
      chapter: chapter,
  }
}


export default ChapterPage;
