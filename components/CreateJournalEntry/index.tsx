import React from "react";
import Link from "next/link";
import styles from "./create.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import {BiImageAdd} from "react-icons/bi";
import dynamic from "next/dynamic"
const ReactQuill = dynamic(import('react-quill'), { ssr: false});
const CreateJournalEntry: React.FC = () => {
    return(
        <section className={styles['container']}>
            <div className={styles['wrapper']}>
                <Link href='/journal'>
                    <a className={styles['breadcrumb']}>
                        <FaArrowLeft />
                        <span> Back to all posts</span>
                    </a>
                </Link>
                <form className={styles['create-form']}>
                    <div className={styles['image-container']}>
                        <div className={styles['icon-container']}>
                            <BiImageAdd className={styles['image-icon']}/>
                        </div>
                        <input type="file" name="image" className={styles['image-select']}/>
                    </div>
                    <div className={styles['text-container']}>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" placeholder="Title"/>
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" placeholder="Description" />
                        <label htmlFor="body">Body Paragraph</label>
                        <ReactQuill theme="snow" className={styles['editor']} placeholder="Enter your journal body here."/>
                        <div className={styles['select-container']}>
                            <span>Publish to: </span>
                            <select name="category" className={styles['category']}>
                                <option value="">Please select a category</option>
                                <option value="vent-place">Vent Place</option>
                                <option value="creative-space">Creative Space</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className={styles['submit']}>Publish</button>
                </form>
            </div>
        </section>
    );
};

export default CreateJournalEntry;
