import { useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
    addToSessionPlaylist,
    selectSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";

import SessionPlaylistUI from "./SessionPlaylistUI";
// import AddNewForm from "@/src/domains/_app/constants/components/SessionPlaylist/components/AddNewForm.js";
// import styles from "@/src/domains/_app/constants/components/SessionPlaylist/SessionPlaylist.module.css";
// import MovieForm from "../../../components/Form/components/Content/MovieForm";
import Form from "@/src/domains/_app/components/Form/components/Form";
import Modal from "../../../components/Modal/Modal";
import { resetFormStore } from "@/src/application/redux/slices/formSlice";
// import dataStructureForms from "@/src/application/settings/dataStructureForms";

export default function SessionPlaylist({ open, closeWidget }) {
    // const [nav, setNav] = useState(false);
    const [addNewModal, setAddNewModal] = useState(false);
    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);
    const dispatch = useDispatch();

    const openAddNew = () => {
        dispatch(resetFormStore());
        setAddNewModal(true);
    };
    const closeAddNew = () => {
        setAddNewModal(false);
    };

    // TODO: Maybe move modal out of here?
    // TODO: migliorare addNew Modal e Form
    // SPIKE: Dovrei gia poter assegnare qua valori per i nuovi movies (categories, tags, etc...)

    const addToPlaylist = (obj) => {
        const { id, title } = obj;
        // questa fn viene invocata dopo che MovieForm ha finito di creare il nuovo movie
        // voglio prenderlo e aggiungerlo in fondo alla lista
        if (id) {
            obj = { id, title: title || "Untitled" };
            dispatch(addToSessionPlaylist(obj));
        }
    };

    const addNewToPlaylist = (obj) => {
        addToPlaylist(obj);
        closeAddNew();
    };

    if (open) {
        return (
            <>
                <SessionPlaylistUI
                    sessionPlaylist={sessionPlaylist}
                    openAddNew={openAddNew}
                    close={close}
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
