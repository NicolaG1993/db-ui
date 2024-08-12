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
import { Button, IconTrash } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

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
            console.log("⭐ fetchAllPlaylists: ", data);
            setAllPlaylists(data);
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
                    <Button
                        size="large"
                        label="Session playlist editor"
                        customStyles={customStyles}
                        onClick={() => router.push("/el/playlist/editor")}
                        icon={<IconTrash />}
                    />
                    <Button
                        size="large"
                        label="Tournament Session"
                        customStyles={customStyles}
                        onClick={() => router.push("/el/playlist/tournament")}
                        icon={<IconTrash />}
                    />
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
                            <Button
                                size="medium"
                                label="Go back"
                                customStyles={customStyles}
                                onClick={cancelDelete}
                            />
                            <Button
                                size="medium"
                                label="Delete"
                                customStyles={customStyles}
                                colorScheme={"danger"}
                                onClick={() => confirmDelete()}
                            />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

// Fare component importabile in tutta app per errors
