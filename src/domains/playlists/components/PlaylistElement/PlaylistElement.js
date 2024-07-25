import Link from "next/link";
import styles from "./PlaylistElement.module.css";
import { useDispatch } from "react-redux";
import { loadSessionPlaylist } from "@/src/application/redux/slices/sessionPlaylistSlice";

export default function PlaylistElement({ el, handleDelete }) {
    const dispatch = useDispatch();

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

            <Link href={`/el/playlist/${el.id}`} title={el.title}>
                <button className={styles.btn}>View</button>
            </Link>

            <button className={styles.btn} onClick={() => loadPlaylist(el)}>
                Load
            </button>
            <button className={styles.btn} onClick={() => handleDelete(el)}>
                Delete
            </button>
        </div>
    );
}
