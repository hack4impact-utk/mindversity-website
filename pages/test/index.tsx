import React from 'react'
import { Chapter } from 'utils/types'
import { getChapterByName } from "server/actions/Chapter"; //"requests/chapter";


// async function myfunc() {
//   var chapter: Chapter;
//   chapter =  await getChapterByName("Ohio_State");
//   // try {
//   //   chapter = getChapterByName("Ohio_State");
//   // } catch (err) {
//   //   console.error(err);
//   // }
//   console.log("got chapter in func: ", chapter)
//   return chapter;
// }

// class ChapterDisplay extends React.Component<{}, Chapter> {
//   componentWillMount() {
//     //init
//   }

//   render() {
//     return (
//       <div>
//         {Chapter.name}
//       </div>
//     )
//   }
// }

// export default ChapterDisplay;

export default class Page extends React.Component<Chapter> {

  static async myfunc() {
    var chapter: Chapter;
    chapter =  await getChapterByName("Ohio_State");
    // try {
    //   chapter = getChapterByName("Ohio_State");
    // } catch (err) {
    //   console.error(err);
    // }
    console.log("got chapter in func: ", chapter)
    return chapter;
  }

  render() {
    let chapter: Chapter = Page.myfunc().then;
    console.log("got chapter: ", chapter)
    const { name } = this.props;
    return (
      <div>
        <main>return chapter: {chapter.name}</main>
      </div>
    )
  }
}
