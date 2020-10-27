import { NextPage } from "next";
import Head from "next/head";
import Header from "components/header";
import Footer from "components/footer";

const Resources: NextPage = () => {
  return (
    <main className="container">
      <Head>
        <title>Resources | MindVersity</title>
      </Head>
      <Header />

      <section className="search-container">
        <figure className="search">
          <h1>Search for Resources:</h1>
          <input
            className="searchbar"
            type="search"
            placeholder="Search"
          ></input>
        </figure>
      </section>

      <section className="resources">
        <div>
          <h1>National Resources</h1>
          <div className="highlight-bar"></div>
        </div>
        <div className="national">
          <div className="websites">
            <h2>Websites</h2>
            <a href="/">National Institute of Mental Health</a>
            <a href="/">Lifeline Suicide Prevention</a>
          </div>
          <div className="hotlines">
            <h2>Hotlines</h2>
            <div>
              <span>Suicide:</span>
              <a href="tel:800-273-8255">800-273-8255</a>
            </div>
          </div>
        </div>
        <div>
          <h1>Mind Resources</h1>
          <div className="highlight-bar"></div>
        </div>
        <div className="mind">
          <div className="websites">
            <h2>Websites</h2>
          </div>
          <div className="hotlines">
            <h2>Hotlines</h2>
          </div>
        </div>
      </section>

      <Footer />
      <style jsx>{`
        .search-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .search {
          background: url("/resources/search.jpg");
          width: 80%;
          height: 350px;
          background-size: 100% 350px;
          background-repeat: no-repeat;
          filter: opacity(0.8);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          border-radius: 250px;
        }
        .searchbar {
          width: 50%;
          border-radius: 30px;
          border: 1px solid #000;
          padding: 0.5rem;
        }
        .resources {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .resources h1 {
          font-size: 2.5rem;
          margin-bottom: 0;
          position: relative;
        }
        .highlight-bar {
          width: 100%;
          height: 5px;
          background: radial-gradient(
            50% 50% at 50% 50%,
            #2ab7ca 0%,
            rgba(34, 123, 173, 0) 100%
          );
          transform: matrix(1, 0, 0, -1, 0, 0);
        }

        .national,
        .mind {
          width: 80%;
          display: grid;
          grid-template-columns: 0.6fr 0.4fr;
          grid-gap: 20px;
          align-content: center;
        }
        .websites {
          background: linear-gradient(
            180deg,
            rgba(42, 183, 202, 0.33) 0%,
            rgba(42, 183, 202, 0.1419) 99.99%,
            rgba(42, 183, 202, 0.33) 100%
          );
          border-radius: 64px;
          display: flex;
          flex-direction: column;
          margin: 20px;
          align-items: center;
        }
        .hotlines {
          background: linear-gradient(
            180deg,
            rgba(235, 87, 87, 0.324) 57.81%,
            rgba(235, 87, 87, 0) 100%
          );
          border-radius: 64px;
          display: flex;
          margin: 20px;
          flex-direction: column;
          align-items: center;
        }
        h2 {
          margin-bottom: 10px;
        }
        span {
          margin-right: 10px;
          font-size: 1.2rem;
        }
        a {
          text-decoration: none;
          color: black;
          font-size: 1.2rem;
          width: 80%;
        }
        @media screen and (max-width: 769px) {
          .national,
          .mind {
            grid-template-columns: 1fr;
          }
        }
        @media screen and (max-width: 510px) {
          .search {
            border-radius: 10px;
          }
        }
      `}</style>
    </main>
  );
};

export default Resources;
