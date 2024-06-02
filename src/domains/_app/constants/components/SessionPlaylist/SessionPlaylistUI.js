import { useState, useEffect } from "react";
import styles from "./SessionPlaylist.module.css";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import {
    deleteSessionPlaylist,
    removeFromSessionPlaylist,
    shuffleSessionPlaylist,
    updateSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";
import Link from "next/link";
import moveArrayItem from "@/src/domains/_app/utils/moveArrayItem";
import {
    activateLoadingItem,
    clearItem,
} from "@/src/application/redux/slices/itemSlice";
import { useRouter } from "next/router";

export default function SessionPlaylistUI({
    sessionPlaylist,
    openAddNew,
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
    const router = useRouter();

    const removeFromPlaylist = (i) => {
        dispatch(removeFromSessionPlaylist(i));
    };

    const deletePlaylist = () => {
        dispatch(deleteSessionPlaylist());
    };

    const shufflePlaylist = () => {
        dispatch(shuffleSessionPlaylist());
    };

    const overridePlaylist = (playlist) => {
        dispatch(updateSessionPlaylist(playlist));
    };

    const clearPreviousItem = (id) => {
        console.log("clearPreviousItem:", {
            clickedItemID: id.toString(),
            pageID: router.query.id,
        });
        if (id.toString() !== router.query.id) {
            dispatch(clearItem());
            dispatch(activateLoadingItem());
        }
    };

    const createOrderOptions = (data, rawIndex) =>
        data.map((el, i) => {
            return (
                <option
                    key={`order option: ${i + 1} ${rawIndex + 1}`}
                    value={i}
                >
                    {i + 1}
                </option>
            );
        });

    const orderList = ({ oldIndex, newIndex, data }) => {
        const newData = moveArrayItem(data, oldIndex, newIndex);
        overridePlaylist(newData);
    };

    useEffect(() => {
        setData(sessionPlaylist);
    }, [sessionPlaylist]);

    return (
        <>
            <div id={styles["SessionPlaylistUI"]}>
                <div className={styles["nav-btn"]}>
                    <button
                        onClick={() => shufflePlaylist()}
                        className="button-standard"
                    >
                        Shuffle ♾️
                    </button>
                    {/* <button className="button-standard">Save 💾</button> */}
                    <button onClick={() => close()} className="button-standard">
                        <Link
                            href={`/el/playlist/editor`}
                            title={"Plalist editor"}
                        >
                            Editor ➡️
                        </Link>
                    </button>
                    <button
                        onClick={() => openAddNew()}
                        className="button-standard"
                    >
                        Add new ➕
                    </button>
                    <button
                        onClick={() => deletePlaylist()}
                        className="button-standard"
                    >
                        Delete ❌
                    </button>
                </div>

                <div className={styles["list-header"]}>
                    <div className={styles["header"]}>
                        <p>#</p>
                        <p>Title</p>
                        <p>Actions</p>
                    </div>
                </div>

                <div className={styles["movie-list"]}>
                    {data && data.length ? (
                        data.map((el, i) => (
                            <div
                                key={"session data " + i}
                                className={styles["row"]}
                            >
                                <select
                                    name="selectListPosition"
                                    value={i}
                                    onChange={(e) =>
                                        orderList({
                                            oldIndex: i,
                                            newIndex: Number(e.target.value),
                                            data,
                                        })
                                    }
                                >
                                    {createOrderOptions(data, i)}
                                </select>
                                <Link
                                    href={`/el/movie/${el.id}`}
                                    onClick={() => clearPreviousItem(el.id)}
                                >
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
