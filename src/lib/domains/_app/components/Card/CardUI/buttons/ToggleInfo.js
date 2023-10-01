import { addToSessionPlaylist } from "@/redux/slices/sessionPlaylistSlice";
import styles from "./Expandable.module.css";
import { useDispatch } from "react-redux";

export default function ToggleInfo({ el }) {
    return (
        <div id={styles["Expandable"]}>
            <div className={styles["icon-wrap"]}>
                <p>i</p>
            </div>
            <div className={styles.content}>
                <span className={styles.text}>Show full info</span>
            </div>
        </div>
    );
}
