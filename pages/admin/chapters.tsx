import { NextPage } from "next";
import Head from "next/head";

import Header from "components/Portal/Header";

const Dashboard: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>MindVersity | Admin Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div>
        <table>
          <tr>
            <th>Chapter Name</th>
            <th>Edit</th>
          </tr>
          <tr>
            <td>Chapter 1</td>
            <td>
              <a href="edit-info" className="editBtnTable">
                Edit
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="new-chapter" className="newBtnTable">
                New
              </a>
            </td>
            <td></td>
          </tr>
        </table>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 20px;
          background-color: #b59ccc;
        }

        table {
          border-collapse: collapse;
          width: 100%;
        }

        th {
          color: white;
          background-color: #8c69aa;
        }

        td,
        th {
          height: auto;
          text-align: left;
          padding: 8px 10px;
        }

        tr:nth-child(odd) {
          background-color: #eae0f1;
        }

        tr:nth-child(even) {
          background-color: #f3eef6;
        }

        .newBtnTable {
          background-color: #43b110;
          color: white;
          padding: 2px 10px;
          border-radius: 4px;
          text-decoration: none;
        }

        .editBtnTable {
          background-color: #edaa0c;
          color: white;
          padding: 2px 10px;
          border-radius: 4px;
          text-decoration: none;
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

export default Dashboard;
