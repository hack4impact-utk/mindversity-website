import Footer from "components/Footer";
import OfficerComp from "components/Officer";
import { getOfficers } from "requests/Officer";
import { Officer } from 'utils/types';
import { NextPage, NextPageContext, InferGetStaticPropsType } from 'next';
import errors from 'utils/errors';

interface Props {
  officers: Officer[];
}

const OfficerPage: NextPage<Props> = ({ officers }) => {
  return(
    <div>
      <p> hello from the main page </p>
      <>
        {officers.map(officer => (
          <OfficerComp key={officer._id} officer={officer}/>
        ))}
      </>
      <Footer />
    </div>
  );
};

// This function cant be in child component, so we query the data and 
// then pass it to the component. It's ran server-side
OfficerPage.getInitialProps = async ( context: NextPageContext ) => {
  // query by the chapter name
  let officerQuery: Officer = new Object;
  officerQuery.chapter = context.query.name as string;

  var officers: Officer[] = await getOfficers(officerQuery);
  if (officers.length == 0) {
    // TODO route to an error page
    throw new Error("found no officers from backend belonging to the chapter " + officerQuery.chapter);
  }

  return {
    officers: officers,
  }
}


export default OfficerPage;
