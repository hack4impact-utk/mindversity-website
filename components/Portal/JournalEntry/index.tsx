import styles from "./journalentry.module.scss";
import {EntryProp} from "contentful-management/dist/typings/entities/entry";
interface Props{
    entry: EntryProp;
    mode: string; //Because Delete Journal and Update Journal require a similar component, this prop allows us to swap out things needed in each inside this component. This keeps us from having to make two components that are basically the same thing. There's two modes: delete and review.
}
const JournalEntry: React.FC<Props> = ({entry, mode}) => {
    return(
        <form className={styles['entry']}>
            <div className={styles['entryBody']}>
                <h1 className={styles['title']}>{entry.fields.title['en-US']}</h1>
                <p className={styles['description']}>{entry.fields.description['en-US']}</p>
            </div>
            <div className={styles['actionButtonContainer']}>
                { mode === "delete" && (
                    <button className={styles['actionButton']}>Delete</button>
                ) }
                { mode === "review" && (
                    <button className={styles['actionButton']}>Review</button>
                ) }
            </div>
        </form>
    )
};
export default JournalEntry;
