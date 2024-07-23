import Link from "next/link";
import styles from "@/src/domains/_app/constants/components/SessionPlaylist/SessionPlaylist.module.css";
import {
    deleteSessionPlaylist,
    shuffleSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";
import { useDispatch } from "react-redux";
import { resetFormStore } from "@/src/application/redux/slices/formSlice";

/*
🧠🧠🧠🧠🔴🔴🔴⚠️⚠️⚠️ 
We need to better handle the modals interactions with the 2 possible parents
Maybe a fn that just work as a redux action
With a code and a bool that returns from it, and the parent then decides what to do with it
🧠🧠🧠🧠🔴🔴🔴⚠️⚠️⚠️ 
*/

export default function PlaylistTopBar({
    totalRows,
    size,
    deletePlaylist,
    shufflePlaylist,
    handleParentUI,
}) {
    if (size === "widget") {
        return (
            <div className={styles["nav-btn"]}>
                <button
                    onClick={() => shufflePlaylist()}
                    className="button-standard"
                    disabled={!totalRows}
                >
                    Shuffle ♾️
                </button>
                {/* <button className="button-standard">Save 💾</button> */}
                <button
                    // onClick={() => closeWidget()}
                    onClick={() => handleParentUI("WIDGET", false)}
                    className="button-standard"
                >
                    <Link href={`/el/playlist/editor`} title={"Plalist editor"}>
                        Editor ➡️
                    </Link>
                </button>
                <button
                    // onClick={() => openAddNew()}
                    onClick={() => handleParentUI("ADD_NEW", true)}
                    className="button-standard"
                >
                    Add new ➕
                </button>
                <button
                    onClick={() => deletePlaylist()}
                    className="button-standard"
                    disabled={!totalRows}
                >
                    Delete ❌
                </button>
            </div>
        );
    } else {
        return (
            <div className={styles["nav-btn"]}>
                <button
                    onClick={() => shufflePlaylist()}
                    className="button-standard"
                    disabled={!totalRows}
                >
                    Shuffle ♾️
                </button>
                <button
                    // onClick={() => openSavePlaylist()}
                    onClick={() => handleParentUI("SAVE_PLAYLIST", true)}
                    className="button-standard"
                    disabled={!totalRows}
                >
                    Save 💾
                </button>
                <button>
                    <Link href={`/all/movies`} title={"Add item"}>
                        Add 🗃️
                    </Link>
                </button>
                <button
                    // onClick={() => openAddUrl()}
                    onClick={() => handleParentUI("ADD_NEW", true)}
                    className="button-standard"
                >
                    Add new ➕
                </button>
                <button
                    onClick={() => deletePlaylist()}
                    className="button-standard"
                    disabled={!totalRows}
                >
                    Delete ❌
                </button>
            </div>
        );
    }
}
