import React from "react";
import { Resource } from "utils/types";
import style from "./resourcecard.module.scss";
import { ObjectID } from "mongodb";

interface Props {
    reso: Resource;
    onDelete(id: ObjectID | string | undefined): void;
}

const ResourceCardComp: React.FC<Props> = ({ reso, onDelete }) => {
    return (
        <div className={style.resourceCard}>
            <div className={style.resourceCardText}>
                <div className={style.resourceCardTitle}>
                    <div className={style.resourceName}>{reso.name}</div>
                    <div className={style.resourceLink}>{reso.link}</div>
                </div>
            </div>
            <div className={style.resourceCardBtn}>
                <a className={style.editResourceBtn} href={`resources/${(reso._id as unknown) as string}`}>
                    Edit
                </a>
            </div>
            <div className={style.resourceCardBtn}>
                <button className={style.editResourceBtn} onClick={() => onDelete(reso._id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ResourceCardComp;
