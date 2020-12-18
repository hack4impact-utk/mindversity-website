import React, { useState } from "react";
import style from "./style.module.scss"; //Import the main stylesheet
import { JournalEntry } from "utils/types"

interface Props {
    post: JournalPost
}
  

const BlogPostThumbnail : React.FC = () => {

    return (
        <div key={index} className="postPreview">
            <div className="thumbnail">
              <div className="timePill">
                {post.readMins} min read
              </div>
            </div>
            <h3>{post.title}</h3>
            <p className="descText">{post.desc}</p>
            <p className="authorText">Written by {post.author}</p>
        </div>
    )
}

export default SelectBtn;