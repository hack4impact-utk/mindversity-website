import React, { useState } from "react";
import Link from "next/link";
import styles from "./create.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import dynamic from "next/dynamic";
import { Delta, Sources } from "quill";
import urls from "utils/urls";
import errors from "utils/errors";

import {useRouter} from "next/router";
const ReactQuill = dynamic(import('react-quill'), { ssr: false});

interface IFormValues {
    title?: string | undefined;
    description?: string | undefined;
    image?: File | Blob | undefined;
    body?: string | undefined;
    category?: string | undefined;
    error?: boolean | undefined;
    submissionError?: boolean | undefined;
    [key: string]: string | Blob | boolean | null | undefined;
}

const CreateJournalEntry: React.FC = () => {
    const [values, setValues] = useState({} as IFormValues); //Used to store the various values that will be sent to the backend.
    const [imageURL, setImageURL] = useState("");
    const [fileTooLarge, setFileTooLarge] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    //Idea from: https://upmostly.com/tutorials/form-validation-using-custom-react-hooks
    const handleData = (e: React.SyntheticEvent) => {
        e.persist();
        const target = e.target as HTMLInputElement;
        if(target != null) {
            if(target.name == "image" && target.files != null) {
                if (target.files[0].size >= urls.CONTENTFUL_IMAGE_LIMIT) {
                    // clear past uploaded image and show error 
                    setImageURL("");
                    setValues(values => ({...values}));
                    setFileTooLarge(true);
                    return;
                }
                else {
                    setFileTooLarge(false);      
                }
                setValues(values => ({...values, [target.name]: target.files?.item(0)}));
                handleImageURL(target.files[0]);
            } else {
                setValues(values => ({
                    ...values,
                    [target.name]: target.value,
                }));
            }
        }
    };

    const handleImageURL = (image: File) => {
        const fr = new FileReader();
        //If the user cancels their file upload, an error is thrown by NextJS. To fix this, we just check to make sure that a file has been uploaded before doing any URL processing.
        if (image != null) {
            fr.onloadend = function (e: ProgressEvent<FileReader>) {
                if (e.target != null) {
                    setImageURL(e.target.result as string);
                }
            };
            fr.readAsDataURL(image);
        }
    };
    const handleChange = (content: string, delta: Delta, source: Sources, editor: any) => {
        //If the editor is empty, the only thing in it is a newline character. We don't want to send just newlines to the backend, so we do this.
        if (editor.getText() != "\n") {
            if (values.body) {
                delete values.error;
            }
            setValues(values => ({ ...values, ["body"]: editor.getHTML() }));
        } else {
            delete values.body;
        }
    };
    const handleSubmit = async (e: React.SyntheticEvent) => {
        //There's no way to put a required tag on the quill editor, so we just check to make sure there's input in it before submitting.
        e.preventDefault();
        //Clear the submission error
        if(values.submissionError){
            setValues({...values, ["submissionError"]: false});
        }

        if(!values.body){
            setValues({...values, ["error"]: true});
            return;
        }
        if (fileTooLarge) return;

        // done error checking, send form to backend
        const fd = new FormData();
        let key:string;
        setLoading(true);
        for(key in values){

            if (typeof values[key] === "string") {

                fd.append(key, values[key] as string);
            } else {
                fd.append(key, values[key] as Blob);
            }
        }
        const response = await fetch('/api/journal/create', {
            method: "POST",
            body: fd,
        });
        const data = await response.json() as {success: boolean, payload?: unknown, message?: string};
        if(data){
            //Data has been retrieved,  so loading can stop.
            setLoading(false);
            if(data.success){
                //Redirect the user back to the journals page if the request was successful.
                router.push('/journal');
            } else {
                //If there's an error in submission, this value will be set and display an error.
                setValues({...values, ["submissionError"]: true});
            }

        }
        console.log(data);
    }



    return(
        <section className={styles['container']}>
            <div className={styles['wrapper']}>
                <Link href='/journal'>
                    <a className={styles['breadcrumb']}>
                        <FaArrowLeft />
                        <span> Back to all posts</span>
                    </a>
                </Link>
                <form className={styles["create-form"]} onSubmit={handleSubmit}>
                    <div
                        className={styles["image-container"]}
                        style={imageURL ? { background: `url(${imageURL})` } : { background: "#EAE0F1" }}
                    >
                        <div className={styles["icon-container"]}>
                            <BiImageAdd className={styles["image-icon"]} />
                        </div>
                        <input type="file" name="image" className={styles['image-select']} onChange={handleData} required/>
                        <div>
                            {fileTooLarge && (
                            <span className={styles['error']}> {errors.IMAGE_TOO_LARGE} </span>
                            )}
                        </div>
                    </div>
                    <div className={styles["text-container"]}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            onChange={handleData}
                            value={values.title || ""}
                            required
                        />
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            onChange={handleData}
                            value={values.description || ""}
                            required
                        />
                        <label htmlFor="body">Body Paragraph</label>
                        <ReactQuill
                            theme="snow"
                            className={styles["editor"]}
                            placeholder="Enter your journal body here."
                            onChange={handleChange}
                        />
                        <div className={styles["select-container"]}>
                            <span>Publish to: </span>
                            <select name="category" className={styles["category"]} onChange={handleData} required>
                                <option value="">Please select a category</option>
                                <option value="vent-place">Vent Place</option>
                                <option value="creative-space">Creative Space</option>
                                <option value="resources">Resources</option>
                            </select>
                        </div>
                    </div>
                    {values.error && (
                        <span className={styles["error"]}>
                            Please enter a body paragraph.
                        </span>
                    )}
                    {values.submissionError && (
                        <span className={styles["error"]}>
                            Something went wrong. Please try again.
                        </span>
                    )}
                    <div className={styles['btnContainer']}>
                        <button type="submit" className={styles["submit"]}>
                            Publish
                        </button>
                        {loading && (
                            <div className={styles["loader"]}></div>
                        )}
                    </div>

                </form>
            </div>
        </section>
    );
};

export default CreateJournalEntry;
