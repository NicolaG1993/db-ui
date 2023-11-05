import { useState, useEffect } from "react";
import { titleValidation } from "@/src/application/utils/validateForms.js";
import styles from "@/src/domains/_app/constants/components/SessionPlaylist/components/SavePlaylistForm.module.css";

export default function SavePlaylistForm({ closeModal }) {
    /*
    • set title - if not generate unique one from date
    • user can select playlist to update instead - same thing goes for not unique title (it will update prev version)
    • empty sessionPlaylist store after saving

    Update or create new
    */

    const [title, setTitle] = useState("");
    const [isNew, setIsNew] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validateTitle(title);
    }, [title]);

    const validateTitle = (title) => {
        // validate title
        let newErrObj = {};
        if (title) {
            const titleCheck = titleValidation("title", title);
            if (titleCheck) {
                newErrObj.title = titleCheck;
            }
        }
        setErrors(newErrObj);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles["form"]}>
            <div>
                <input
                    type="text"
                    placeholder={"Title"}
                    name="title"
                    id="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                />
                {title && <div>Playlist matches / or create new...</div>}
            </div>
            <button onClick={handleSubmit}>{isNew ? "Save" : "Update"}</button>
        </div>
    );
}
