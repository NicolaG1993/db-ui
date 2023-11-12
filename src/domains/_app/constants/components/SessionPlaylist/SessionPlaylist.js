import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { selectSessionPlaylist } from "@/src/application/redux/slices/sessionPlaylistSlice";

import SessionPlaylistUI from "./SessionPlaylistUI";
import AddUrlForm from "@/src/domains/_app/constants/components/SessionPlaylist/components/AddUrlForm.js";
import styles from "@/src/application/styles/Layout.module.css";

export default function SessionPlaylist() {
    const [nav, setNav] = useState(false);
    const [addUrlModal, setAddUrlModal] = useState(false);

    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);

    const close = () => {
        setNav(false);
    };
    const openAddUrl = () => {
        setAddUrlModal(true);
    };
    const closeAddUrl = () => {
        setAddUrlModal(false);
    };

    return (
        <>
            <div
                id={styles["SessionPlaylist"]}
                style={{
                    height: nav ? "650px" : "0",
                    // minWidth: nav ? "200px" : "0",
                }}
            >
                <div className={styles["nav-content"]}>
                    {nav ? (
                        <>
                            <SessionPlaylistUI
                                sessionPlaylist={sessionPlaylist}
                                openAddUrl={openAddUrl}
                                close={close}
                            />
                        </>
                    ) : (
                        <></>
                    )}
                </div>

                <div
                    className={styles["nav-btn"]}
                    onClick={() => {
                        setNav(!nav);
                        closeAddUrl();
                    }}
                >
                    <span>{nav ? "Minimize" : "Session Tab"}</span>
                    {!nav && sessionPlaylist?.length ? (
                        <div className={styles["counter"]}>
                            <span>{sessionPlaylist.length}</span>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            {addUrlModal ? (
                <div className={"modal"}>
                    <div className={"modal-container"}>
                        <span className={"modal-close"} onClick={closeAddUrl}>
                            X
                        </span>
                        <AddUrlForm closeModal={closeAddUrl} />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
