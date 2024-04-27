import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { selectSessionPlaylist } from "@/src/application/redux/slices/sessionPlaylistSlice";

import SessionPlaylistUI from "./SessionPlaylistUI";
import AddNewForm from "@/src/domains/_app/constants/components/SessionPlaylist/components/AddNewForm.js";
import styles from "@/src/domains/_app/constants/components/SessionPlaylist/SessionPlaylist.module.css";
import MovieForm from "../../../components/Form/components/Content/MovieForm";
import dataStructureForms from "@/src/application/settings/dataStructureForms";

export default function SessionPlaylist({ open, closeWidget }) {
    // const [nav, setNav] = useState(false);
    const [addNewModal, setAddNewModal] = useState(false);

    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);

    const openAddNew = () => {
        setAddNewModal(true);
    };
    const closeAddNew = () => {
        setAddNewModal(false);
    };

    // TODO: Maybe move modal out of here?
    // TODO: migliorare addNew Modal e Form
    // SPIKE: Dovrei gia poter assegnare qua valori per i nuovi movies (categories, tags, etc...)

    return open ? (
        <>
            <SessionPlaylistUI
                sessionPlaylist={sessionPlaylist}
                openAddNew={openAddNew}
                close={close}
            />
            {addNewModal && (
                <div className={"modal"}>
                    <div className={"modal-container"}>
                        <span className={"modal-close"} onClick={closeAddNew}>
                            X
                        </span>
                        <MovieForm
                            closeModal={closeAddNew}
                            formState={dataStructureForms["movie"]}
                            errors={{}}
                        />
                        {/* <AddNewForm closeModal={closeAddNew} /> */}
                    </div>
                </div>
            )}
        </>
    ) : (
        <></>
    );
}
