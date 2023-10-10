import { addToSessionPlaylist } from "@/src/application/redux/slices/sessionPlaylistSlice";
import styles from "./Expandable.module.css";
import { useDispatch } from "react-redux";

export default function SessionPlaylistAddBtn({ el }) {
    const dispatch = useDispatch();

    const addToPlaylist = async (obj) => {
        dispatch(addToSessionPlaylist(obj));
    };

    return (
        <div id={styles["Expandable"]}>
            <div
                className={styles["icon-wrap"]}
                onClick={() => addToPlaylist(el)}
            >
                <p>+</p>
            </div>
            <div className={styles.content}>
                <span className={styles.text}>Add to session</span>
            </div>
        </div>
    );
}

// 🧠 Faccio tutti i pulsanti (rendundant files) e alla fine cerco di ridurli a component dinamici o quasi
