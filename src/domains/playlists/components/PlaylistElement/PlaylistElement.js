import Link from "next/link";
import styles from "./PlaylistElement.module.css";

export default function PlaylistElement({ el }) {
    return (
        <div className={styles.playlist}>
            <div>
                <p className={styles.title}>{el.title}</p>
                <p className={styles.created_at}>
                    {new Date(el.created_at).toUTCString()}
                </p>
            </div>

            <p>{el.movies.length} movies</p>

            <Link href={`/el/playlist/${el.id}`} title={el.title}>
                <button className={styles.btn}>View</button>
            </Link>

            <button className={styles.btn}>Load</button>
            <button className={styles.btn}>Delete</button>
        </div>
    );
}
