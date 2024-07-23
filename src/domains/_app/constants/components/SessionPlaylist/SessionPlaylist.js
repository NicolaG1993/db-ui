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

// import AddNewForm from "@/src/domains/_app/constants/components/SessionPlaylist/components/AddNewForm.js";
import styles from "@/src/domains/_app/constants/components/SessionPlaylist/SessionPlaylist.module.css";
// import MovieForm from "../../../components/Form/components/Content/MovieForm";
import Form from "@/src/domains/_app/components/Form/components/Form";
import Modal from "@/src/domains/_app/components/Modal/Modal";
import { resetFormStore } from "@/src/application/redux/slices/formSlice";

import { useRouter } from "next/router";
import PlaylistEditor from "@/src/domains/playlists/components/PlaylistEditor/PlaylistEditor";
import moveArrayItem from "../../../utils/moveArrayItem";
// import dataStructureForms from "@/src/application/settings/dataStructureForms";

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
        } else if (uiElement === "SAVE_PLAYLIST") {
            status && openSavePlaylist();
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
                {/* <SessionPlaylistUI
                    sessionPlaylist={sessionPlaylist}
                    openAddNew={openAddNew}
                    closeAddNew={closeAddNew} // ??
                    closeWidget={closeWidget} // ??
                /> */}

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
                {/* {addNewModal && (
                    <div id={"Overlay"}>
                        <div className={"overlayWindow"}>
                            <div className={"topBar"}>
                                <span onClick={closeAddNew}>X</span>
                            </div>
                            <Form
                                formLabel={"movie"}
                                handleEditsInParent={addNewToPlaylist}
                                parentIsWaiting={true}
                            />
                        </div>
                    </div>
                )} */}
            </>
        );
    }
}
