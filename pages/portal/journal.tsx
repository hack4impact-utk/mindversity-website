import { NextPage,  NextPageContext } from "next";
import Head from "next/head";
import Navigation from "components/Portal/Navigation";
import Footer from "components/Footer";
import urls from "utils/urls";
import JournalEntry from "components/Portal/JournalEntry";
interface Props{
    entries: Object[],
}

const AdminJournal: NextPage<Props> = ({entries}) => {
    return(
        <main className="wrapper">
            <Navigation />
            <div className="content">
                <h1>Posts to be Reviewed</h1>
                {entries && (
                    entries.map(entry => {
                        return (
                            <JournalEntry entry={entry} mode="delete"/>
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
AdminJournal.getInitialProps = async (context: NextPageContext) => {
    //Load the journal entries that have already been reviewed.
    let url = urls.baseUrl + '/api/journal/getByReviewStatus?reviewed=true';
    const response = await fetch(url, {
        method: "GET",
    });
    let data  = await response.json();
    let entries = data.items;
    
    return{
        entries,
    }
}

export default AdminJournal;
