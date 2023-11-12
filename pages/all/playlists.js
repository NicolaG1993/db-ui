import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserState } from "@/src/application/redux/slices/userSlice.js";
// import axios from "axios";
// import Link from "next/link";

import PlaylistsList from "@/src/domains/playlists/components/PlaylistsList/PlaylistsList.js";
import fetchAllPlaylists from "@/src/domains/playlists/actions/fetchAllPlaylists.js";
import deletePlaylist from "@/src/domains/playlists/actions/deletePlaylist.js";

import styles from "@/src/application/styles/Records.module.css";

export default function Playlists() {
    // TODO: shows all playlists and links to them
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

    return (
        <main>
            <div className={styles.heading}>
                <h1>ALL PLAYLISTS</h1>
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
                            <button onClick={cancelDelete}>Go back</button>
                            <button onClick={() => confirmDelete()}>
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
