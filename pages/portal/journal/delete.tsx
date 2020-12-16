import { NextPage,  NextPageContext } from "next";
import Head from "next/head";
import Navigation from "components/Portal/Navigation";
import urls from "utils/urls";
import JournalEntryComponent from "components/Portal/JournalEntry";
import {JournalEntry} from "utils/types";
interface Props{
    entries: JournalEntry[],
}

const AdminJournalDelete: NextPage<Props> = ({entries}) => {
    return(
        <main className="wrapper">
            <Head>
                <title>Delete Journal Entries | Mindversity Website</title>
            </Head>
            <Navigation />
            <div className="content">
                <h1>Posts to be deleted</h1>
                {entries && (
                    entries.map(entry => {
                        return (
                            <JournalEntryComponent key={entry.id} entry={entry} mode="delete"/>
                        )
                    })
                )}

            </div>
            <style jsx>{`
                @media screen and (min-width: 1000px){
                    .content {
                        margin-left: 430px;
                        margin-right: 60px;
                        display:flex;
                        flex-direction:column;
                        height: 100vh;
                    }
                }
                @media screen and (max-width: 999px){
                    .content {
                        margin-top:30px;
                        margin-left: 30px;
                        margin-right:30px;
                        display:flex;
                        flex-direction:column;
                        height: 100vh;
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
        </main>
    )
}
AdminJournalDelete.getInitialProps = async (context: NextPageContext) => {
    //Load the journal entries that have already been reviewed.
    const url:string = `${urls.baseUrl}/api/journal/getByReviewStatus?reviewed=true`;
    const response = await fetch(url, {
        method: "GET",
    });
    let entries = await response.json();
    
    return{
        entries,
    }
}

export default AdminJournalDelete;
