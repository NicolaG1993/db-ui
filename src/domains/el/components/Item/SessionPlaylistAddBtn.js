// There is another component with the same name, same code - different design
// but it's used in the cards domain
import {
    addToSessionPlaylist,
    removeElementFromSessionPlaylist,
    selectSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";
import { useState, useEffect } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

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
            ? sessionPlaylist.filter((obj) => obj.id).map(({ id }) => id)
            : [];

        if (!allIds.includes(el.id)) {
            setIsClone(false);
        } else {
            setIsClone(true);
        }
    }, [sessionPlaylist]);

    return isClone ? (
        <Button
            size="mini"
            type="button"
            label="Remove from session"
            customStyles={customStyles}
            onClick={() => deleteFromPlaylist(el)}
        />
    ) : (
        <Button
            size="mini"
            type="button"
            label="Add to session"
            customStyles={customStyles}
            onClick={() => addToPlaylist(el)}
        />
    );
}
