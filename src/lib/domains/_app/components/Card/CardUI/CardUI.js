import MovieCounter from "./buttons/MovieCounter";
import SessionPlaylistAddBtn from "./buttons/SessionPlaylistAddBtn";
import ToggleInfo from "./buttons/ToggleInfo";
import styles from "./CardUI.module.css";

export default function CardUI({ obj, label }) {
    return (
        <div className={styles["movie-card-ui"]}>
            {label === "movie" && (
                <>
                    <SessionPlaylistAddBtn
                        obj={{ id: obj.id, title: obj.title }}
                    />
                    <MovieCounter />
                    <ToggleInfo />
                </>
            )}
            {label === "actor" && <></>}
        </div>
    );
}