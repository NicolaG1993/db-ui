import { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";

import PlaylistsList from "@/src/domains/playlists/components/PlaylistsList/PlaylistsList.js";
import fetchAllPlaylists from "@/src/domains/playlists/actions/fetchAllPlaylists.js";

import styles from "@/src/application/styles/Records.module.css";

export default function Playlists() {
    // TODO: shows all playlists and links to them
    const [allPlaylists, setAllPlaylists] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getAllPlaylists();
    }, []);

    const getAllPlaylists = async () => {
        try {
            let data = await fetchAllPlaylists();
            setAllPlaylists(data);
            console.log("data: ", data);
        } catch (err) {
            console.log("err: ", err);
            setErrors({ server: err });
        }
    };

    return (
        <main>
            <div className={styles.heading}>
                <h1>ALL PLAYLISTS</h1>
            </div>

            <PlaylistsList allPlaylists={allPlaylists} />

            {/* NOT WORKING */}
            {Object.entries(errors).lenght > 0 &&
                Object.entries(errors).map(([key, value]) => (
                    <div key={"error: " + key}>
                        <p>ERROR {key}:</p>
                        <p>{value}</p>
                    </div>
                ))}
        </main>
    );
}

// Fare component importabile in tutta app per errors
