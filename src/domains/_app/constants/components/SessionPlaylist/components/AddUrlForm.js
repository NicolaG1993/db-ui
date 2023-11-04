import { useState } from "react";
import {
    addToSessionPlaylist,
    selectSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import styles from "@/src/domains/_app/constants/components/SessionPlaylist/SessionPlaylist.module.css";
import {
    titleValidation,
    urlValidation,
} from "@/src/application/utils/validateForms.js";

export default function AddUrlForm({ closeAddUrl }) {
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState({});

    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);
    const dispatch = useDispatch();

    const validateData = () => {
        // validate state
        let newErrObj = {};

        const urlCheck = urlValidation(url); // if buggy use: textValidation(url);
        if (urlCheck) {
            newErrObj.url = urlCheck;
        }

        if (title) {
            const titleCheck = titleValidation("title", title);
            if (titleCheck) {
                newErrObj.title = titleCheck;
            }
        }

        if (Object.keys(newErrObj).length === 0) {
            handleSubmit();
        } else {
            setErrors(newErrObj);
        }
    };

    const handleSubmit = async () => {
        //check for clones // get only url based objects - not db elements
        const allUrls = sessionPlaylist
            .filter((el) => el.url)
            .map(({ url }) => url);

        if (!allUrls.includes(url)) {
            // add to store and close form
            const obj = { url, title: title ? title : "untitled" };
            dispatch(addToSessionPlaylist(obj));
            closeAddUrl();
        } else {
            setErrors({ url: "This url is already in the playlist" });
        }
    };

    return (
        <div className={styles["url-form"]}>
            <input
                type="text"
                placeholder={"Url"}
                name="url"
                id="Url"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
            />
            <input
                type="text"
                placeholder={"Title (optional)"}
                name="title"
                id="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <button onClick={validateData}>Confirm</button>

            {Object.keys(errors).lenght !== 0 && (
                <div className={styles["form-error"]}>
                    {errors.title && <p>• Title: {errors.title}</p>}
                    {errors.url && <p>• Url: {errors.url}</p>}
                </div>
            )}
        </div>
    );
}
