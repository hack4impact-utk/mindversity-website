import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Custom404: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Page Not Found | Mindversity</title>
      </Head>
      
      <Link href="/">
        <span className="logo">
          <img src="/logo.svg" alt="MindVersity Logo"></img>
        </span>
      </Link>
      <h1>404 - Page Not Found</h1>
      <Link href="/">      
        <button className="ret-home-button">
          Return Home
        </button>
      </Link>

      <style jsx>{`
        .container {
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        h1 {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          font-size: 40px;
        }

        .logo {
          width: 200px;
          height: 20px;
        }
        
        .ret-home-button{
          text-align:center;
          background:#8C69AA;
          padding: 10px 20px 10px 20px;
          border-radius: 5px;
          font-weight:bold;
          color:white;
          cursor:pointer;
          transition: 0.3s ease;
        }
        .ret-home-button:hover{
          filter:brightness(1.2);
          transform:translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default Custom404;
