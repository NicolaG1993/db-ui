import styles from "./PlaylistElement.module.css";
import { useDispatch } from "react-redux";
import { loadSessionPlaylist } from "@/src/application/redux/slices/sessionPlaylistSlice";
import { useRouter } from "next/router";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function PlaylistElement({ el, handleDelete }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const loadPlaylist = (pl) => {
        // I think we are not fetching playlists correctly (in the parent)
        // for MOVIES: cast, pic and id missing 🧠
        console.log("🔥 loadPlaylist: ", pl);
        dispatch(loadSessionPlaylist(pl.movies));
    };

    return (
        <div className={styles.playlist}>
            <div>
                <p className={styles.title}>{el.title}</p>
                <p className={styles.created_at}>
                    {new Date(el.created_at).toUTCString()}
                </p>
            </div>

            <p>{el.movies?.length || 0} movies</p>

            <Button
                size="small"
                type="button"
                label="View"
                customStyles={customStyles}
                onClick={() => router.push(`/el/playlist/${el.id}`)}
                // className={styles.btn} // TODO? 🔴
            />
            <Button
                size="small"
                type="button"
                label="Load"
                customStyles={customStyles}
                onClick={() => loadPlaylist(el)}
                // className={styles.btn} // TODO? 🔴
            />
            <Button
                size="small"
                type="button"
                label="Delete"
                customStyles={customStyles}
                onClick={() => handleDelete(el)}
                // className={styles.btn} // TODO? 🔴
            />
        </div>
    );
}
