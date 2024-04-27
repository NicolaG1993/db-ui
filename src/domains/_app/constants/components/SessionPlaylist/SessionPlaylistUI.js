import { useState, useEffect } from "react";
import styles from "./SessionPlaylist.module.css";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import {
    deleteSessionPlaylist,
    removeFromSessionPlaylist,
    shuffleSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";
import Link from "next/link";

export default function SessionPlaylistUI({
    sessionPlaylist,
    openAddUrl,
    close,
}) {
    // prendere array da cookie/redux

    // render objects

    /*
    Features:
        • rimuovi elemento (lista e cookie)
        • elimina lista
        • shuffle
        • minimizza/espandi 🟢
    */

    const [data, setData] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        setData(sessionPlaylist);
    }, [sessionPlaylist]);

    const removeFromPlaylist = (i) => {
        dispatch(removeFromSessionPlaylist(i));
    };

    const deletePlaylist = () => {
        dispatch(deleteSessionPlaylist());
    };

    const shufflePlaylist = () => {
        dispatch(shuffleSessionPlaylist());
    };

    return (
        <>
            <div id={styles["SessionPlaylistUI"]}>
                <div className={styles["nav-btn"]}>
                    <button onClick={() => shufflePlaylist()}>
                        Shuffle ♾️
                    </button>
                    {/* <button>Save 💾</button> */}
                    <button onClick={() => close()}>
                        <Link
                            href={`/el/playlist/editor`}
                            title={"Plalist editor"}
                        >
                            Editor ➡️
                        </Link>
                    </button>
                    <button onClick={() => openAddUrl()}>Add url ➕</button>
                    <button onClick={() => deletePlaylist()}>Delete ❌</button>
                </div>

                <div className={styles["nav-content"]}>
                    {data && data.length ? (
                        data.map((el, i) => (
                            <div
                                key={"session data " + i}
                                className={styles["row"]}
                            >
                                <Link href={`/el/movie/${el.id}`}>
                                    {el.title}
                                </Link>
                                <p onClick={() => removeFromPlaylist(i)}>X</p>
                            </div>
                        ))
                    ) : (
                        <div className={styles["no-data-row"]}>
                            <p>No data</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
