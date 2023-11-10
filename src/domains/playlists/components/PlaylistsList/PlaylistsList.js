import PlaylistElement from "@/src/domains/playlists/components/PlaylistElement/PlaylistElement.js";
import styles from "./PlaylistsList.module.css";

export default function PlaylistsList({ allPlaylists }) {
    return (
        <div>
            {allPlaylists?.length ? (
                allPlaylists.map((el) => (
                    <PlaylistElement el={el} key={"Playlist: " + el.id} />
                ))
            ) : (
                <p>No playlists</p>
            )}
        </div>
    );
}
