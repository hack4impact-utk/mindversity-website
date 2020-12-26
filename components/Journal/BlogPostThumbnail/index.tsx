import React, { useState } from "react";
import style from "./style.module.scss"; //Import the main stylesheet
import { JournalEntry } from "utils/types";

interface Props {
    post: JournalEntry;
}

const BlogPostThumbnail: React.FC<Props> = ({ post }) => {
    return (
        <div className={style.postPreview}>
            <div
                className={style.thumbnail}
                style={{ backgroundImage: `url("${post.image?.url}")`, backgroundSize: "cover" }}
            >
                {/* <img src={post.image?.url} /> */}
                {/* <div className="timePill">
                {post.readMins} min read
              </div> */}
            </div>
            <h2 className={style.titleText}>{post.title}</h2>
            <p className={style.descText}>{post.description}</p>
        </div>
    );
};

export default BlogPostThumbnail;
