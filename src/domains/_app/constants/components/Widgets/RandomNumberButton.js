import { shallowEqual, useSelector } from "react-redux";
import { selectSessionPlaylist } from "@/src/application/redux/slices/sessionPlaylistSlice";
import styles from "./Widgets.module.css";

export default function RandomNumberButton({ open, closeWidget, openWidget }) {
    return (
        <div
            id={styles["RandomNumberBtn"]}
            className={`${styles["widget-btn"]} ${
                open && styles["widget-btn-selected"]
            }`}
            onClick={() => {
                open ? closeWidget() : openWidget("RandomNumberGenerator");
                // closeAddUrl();
            }}
        >
            {open ? "Minimize" : "Roll the Dice"}
        </div>
    );
}
