import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { getOfficers, deleteOfficer } from "requests/Officer";
import { Officer } from 'utils/types';
import { useState } from "react";
import { Router } from "next/router";
import urls from "utils/urls";
import Navigation from "components/Portal/Navigation";
import OfficerCard from "components/Portal/OfficerCard";

interface Props {
    officer: Officer[];
}

const Officers: NextPage<Props> = ({officer}) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingID, setDeletingID] = useState("");

    const handleDeleteAction = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const submitButton = e.target as HTMLButtonElement;
        if(submitButton.name === "delete"){ //Delete the officer
            //Find the officers object with a metching id
            const officerToDelete = officer.filter(officer => officer._id?.toString() === deletingID);
            if(officerToDelete.length == 1){ 
                const officerDelete = await deleteOfficer(officerToDelete[0]);
                location.reload(); //Reload the page to refresh the officers
            }
            else{
                //TODO: Possible error message telling the user that the officer is not found
            }
        }
        else{ //Open the delete confirm modal
            setIsDeleting(true);
            setDeletingID(submitButton.value);
        }
    }

    return (
        <div className="container">
            <Head>
                <title>MindVersity | Admin Portal</title>
                <link rel="icon" href="/favicon.ico" />-
            </Head>

            <Navigation />

            {isDeleting && (
                <div className="rejectModal">
                    <div className="modalBody">
                        <h1>Are you sure?</h1>
                        <p>Continuing with this action will delete the officer permanently.</p>
                        <div className="actionButtonContainer">
                            <button type="submit" name="delete" className="actionButton actionButtonPrimary" onClick={handleDeleteAction}>Delete</button>
                            <button className="actionButton actionButtonSecondary" onClick={() => {setIsDeleting(false); setDeletingID("")}}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bodyContent">
                <h1>Edit Officers</h1>
                <div className="newChapterBtnParent">
                    <a href="officers/create" className="newChapterBtn">New Officer</a>
                </div>
                <div className="chaptersContainer">
                    { //Display all of the officers from the database
                        officer && (
                            officer.map((officer, i) => {
                                return(
                                    <OfficerCard key={i} officer={officer} handleDelete={handleDeleteAction}/>
                                )
                            })
                        )
                    }
                </div>
            </div>

            <style jsx>{`
                .container{
                    padding-top: 50px;
                    text-align: left;
                }

                @media screen and (min-width: 1000px){
                    .bodyContent{
                        width: auto;
                        height: auto;
                        position: relative;
                        display: body;
                        margin-left: 375px;
                    }
                }

                h1{
                    color: black;
                    padding: 0px 40px;
                }

                .newChapterBtnParent {
                    width: auto;
                    height: auto;
                    position: relative;
                    display: block;
                    text-align: left;
                    padding: 0px 40px;
                    margin-bottom: 20px;
                }

                .newChapterBtn {
                    height: auto;
                    width: auto;
                    padding: 10px 40px;
                    position: relative;
                    display: inline-block;
                    border: none;
                    font-size: 16px;
                    margin-top: 20px;
                    outline: none;
                    border-radius: 6px;
                    background-color: #8c69aa;
                    color: white;
                    text-decoration: none;
                    transition: background 0.5s ease;
                }

                .newChapterBtn:hover {
                    cursor: pointer;
                    background-color: #b59ccc;
                }

                .chaptersContainer{
                    width: 100%;
                    height: auto;
                    position: relative;
                    display: block;
                    padding: 20px 40px;
                    text-align: center;
                }

                .actionButton{
                    width: 230px;
                    height: 50px;
                    border-radius: 6px;
                    font-size: 1.2rem;
                    border: 1px solid #8C69AA;
                    cursor:pointer;
                    transition:0.5s ease;
                    align-self: flex-end;
                    margin: 10px;
                }

                .actionButtonPrimary {
                    background: #8C69AA;
                    color: white;
                }

                .actionButtonPrimary:hover{
                    filter:brightness(1.2);
                }

                .actionButtonSecondary{
                    background: white;
                    color: #8C69AA;
                }

                .actionButtonSecondary:hover{
                    filter:brightness(0.8);
                }

                .modalBody{
                    background: white;
                    width:500px;
                    height:300px;
                    padding:0.5rem;
                    text-align:center;
                    align-self:center;
                }

                @media screen and (min-width: 1000px){  
                    .rejectModal{
                        width:100%;
                        position:fixed;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items:center;
                        height:100%;
                        background:rgba(0,0,0,0.2);
                        z-index:2;
                    }

                    .modalBody{
                        margin-left:430px;
                        margin-right: 60px;
                    }
                }

                @media screen and (max-width: 1000px){
                    .rejectModal{
                        width:100%;
                        position:fixed;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items:center;
                        height:100%;
                        background:rgba(0,0,0,0.2);
                        z-index:2;
                    }

                    .modalBody{
                        max-width: 90vw;
                        height: auto;
                    }

                    .contentHeader{
                        text-align:center;
                    }
                }

            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
};

export async function getServerSideProps(context: NextPageContext) {
    const cookie = context.req?.headers.cookie;

    const resp = await fetch(`${urls.baseUrl}${urls.api.admin.validateLogin}`, {
        headers: {
            cookie: cookie!,
        },
    });

    const respJSON = (await resp.json()) as { success: boolean; payload: unknown };
    const user = (respJSON.payload as User) || null;
    const usersChapter = user?.role || null;

    if (resp.status === 401 && !context.req) {
        void Router.replace(`${urls.pages.portal.login}`);
        return { props: {} };
    }

    if ((resp.status === 401 && context.req) || (usersChapter != "admin" && usersChapter != "national")) {
        context.res?.writeHead(302, {
            Location: `${urls.baseUrl}`,
        });
        context.res?.end();
        return { props: {} };
    }

    let officerQuery: Officer = new Object;
    officerQuery.chapter = context.query.name as string;
    var officers: Officer[] = await getOfficers(officerQuery);
    
    return { 
        props: {
            officer: officers,
            admin: usersChapter == "admin" || usersChapter == "national",
        },
    };
}


export default Officers;