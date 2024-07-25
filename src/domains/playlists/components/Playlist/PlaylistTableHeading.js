import styles from "@/src/domains/_app/constants/components/SessionPlaylist/SessionPlaylist.module.css";

export default function PlaylistTableHeading() {
    return (
        <div className={styles["list-header"]}>
            <div className={styles["header"]}>
                <p>#</p>
                <p>Title</p>
                <p>Actions</p>
            </div>
        </div>
    );
}
