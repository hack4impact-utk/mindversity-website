import styles from "./journalentry.module.scss";
import {JournalEntry} from "utils/types";
import {useState} from "react";
interface Props{
    entry: JournalEntry;
    mode: string; //Because Delete Journal and Update Journal require a similar component, this prop allows us to swap out things needed in each inside this component. This keeps us from having to make two components that are basically the same thing. There's two modes: delete and review.
}
const JournalEntryComponent: React.FC<Props> = ({entry, mode}) => {
    const handleEntryApproval = (e:React.SyntheticEvent) => {
        e.preventDefault();
        let submitButton = e.target as HTMLButtonElement;
        if(submitButton.name === "approve"){
            //Approve the entry...
        }
        if(submitButton.name === "reject"){
            //Reject it and display some kind of modal that explains to the user that they are deleting the post. 
        }
    };
    return(
        <form className={styles['entry']}>
            <div className={styles['entryBody']}>
                <h1 className={styles['title']}>{entry.title}</h1>
                <p className={styles['description']}>{entry.description}</p>
            </div>
            <div className={styles['actionButtonContainer']}>
                { mode === "delete" && (
                    <button className={styles['actionButton']}>Delete</button>
                ) }
                { mode === "review" && (
                    <div>
                        <button name="approve" type="submit" className={`${styles['actionButtonPrimary']} ${styles['actionButton']}`} onClick={handleEntryApproval} value={entry.id}>Approve</button>
                        <button name="reject" type="submit" className={`${styles['actionButtonSecondary']} ${styles['actionButton']}`} onClick={handleEntryApproval} value={entry.id}>Reject</button>
                    </div>
                ) }
            </div>
        </form>
    )
};
export default JournalEntryComponent;
