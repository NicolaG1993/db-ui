import { addToSessionPlaylist } from "@/redux/slices/sessionPlaylistSlice";
import styles from "./SessionPlaylistBtns.module.css";
import { useDispatch } from "react-redux";

export default function SessionPlaylistAddBtn({ el }) {
    const dispatch = useDispatch();

    const addToPlaylist = async (obj) => {
        dispatch(addToSessionPlaylist(obj));
    };

    return (
        <div
            id={styles["SessionPlaylistAddBtn"]}
            onClick={() => addToPlaylist(el)}
        >
            <p>+</p>
        </div>
    );
}
