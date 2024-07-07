import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    selectSessionPlaylist,
    deleteSessionPlaylist,
    removeFromSessionPlaylist,
    shuffleSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";
// import axios from "axios";
import Link from "next/link";
import AddNewForm from "@/src/domains/_app/constants/components/SessionPlaylist/components/AddNewForm.js";
import SavePlaylistForm from "@/src/domains/_app/constants/components/SessionPlaylist/components/SavePlaylistForm.js";
import styles from "@/src/domains/_app/constants/components/SessionPlaylist/SessionPlaylist.module.css";
import { useRouter } from "next/router";

export default function PlaylistEditor() {
    // TODO: shows playlist in store ✅
    // add items from db -> go to "/all/movies" ✅
    // add urls from input ✅
    // delete items ✅
    // modify order (drag)
    // on every change update store playlist

    // BUTTONS:
    // shuffle ✅
    // 🧠 save and name playlist in db -- user can select existing playlist to overwrite from list before submit
    // delete all ✅

    // NB. Playlist creation only in SessionPlaylistUI -> to edit, user has to load it SessionPlalistUI first, then open the editor and overwrite previos save

    // REDUX //
    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);
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

    // COMPONENT STATE //
    const [addUrlModal, setAddUrlModal] = useState(false);
    const [saveModal, setSaveModal] = useState(false);

    const openAddUrl = () => {
        setSaveModal(false);
        setAddUrlModal(true);
    };
    const openSavePlaylist = () => {
        console.log("openSavePlaylist invoked");
        setAddUrlModal(false);
        setSaveModal(true);
    };
    const closeModal = () => {
        setAddUrlModal(false);
        setSaveModal(false);
    };

    return (
        <main>
            <div className={"heading"}>
                <h1>PLAYLISTS EDITOR</h1>
                {/* <Link href={`/all/playlists`} title={"All playlists"}>
                    ← All playlists
                </Link> */}
                <button
                    className={"button-standard button-with-icon"}
                    onClick={() => router.push("/el/playlist/tournament")}
                >
                    <div>
                        <span>◀</span>
                    </div>
                    <span>All playlists</span>
                </button>
            </div>
            <div className={styles["nav-btn"]}>
                <button
                    onClick={() => shufflePlaylist()}
                    className="button-standard"
                >
                    Shuffle ♾️
                </button>
                <button
                    onClick={() => openSavePlaylist()}
                    className="button-standard"
                >
                    Save 💾
                </button>
                <button>
                    <Link href={`/all/movies`} title={"Add item"}>
                        Add 🗃️
                    </Link>
                </button>
                <button
                    onClick={() => openAddUrl()}
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
            <div className={styles["nav-content"]}>
                {sessionPlaylist && sessionPlaylist.length ? (
                    sessionPlaylist.map((el, i) => (
                        <div
                            key={"session data " + i}
                            className={styles["row"]}
                        >
                            <Link href={`/el/movie/${el.id}`}>{el.title}</Link>
                            <p onClick={() => removeFromPlaylist(i)}>X</p>
                        </div>
                    ))
                ) : (
                    <div className={styles["no-data-row"]}>
                        <p>No data</p>
                    </div>
                )}
            </div>

            {/* vedi session playlist */}
            {addUrlModal && (
                <div className={"modal"}>
                    <div className={"modal-container"}>
                        <span className={"modal-close"} onClick={closeModal}>
                            X
                        </span>
                        <AddNewForm closeModal={closeModal} />
                    </div>
                </div>
            )}

            {saveModal && (
                <div className={"modal"}>
                    <div className={"modal-container"}>
                        <span className={"modal-close"} onClick={closeModal}>
                            X
                        </span>
                        <SavePlaylistForm
                            closeModal={closeModal}
                            sessionPlaylist={sessionPlaylist}
                        />
                    </div>
                </div>
            )}
        </main>
    );
}
