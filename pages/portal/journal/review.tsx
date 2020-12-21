import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Navigation from "components/Portal/Navigation";
import urls from "utils/urls";
import JournalEntryComponent from "components/Portal/JournalEntry";
import { JournalEntry, User } from "utils/types";
import { useState } from "react";
import Router from "next/router";
interface Props {
    entries: JournalEntry[];
    admin: boolean;
}

const AdminJournalReview: NextPage<Props> = ({ entries, admin }) => {
    const [isRejecting, setIsRejecting] = useState(false); //Displays the warning modal
    const [warningDismissed, setWarningDismissed] = useState(false); //Used inside the warning modal to determine whether or not it should pop up again.
    const [currentRejectingID, setRejectingID] = useState(""); //The entry IDs are stored on the buttons of each entry, and since the modal is not attached to any particular entry, it has no way of getting an entry's ID. To get the entry ID, when the Reject button is initially clicked, the ID of that particular entry is stored here so it can be used within the modal.
    const [responseStatus, setResponseStatus] = useState(0); //Used to display a success/error message.

    const handleEntryApproval = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        let response;
        const submitButton = e.target as HTMLButtonElement;
        if (submitButton.name === "approve") {
            //Approve the entry...
            response = await fetch(
                `/api/journal/review?approved=true&id=${submitButton.value}`,
                {
                    method: "PUT",
                }
            );
            setResponseStatus(response.status);
        }

        //Button by the approve button
        if (submitButton.name === "rejecting") {
            //If the user has viewed the warning modal and selects the option to not view it again, then the next time they click the reject button, the entry will be rejected.
            if (!isRejecting && warningDismissed) {
                response = await fetch(
                    `/api/journal/review?approved=false&id=${submitButton.value}`,
                    {
                        method: "PUT",
                    }
                );
                setResponseStatus(response.status);
            } else {
                setIsRejecting(true);
                setRejectingID(submitButton.value);
            }
        }

        //This button is within the reject modal. If a user chooses to not dismiss the warning, then they can click the reject button within it to reject the entry.
        if (submitButton.name === "reject") {
            //Reject here...
            setIsRejecting(false);
            response = await fetch(
                `/api/journal/review?approved=false&id=${currentRejectingID}`,
                {
                    method: "PUT",
                }
            );
            setResponseStatus(response.status);
        }
    };

    const toggleWarningDismissed = () => {
        setWarningDismissed(true);
    };

    return (
        <main className="wrapper">
            <Head>
                <title>Review Journal Entries | Mindversity Website</title>
            </Head>
            {isRejecting && (
                <div className="rejectModal">
                    <div className="modalBody">
                        <h1>Are you sure?</h1>
                        <p>
                            Continuing with this action will delete the entry
                            permanently.
                        </p>
                        <input
                            type="checkbox"
                            onClick={toggleWarningDismissed}
                        />

                        <span>Do not show this message again.</span>
                        <div className="actionButtonContainer">
                            <button
                                type="submit"
                                name="reject"
                                className="actionButton actionButtonPrimary"
                                onClick={handleEntryApproval}
                            >
                                Reject
                            </button>
                            <button
                                className="actionButton actionButtonSecondary"
                                onClick={() => {
                                    setIsRejecting(false);
                                    setRejectingID("");
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Navigation admin={admin} />

            <form className="content">
                {responseStatus === 200 && (
                    <div className="success">
                        <p>Entry action successful.</p>
                    </div>
                )}
                {responseStatus === 400 && (
                    <div className="error">
                        <p>Something went wrong. Please try again.</p>
                    </div>
                )}

                <h1 className="contentHeader">Posts to be reviewed</h1>
                {entries &&
                    entries.map(entry => {
                        return (
                            <JournalEntryComponent
                                key={entry.id}
                                entry={entry}
                                handleEntryApproval={handleEntryApproval}
                                mode="review"
                            />
                        );
                    })}
            </form>
            <style jsx>{`
                .actionButton {
                    width: 230px;
                    height: 50px;
                    border-radius: 6px;
                    font-size: 1.2rem;
                    border: 1px solid #8c69aa;
                    cursor: pointer;
                    transition: 0.5s ease;
                    align-self: flex-end;
                    margin: 10px;
                }
                .actionButtonPrimary {
                    background: #8c69aa;
                    color: white;
                }
                .actionButtonPrimary:hover {
                    filter: brightness(1.2);
                }
                .actionButtonSecondary {
                    background: white;
                    color: #8c69aa;
                }
                .actionButtonSecondary:hover {
                    filter: brightness(0.8);
                }
                .modalBody {
                    background: white;
                    width: 500px;
                    height: 300px;
                    padding: 0.5rem;
                    text-align: center;
                    align-self: center;
                }
                .success {
                    background: #a8ff9e;
                    margin: 10px;
                    border: 1px solid #095400;
                    color: #095400;
                    text-align: center;
                }
                .error {
                    background: #ff8a82;
                    margin: 10px;
                    color: #590601;
                    border: 1px solid #940900;
                    text-align: center;
                }
                @media screen and (min-width: 1000px) {
                    .content {
                        margin-left: 430px;
                        margin-right: 60px;
                        display: flex;
                        flex-direction: column;
                        height: 100vh;
                        position: relative;
                    }
                    .rejectModal {
                        width: 100%;
                        position: absolute;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.2);
                        z-index: 2;
                    }
                    .modalBody {
                        margin-left: 430px;
                        margin-right: 60px;
                    }
                }
                @media screen and (max-width: 999px) {
                    .content {
                        margin-left: 30px;
                        margin-right: 30px;
                        display: flex;
                        flex-direction: column;
                        height: 100vh;
                    }
                    .rejectModal {
                        width: 100%;
                        position: absolute;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.2);
                        z-index: 2;
                    }
                    .contentHeader {
                        text-align: center;
                    }
                }
            `}</style>
            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
                        Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </main>
    );
};

export async function getServerSideProps(context: NextPageContext) {
    const cookie = context.req?.headers.cookie;

    const resp = await fetch(`${urls.baseUrl}${urls.api.admin.validateLogin}`, {
        headers: {
            cookie: cookie!,
        },
    });

    if (resp.status === 401 && !context.req) {
        void Router.replace(`${urls.pages.portal.login}`);
        return { props: {} };
    }

    if (resp.status === 401 && context.req) {
        context.res?.writeHead(302, {
            Location: `${urls.baseUrl}`,
        });
        context.res?.end();
        return { props: {} };
    }

    //Load the journal entries that haven't been reviewed.
    const url = `${urls.baseUrl}/api/journal/getByReviewStatus?reviewed=false`;
    const response = await fetch(url, {
        method: "GET",
    });
    const json = (await response.json()) as { success: boolean; payload: JournalEntry[] };
    const entries: JournalEntry[] = json.payload;

    const loginrespjson = (await resp.json()) as { success: boolean; payload: JournalEntry[] };
    const user = (loginrespjson.payload as User) || null;
    const usersChapter = user?.role || null;

    return {
        props: {
            entries: JSON.parse(JSON.stringify(entries)) as JournalEntry[],
            admin: usersChapter == "admin" || usersChapter == "national",
        },
    };
}

export default AdminJournalReview;
