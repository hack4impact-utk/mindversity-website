import React from 'react';
import { Officer } from 'utils/types'

interface Props {
  officer: Officer;
}


const updateOfficer = async (officer: Officer) => {
  console.log(officer);
  // go to a page/popup a component below to edit the current officer
  // send updated officer info to updateOfficer backend
};

const OfficerComp: React.FC<Props> = ({ officer }) => {
  return (
    <>
      <p> officer name: { officer?.name } </p>
      <img src={ officer?.picture?.url } alt="Officer Picture" width="500" height="600"/>
      <p> officer role: { officer?.role } </p>
      <p> officer chapter: { officer?.chapter } </p>
      <p> officer bio: { officer?.bio } </p>
      <p> officer _id: { officer?._id } </p>
      <button onClick={() => updateOfficer(officer)}> Update </button>
    </>
  );
};

export default OfficerComp;
