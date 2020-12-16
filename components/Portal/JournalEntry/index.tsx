import styles from "./journalentry.module.scss";
import {JournalEntry} from "utils/types";
interface Props{
    entry: JournalEntry;
    mode: string; //Because Delete Journal and Update Journal require a similar component, this prop allows us to swap out things needed in each inside this component. This keeps us from having to make two components that are basically the same thing. There's two modes: delete and review.
    handleEntryApproval: any;
}
const JournalEntryComponent: React.FC<Props> = ({entry, mode, handleEntryApproval}) => {
    return(
        <div className={styles['entry']}>
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
                        <button name="approve" type="submit" className={`${styles['actionButtonPrimary']} ${styles['actionButton']}`} onClick={(e:React.SyntheticEvent) => handleEntryApproval(e)} value={entry.id}>Approve</button>
                        <button name="rejecting" type="submit" className={`${styles['actionButtonSecondary']} ${styles['actionButton']}`} onClick={(e:React.SyntheticEvent) => handleEntryApproval(e)} value={entry.id}>Reject</button>
                    </div>
                ) }
            </div>
        </div>
    )
};
export default JournalEntryComponent;
