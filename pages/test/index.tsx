import React from 'react'
import { Chapter } from 'utils/types'
import { getChapterByName } from "requests/Chapter"; //"server/actions/Chapter"

class Test extends React.Component<Chapter> {
  chapter: Chapter;

  constructor(props: Chapter) {
    super(props);
    this.chapter = props;
  }

  static async myfunc(): Promise<Chapter> {
    var chapter: Chapter;
    chapter =  await getChapterByName("Ohio_State");

    console.log("got chapter in func: ", chapter)
    return chapter;
  }

  componentDidMount() {
    Test.myfunc().then(ret => {
      console.log("in then(), ret is: ", ret)
      this.chapter = ret;
      //this.render();
    });

  }

  render() {
    return (
      <div>
        <main>return chapter: {this.chapter.name}</main>
      </div>
    )
  }
}

export default Test;