import { useState, useEffect } from "react";
import styles from "./UserNotes.module.css";

export default function UserNotes() {
    const [notes, setNotes] = useState();

    const handleNotes = (e) => {
        e.preventDefault();
        setNotes(e.target.value);
        sessionStorage.setItem("db-ui-user-notes", e.target.value);
    };

    useEffect(() => {
        window.sessionStorage.getItem("db-ui-user-notes") &&
            setNotes(sessionStorage.getItem("db-ui-user-notes"));
    }, []);

    return (
        <div id={styles["UserNotes"]} className={styles["form-wrap"]}>
            <div className={styles["box"]}>
                <h3>Notes</h3>
                <textarea
                    name="notes"
                    cols="30"
                    rows="10"
                    value={notes}
                    onChange={(e) => handleNotes(e)}
                ></textarea>
            </div>
        </div>
    ); // 🧠 Si potrebbe creare component InputTextArea.js 🧠
}
