import { NextPage } from "next";
import Head from "next/head";

import Header from "components/Portal/Header";

const NewChapter: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>MindVersity | Admin Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="formContainer">
        <h2>Create New Chapter</h2>
        <form action="" method="post">
          <label htmlFor="chapterName">Chapter Name</label>
          <input type="text" name="chapterName" placeholder="Chapter Name" />
          <label htmlFor="chapterRegion">Region</label>
          <select name="chapterRegion">
            <option value="" disabled>
              Select Region
            </option>
            <option value="Region 1">Region 1</option>
            <option value="Region 2">Region 2</option>
          </select>
          <label htmlFor="chapterDescription">Chapter Description</label>
          <textarea
            name="chapterDescription"
            placeholder="Chapter Description"
          ></textarea>
          <label htmlFor="chapterCover">
            Chapter Cover Image (Campus Picture)
          </label>
          <input
            type="file"
            name="chapterCover"
            accept="image/gif, image/jpeg, image/png"
          />
          <label htmlFor="chapterLogo">Chapter Logo</label>
          <input
            type="file"
            name="chapterLogo"
            accept="image/gif, image/jpeg, image/png"
          />
          <input type="submit" value="Create Chapter" />
        </form>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 20px;
          background-color: #b59ccc;
        }

        .formContainer {
          background-color: #eae0f1;
          padding: 20px;
        }

        label {
          position: relative;
          display: block;
          margin-bottom: 10px;
          margin-top: 20px;
        }

        input[type="text"],
        select,
        textarea {
          width: 100%;
          height: auto;
          position: relative;
          display: block;
          padding: 10px;
          border: none;
          font-size: 16px;
          border-radius: 8px;
          outline: none;
        }

        textarea {
          font-family: inherit;
          resize: vertical;
        }

        input[type="file"] {
          position: relative;
          display: block;
          padding: 20px;
          border-radius: 8px;
          background-color: white;
        }

        input[type="submit"] {
          margin-top: 40px;
          padding: 10px;
          border-radius: 8px;
          font-size: 16px;
          border: none;
          color: white;
          outline: none;
          background-color: #8c69aa;
        }

        input[type="submit"]:hover {
          cursor: pointer;
          background-color: #7d52a3;
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

export default NewChapter;
