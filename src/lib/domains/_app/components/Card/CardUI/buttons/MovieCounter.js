import { addToSessionPlaylist } from "@/redux/slices/sessionPlaylistSlice";
import styles from "./Expandable.module.css";
import { useDispatch } from "react-redux";

export default function MovieCounter({ el }) {
    return (
        <div id={styles["Expandable"]}>
            <div className={styles["icon-wrap"]}>
                <p>👁️</p>
            </div>
            <div className={styles.content}>
                <span className={styles.text}>Total Views</span>
            </div>
        </div>
    );
}
