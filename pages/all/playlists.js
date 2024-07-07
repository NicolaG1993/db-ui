import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserState } from "@/src/application/redux/slices/userSlice.js";
// import axios from "axios";
// import Link from "next/link";

import PlaylistsList from "@/src/domains/playlists/components/PlaylistsList/PlaylistsList.js";
import fetchAllPlaylists from "@/src/domains/playlists/actions/fetchAllPlaylists.js";
import deletePlaylist from "@/src/domains/playlists/actions/deletePlaylist.js";

import styles from "@/src/application/styles/Records.module.css"; // 🧠❌ Wrong file location, create a separate one or move rest to global
import { useRouter } from "next/router";

export default function Playlists() {
    const router = useRouter();
    let userInfo = useSelector(selectUserState);

    const [allPlaylists, setAllPlaylists] = useState([]);
    const [elToDelete, setElToDelete] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getAllPlaylists();
    }, []);

    const getAllPlaylists = async () => {
        try {
            let data = await fetchAllPlaylists("", userInfo.id);
            setAllPlaylists(data);
            console.log("data: ", data);
        } catch (err) {
            console.log("err: ", err);
            setErrors({ server: err });
        }
    };

    const handleDelete = (el) => {
        setElToDelete(el);
    };
    const cancelDelete = async () => {
        setElToDelete();
    };
    const confirmDelete = async () => {
        try {
            await deletePlaylist(elToDelete.id); // FIX ME 🧨
            getAllPlaylists();
        } catch (err) {
            console.log("err: ", err);
            setErrors({ server: err });
        }
        setElToDelete();
    };

    // Why using global styles here???!?!?! 🧠🧠🧠 idk
    // maybe becasue this is part of design standards i created (like "main")
    return (
        <main>
            <div className={"heading"}>
                <h1>YOUR PLAYLISTS</h1>
                <div className={styles.buttonsWrap}>
                    <button
                        className={"button-standard button-with-icon"}
                        onClick={() => router.push("/el/playlist/editor")}
                    >
                        <div>
                            <span>🪄</span>
                        </div>
                        <span>Session playlist editor</span>
                    </button>

                    <button
                        className={"button-standard button-with-icon"}
                        onClick={() => router.push("/el/playlist/tournament")}
                    >
                        <div>
                            <span>🏁</span>
                        </div>
                        <span>Tournament Session</span>
                    </button>

                    {/* <Link
                        href={`/el/playlist/editor`}
                        title={"Playlist Editor"}
                        className={styles.fakeBtn + " " + "button-standard"}
                    >
                        🪄 Session playlist editor →
                    </Link> 
                    <Link
                        href={`/el/playlist/tournament`}
                        title={"Tournament Session"}
                        className={styles.fakeBtn + " " + "button-standard"}
                    >
                        🏁 Tournament Session →
                    </Link>
                    */}
                </div>
            </div>

            <PlaylistsList
                allPlaylists={allPlaylists}
                handleDelete={handleDelete}
            />

            {Object.entries(errors).length > 0 &&
                Object.entries(errors).map(([key, value]) => (
                    <div key={"error: " + key}>
                        <p>ERROR {key}:</p>
                        <p>{value}</p>
                    </div>
                ))}

            {elToDelete && (
                <div className={"modal"}>
                    <div className={"modal-container"}>
                        <span className={"modal-close"} onClick={cancelDelete}>
                            X
                        </span>

                        <div>
                            <p>
                                <strong>
                                    Delete playlist {elToDelete.title}
                                </strong>
                            </p>
                            <p>
                                Are you sure you want to delete{" "}
                                <strong>{elToDelete.title}</strong>? This
                                playlist will be forever lost
                            </p>
                            <button
                                onClick={cancelDelete}
                                className="button-standard"
                            >
                                Go back
                            </button>
                            <button
                                onClick={() => confirmDelete()}
                                className="button-danger"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

// Fare component importabile in tutta app per errors
