import { shallowEqual, useSelector } from "react-redux";
import { selectSessionPlaylist } from "@/src/application/redux/slices/sessionPlaylistSlice";
import styles from "./Widgets.module.css";

export default function SessionPlaylistButton({
    open,
    closeWidget,
    openWidget,
}) {
    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);

    return (
        <div
            id={styles["SessionBtn"]}
            className={`${styles["widget-btn"]} ${
                open && styles["widget-btn-selected"]
            }`}
            onClick={() => {
                open ? closeWidget() : openWidget("SessionPlaylist");
                // closeAddUrl();
            }}
        >
            <span>{open ? "Minimize" : "Session Tab"}</span>
            {!open && sessionPlaylist?.length ? (
                <div className={styles["counter"]}>
                    <span>{sessionPlaylist.length}</span>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
