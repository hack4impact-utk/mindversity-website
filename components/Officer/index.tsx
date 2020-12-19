import React from 'react';
import { deleteOfficer } from 'requests/Officer';
import { Officer } from 'utils/types'

interface Props {
  officer: Officer;
}

const updateOfficerHandler = async (officer: Officer) => {
  // todo go to a page/popup a component below to edit the current officer
  // send updated officer info to updateOfficer backend
};

const deleteOfficerHandler = async (officer: Officer) => {
  console.log("deleting officer._id:", officer._id);
  deleteOfficer(officer);
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
      <button onClick={() => updateOfficerHandler(officer)}> Update </button>
      <button onClick={() => deleteOfficerHandler(officer)}> Delete </button>
    </>
  );
};

export default OfficerComp;
