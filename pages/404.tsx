import { NextPage } from "next";
import Head from "next/head";

const FourOhFour: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Mindversity | Page not found</title>
      </Head>
      <h1>404 - Page Not Found</h1>
      <h2>
        Return <a href="/">home</a>
      </h2>
      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        h1,
        h2 {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
      `}</style>
    </div>
  );
};

export default FourOhFour;
