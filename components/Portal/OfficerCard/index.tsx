import React from 'react'
import { Officer } from 'utils/types'
import style from './officercard.module.scss';

interface Props {
    officer: Officer;
}

const OfficerCard: React.FC<Props> = ({ officer }) => {
    return (
        <div className={style.chapterCard}>
            <div className={style.chapterCardText}>
                <div className={style.chapterCardTitle}>
                    <div className={style.chapterName}>{officer.name}</div>
                    <div className={style.chapterLocation}>{officer.role}</div>
                </div>
            </div>
            <div className={style.chapterCardBtn}>
                <a className={style.editChapterBtn} href={"officers/" + officer._id}>Delete</a>
            </div>
        </div>
    );
};

export default OfficerCard;
