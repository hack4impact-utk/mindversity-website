import React from 'react'
import { Officer } from 'utils/types'
import style from './officercard.module.scss';

interface Props {
    officer: Officer;
    handleDelete: any;
}

const OfficerCard: React.FC<Props> = ({ officer, handleDelete }) => {
    return (
        <div className={style.chapterCard}>
            <div className={style.chapterCardText}>
                <div className={style.chapterCardTitle}>
                    <div className={style.chapterName}>{officer.name}</div>
                    <div className={style.chapterLocation}>{officer.role}</div>
                </div>
            </div>
            <div className={style.chapterCardBtn}>
                <button className={style.editChapterBtn} onClick={(e:React.SyntheticEvent) => handleDelete(e)} value={String(officer._id)}>Delete</button>
            </div>
        </div>
    );
};

export default OfficerCard;
