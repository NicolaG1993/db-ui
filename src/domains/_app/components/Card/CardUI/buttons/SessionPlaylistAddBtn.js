import {
    addToSessionPlaylist,
    removeElementFromSessionPlaylist,
    selectSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";
import styles from "./Expandable.module.css";
import { useState, useEffect } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";

export default function SessionPlaylistAddBtn({ el }) {
    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);
    const dispatch = useDispatch();

    const [isClone, setIsClone] = useState(false);

    const addToPlaylist = async (obj) => {
        dispatch(addToSessionPlaylist(obj));
    };
    const deleteFromPlaylist = async (obj) => {
        dispatch(removeElementFromSessionPlaylist(obj));
    };

    useEffect(() => {
        // get only db elements - not urls
        const allIds = sessionPlaylist
            .filter((obj) => obj.id)
            .map(({ id }) => id);

        if (!allIds.includes(el.id)) {
            setIsClone(false);
        } else {
            setIsClone(true);
        }
    }, [sessionPlaylist]);

    return (
        <div id={styles["Expandable"]}>
            {isClone ? (
                <>
                    <div
                        className={styles["icon-wrap"]}
                        onClick={() => deleteFromPlaylist(el)}
                    >
                        <p>-</p>
                    </div>
                    <div className={styles.content}>
                        <span className={styles.text}>Inside session</span>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className={styles["icon-wrap"]}
                        onClick={() => addToPlaylist(el)}
                    >
                        <p>+</p>
                    </div>
                    <div className={styles.content}>
                        <span className={styles.text}>Add to session</span>
                    </div>
                </>
            )}
        </div>
    );
}

// 🧠 Faccio tutti i pulsanti (rendundant files) e alla fine cerco di ridurli a component dinamici o quasi
