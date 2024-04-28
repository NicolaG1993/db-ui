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
// import dataStructureForms from "@/src/application/settings/dataStructureForms";

export default function SessionPlaylist({ open, closeWidget }) {
    // const [nav, setNav] = useState(false);
    const [addNewModal, setAddNewModal] = useState(false);
    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);
    const dispatch = useDispatch();

    const openAddNew = () => {
        setAddNewModal(true);
    };
    const closeAddNew = () => {
        setAddNewModal(false);
    };

    // TODO: Maybe move modal out of here?
    // TODO: migliorare addNew Modal e Form
    // SPIKE: Dovrei gia poter assegnare qua valori per i nuovi movies (categories, tags, etc...)

    const addToPlaylist = (obj) => {
        console.log("OBJ: ", obj);
        const { id, title } = obj;
        // questa fn viene invocata dopo che MovieForm ha finito di creare il nuovo movie
        // voglio prenderlo e aggiungerlo in fondo alla lista
        if (id) {
            obj = { id, title: title || "Untitled" };
            dispatch(addToSessionPlaylist(obj));
        }
    };

    if (open) {
        return (
            <>
                <SessionPlaylistUI
                    sessionPlaylist={sessionPlaylist}
                    openAddNew={openAddNew}
                    close={close}
                />

                {addNewModal && (
                    <div id={"Overlay"}>
                        <div className={"overlayWindow"}>
                            <div className={"topBar"}>
                                <span onClick={closeAddNew}>X</span>
                            </div>
                            <Form
                                topicLabel={"movie"}
                                handleEditsInParent={addToPlaylist}
                                parentIsWaiting={true}
                            />
                        </div>
                    </div>
                )}
            </>
        );
    }
}
