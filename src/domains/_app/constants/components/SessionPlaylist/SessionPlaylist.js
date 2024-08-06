import { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
    deleteSessionPlaylist,
    getSessionPlaylist,
    removeFromSessionPlaylist,
    selectSessionPlaylist,
    shuffleSessionPlaylist,
    updateSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";
import {
    openForm,
    resetFormStore,
} from "@/src/application/redux/slices/formSlice";
import PlaylistEditor from "@/src/domains/playlists/components/PlaylistEditor/PlaylistEditor";

export default function SessionPlaylist({ open, closeWidget }) {
    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSessionPlaylist());
    }, [open]);

    const openAddNew = () => {
        dispatch(resetFormStore()); // cleanup formState
        dispatch(openForm({ formLabel: "movie" })); // open Form UI
    };

    const removeFromPlaylist = (i) => {
        dispatch(removeFromSessionPlaylist(i));
    };
    const overridePlaylist = (playlist) => {
        dispatch(updateSessionPlaylist(playlist));
    };
    const clearPreviousItem = (id) => {
        if (id.toString() !== router.query.id) {
            dispatch(clearItem());
            dispatch(activateLoadingItem());
        }
    };
    const deletePlaylist = () => {
        dispatch(deleteSessionPlaylist());
    };
    const shufflePlaylist = () => {
        dispatch(shuffleSessionPlaylist());
    };

    const handleParentUI = (uiElement, status) => {
        if (uiElement === "ADD_NEW") {
            status && openAddNew();
        } else if (uiElement === "WIDGET") {
            !status && closeWidget();
        }
    };

    if (open) {
        return (
            <>
                <PlaylistEditor
                    playlist={sessionPlaylist}
                    removeFromPlaylist={removeFromPlaylist}
                    clearPreviousItem={clearPreviousItem}
                    overridePlaylist={overridePlaylist}
                    deletePlaylist={deletePlaylist}
                    shufflePlaylist={shufflePlaylist}
                    size={"widget"}
                    handleParentUI={handleParentUI}
                />
            </>
        );
    }
}
