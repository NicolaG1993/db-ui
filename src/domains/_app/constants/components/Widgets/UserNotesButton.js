import styles from "./Widgets.module.css";

export default function UserNotesButton({ open, closeWidget, openWidget }) {
    return (
        <div
            id={styles["UserNotesBtn"]}
            className={`${styles["widget-btn"]} ${
                open && styles["widget-btn-selected"]
            }`}
            onClick={() => {
                open ? closeWidget() : openWidget("UserNotes");
            }}
        >
            {open ? "Minimize" : "Notes"}
        </div>
    );
}
