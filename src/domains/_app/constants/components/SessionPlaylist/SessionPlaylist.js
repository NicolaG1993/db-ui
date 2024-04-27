import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { selectSessionPlaylist } from "@/src/application/redux/slices/sessionPlaylistSlice";

import SessionPlaylistUI from "./SessionPlaylistUI";
import AddUrlForm from "@/src/domains/_app/constants/components/SessionPlaylist/components/AddUrlForm.js";
import styles from "@/src/domains/_app/constants/components/SessionPlaylist/SessionPlaylist.module.css";

export default function SessionPlaylist({ open, closeWidget }) {
    // const [nav, setNav] = useState(false);
    const [addUrlModal, setAddUrlModal] = useState(false);

    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);

    const openAddUrl = () => {
        setAddUrlModal(true);
    };
    const closeAddUrl = () => {
        setAddUrlModal(false);
    };

    // TODO: Maybe move modal out of here?
    // TODO: migliorare addUrl Modal e Form
    // SPIKE: Dovrei gia poter assegnare qua valori per i nuovi movies (categories, tags, etc...)

    return open ? (
        <>
            <SessionPlaylistUI
                sessionPlaylist={sessionPlaylist}
                openAddUrl={openAddUrl}
                close={close}
            />
            {addUrlModal && (
                <div className={"modal"}>
                    <div className={"modal-container"}>
                        <span className={"modal-close"} onClick={closeAddUrl}>
                            X
                        </span>
                        <AddUrlForm closeModal={closeAddUrl} />
                    </div>
                </div>
            )}
        </>
    ) : (
        <></>
    );
}
