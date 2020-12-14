import { NextPage,  NextPageContext } from "next";
import Head from "next/head";
import Navigation from "components/Portal/Navigation";
import urls from "utils/urls";
import JournalEntry from "components/Portal/JournalEntry";
import {EntryProp} from "contentful-management/dist/typings/entities/entry";
interface Props{
    entries: EntryProp[],
}

const AdminJournalReview: NextPage<Props> = ({entries}) => {
    return(
        <main className="wrapper">
            <Head>
                <title>Review Journal Entries | Mindversity Website</title>
            </Head>
            <Navigation />
            <div className="content">
                <h1>Posts to be reviewed</h1>
                {entries && (
                    entries.map(entry => {
                        return (
                            <JournalEntry key={entry.sys.id} entry={entry} mode="review"/>
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
AdminJournalReview.getInitialProps = async (context: NextPageContext) => {
    //Load the journal entries that haven't been reviewed.
    const url:string = `${urls.baseUrl}/api/journal/getByReviewStatus?reviewed=false`;
    const response = await fetch(url, {
        method: "GET",
    });
    let data = await response.json();
    let entries: Array<EntryProp> = data.items;
    
    return{
        entries,
    }
}

export default AdminJournalReview;
