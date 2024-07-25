import { useEffect, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
    addToSessionPlaylist,
    deleteSessionPlaylist,
    getSessionPlaylist,
    removeFromSessionPlaylist,
    selectSessionPlaylist,
    shuffleSessionPlaylist,
    updateSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";
import Form from "@/src/domains/_app/components/Form/components/Form";
import Modal from "@/src/domains/_app/components/Modal/Modal";
import { resetFormStore } from "@/src/application/redux/slices/formSlice";
import PlaylistEditor from "@/src/domains/playlists/components/PlaylistEditor/PlaylistEditor";

export default function SessionPlaylist({ open, closeWidget }) {
    const [addNewModal, setAddNewModal] = useState(false);
    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        getSessionPlaylist();
    }, [open]);

    ////////////////////////
    // !PLAYLIST ACTIONS! //
    ////////////////////////
    const openAddNew = () => {
        dispatch(resetFormStore());
        setAddNewModal(true);
    };
    const closeAddNew = () => {
        setAddNewModal(false);
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
    ////////////////////////
    ////////////////////////

    // TODO: Maybe move modal out of here?
    // TODO: migliorare addNew Modal e Form
    // SPIKE: Dovrei gia poter assegnare qua valori per i nuovi movies (categories, tags, etc...)

    ////////////////////////
    // !MODAL ACTIONS! //
    ////////////////////////
    const addNewToPlaylist = (obj) => {
        const { id, title } = obj;
        // questa fn viene invocata dopo che MovieForm ha finito di creare il nuovo movie
        // voglio prenderlo e aggiungerlo in fondo alla lista
        if (id) {
            obj = { id, title: title || "Untitled" };
            dispatch(addToSessionPlaylist(obj));
        }
        closeAddNew();
    };
    ////////////////////////
    ////////////////////////

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

                <Modal isOpen={addNewModal} onClose={closeAddNew}>
                    <Form
                        formLabel={"movie"}
                        handleEditsInParent={addNewToPlaylist}
                        parentIsWaiting={true}
                    />
                </Modal>
            </>
        );
    }
}
