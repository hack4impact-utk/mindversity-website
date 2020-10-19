import { NextPage } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import FAQ from "components/FAQ";
const Home: NextPage = () => {
  return (
    <div className="container">
      <main>
        <Header />
        <div className="wrapper">
          <FAQ question="Question 1">Answer to question 1...</FAQ>
          <FAQ question="Question 2">Answer to question 2...</FAQ>
          <FAQ question="Question 3">Answer to question 3...</FAQ>
        </div>
        <Footer />
      </main>
      <style jsx>{`
        .container,
        .wrapper {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default Home;
