import PlaylistTopBar from "../Playlist/PlaylistTopBar";
import PlaylistTableHeading from "../Playlist/PlaylistTableHeading";
import PlaylistTable from "../Playlist/PlaylistTable";
import styles from "@/src/domains/_app/constants/components/SessionPlaylist/SessionPlaylist.module.css";

export default function PlaylistEditor({
    playlist,
    removeFromPlaylist,
    clearPreviousItem,
    overridePlaylist,
    deletePlaylist,
    shufflePlaylist,
    size,
    handleParentUI,
}) {
    return (
        <div id={styles["PlaylistUI"]}>
            {size === "page" && <h1>Playlist Title</h1>}
            <PlaylistTopBar
                size={size}
                handleParentUI={handleParentUI}
                totalRows={playlist.length}
                deletePlaylist={deletePlaylist}
                shufflePlaylist={shufflePlaylist}
            />

            <PlaylistTableHeading />
            <PlaylistTable
                data={playlist}
                removeFromPlaylist={removeFromPlaylist}
                clearPreviousItem={clearPreviousItem}
                overridePlaylist={overridePlaylist}
            />
        </div>
    );
}
