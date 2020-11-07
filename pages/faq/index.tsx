import { NextPage } from "next";
import Head from "next/head";
import Header from "components/Header";
import Footer from "components/Footer";
import FAQ from "components/FAQ";

const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>FAQs | MindVersity | A peer mental health network.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />

        <div className="heroContainer">
          <h1>Frequently Asked Questions</h1>
        </div>

        <div className="wrapper">
          <FAQ question="What is MindVersity? ">
            MindVersity is a new and growing organization that strives to bridge
            the gaps between access to mental health resources and students of
            color on college campuses nationwide. Since our founding in June
            2020, we have been working to create peer support groups and provide
            mental health resources specific to students of color. Our ultimate
            goal is to advocate for our students and try to eradicate the
            cultural stigma that continues to pervade mental health.
          </FAQ>
          <FAQ question="How is MindVersity organized?">
            MindVersity is composed of two divisions: the Public Relations
            Division and the Peer Networking Division. Public Relations focuses
            on public outreach and awareness through our various social media
            pages. These include our Instagram (@mindversityorg), Facebook page,
            and Spotify playlists. Peer Networking has been developing a peer
            curriculum that will help educate our members on strategies for
            facilitating effective conversations related to mental health.
          </FAQ>
          <FAQ question="How many schools are involved?">
            Currently, MindVersity has about twelve chapters running at
            universities across the United States.
          </FAQ>
          <FAQ question="How can I start a chapter at my school?">
            To start a chapter at your university, you can reach out to one of
            our Board members at mindversityorg@gmail.com. They can help
            introduce you to the structure and mission of our organization, get
            you officially registered, offer tips for recruitment, and help you
            with ideas for meetings!
          </FAQ>
          <FAQ question="My university already has a chapter. How do I get involved?">
            Reach out to your chapter by contacting them on Instagram or through
            email. You can find that information on their chapter-specific
            subpage
          </FAQ>
          <FAQ question="What have we been doing so far?">
            Check out our blog for the latest events, partnerships, and
            announcements!
          </FAQ>
        </div>

        <Footer />
      </main>
      <style jsx>{`
        .wrapper {
          min-height: auto;
          padding-bottom: 40px;
        }

        .heroContainer {
          width: 100%;
          height: 40vh;
          position: relative;
          display: block;
          text-align: center;
        }

        h1 {
          position: relative;
          display: block;
          color: #8c69aa;
          font-size: 36px;
          padding: 0px 20px;
          top: 50%;
          transform: translateY(-50%);
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

export default Home;
