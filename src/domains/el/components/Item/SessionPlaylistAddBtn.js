// There is another component with the same name, same code - different design
// but it's used in the cards domain
import {
    addToSessionPlaylist,
    removeElementFromSessionPlaylist,
    selectSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";
// import styles from "@/src/application/styles/Element.module.css";
import { useState, useEffect } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";

export default function SessionPlaylistAddBtn({ el }) {
    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);
    const dispatch = useDispatch();

    const [isClone, setIsClone] = useState(false);

    const addToPlaylist = (obj) => {
        dispatch(addToSessionPlaylist(obj));
    };
    const deleteFromPlaylist = (obj) => {
        dispatch(removeElementFromSessionPlaylist(obj));
    };

    useEffect(() => {
        const allIds = sessionPlaylist
            .filter((obj) => obj.id)
            .map(({ id }) => id);

        if (!allIds.includes(el.id)) {
            setIsClone(false);
        } else {
            setIsClone(true);
        }
    }, [sessionPlaylist]);

    return isClone ? (
        <button
            onClick={() => deleteFromPlaylist(el)}
            className="button-standard"
        >
            Remove from session
        </button>
    ) : (
        <button onClick={() => addToPlaylist(el)} className="button-standard">
            Add to session
        </button>
    );
}
