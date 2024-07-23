import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    selectSessionPlaylist,
    deleteSessionPlaylist,
    removeFromSessionPlaylist,
    shuffleSessionPlaylist,
    addToSessionPlaylist,
    updateSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";
// import axios from "axios";
import Link from "next/link";
import AddNewForm from "@/src/domains/_app/constants/components/SessionPlaylist/components/AddNewForm.js";
import SavePlaylistForm from "@/src/domains/_app/constants/components/SessionPlaylist/components/SavePlaylistForm.js";
import styles from "@/src/domains/_app/constants/components/SessionPlaylist/SessionPlaylist.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { detectImage } from "@/src/domains/_app/utils/parsers";
import { resetFormStore } from "@/src/application/redux/slices/formSlice";
import PlaylistEditor from "@/src/domains/playlists/components/PlaylistEditor/PlaylistEditor";
import Modal from "@/src/domains/_app/components/Modal/Modal";
import Form from "@/src/domains/_app/components/Form/components/Form";

export default function EditorPlaylist() {
    // TODO: shows playlist in store ✅
    // add items from db -> go to "/all/movies" ✅
    // add urls from input ✅
    // delete items ✅
    // modify order (drag)
    // on every change update store playlist

    // BUTTONS:
    // shuffle ✅
    // 🧠 save and name playlist in db -- user can select existing playlist to overwrite from list before submit
    // delete all ✅

    // NB. Playlist creation only in SessionPlaylistUI -> to edit, user has to load it SessionPlalistUI first, then open the editor and overwrite previos save

    // COMPONENT STATE //
    const [addNewModal, setAddNewModal] = useState(false);
    const [saveModal, setSaveModal] = useState(false);
    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);
    const dispatch = useDispatch();
    const router = useRouter();

    ////////////////////////////
    // STAY HERE!
    const openAddNew = () => {
        dispatch(resetFormStore());
        setAddNewModal(true);
    };
    // const closeAddNew = () => {
    //     setAddNewModal(false);
    // };
    const overridePlaylist = (playlist) => {
        dispatch(updateSessionPlaylist(playlist));
    };
    const clearPreviousItem = (id) => {
        if (id.toString() !== router.query.id) {
            dispatch(clearItem());
            dispatch(activateLoadingItem());
        }
    };
    // For now we edit only SessionPlaylist, but we want any playlist 🧠👇 maybe need a separate store? or just field
    const removeFromPlaylist = (i) => {
        dispatch(removeFromSessionPlaylist(i));
    };
    const deletePlaylist = () => {
        dispatch(deleteSessionPlaylist());
    };
    const shufflePlaylist = () => {
        dispatch(shuffleSessionPlaylist());
    };
    const handleParentUI = (uiElement, status) => {
        if (uiElement === "ADD_NEW") {
            status && openAddNew(); // openAddUrl();
        } else if (uiElement === "SAVE_PLAYLIST") {
            status && setSaveModal(true);
        }
    };
    ////////////////////////////
    ////////////////////////////

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
    const closeModal = () => {
        setAddNewModal(false);
        setSaveModal(false);
    };
    ////////////////////////
    ////////////////////////

    return (
        <main>
            <div className={"heading"}>
                <h1>PLAYLISTS EDITOR</h1>
                {/* <Link href={`/all/playlists`} title={"All playlists"}>
                    ← All playlists
                </Link> */}
                <button
                    className={"button-standard button-with-icon"}
                    onClick={() => router.push("/el/playlist/tournament")}
                >
                    <div>
                        <span>◀</span>
                    </div>
                    <span>All playlists</span>
                </button>
            </div>

            <PlaylistEditor
                playlist={sessionPlaylist} // 🧠 We should be able to choose any playlist (or sessionPlaylist) in this case 🧠
                removeFromPlaylist={removeFromPlaylist}
                clearPreviousItem={clearPreviousItem}
                overridePlaylist={overridePlaylist}
                deletePlaylist={deletePlaylist}
                shufflePlaylist={shufflePlaylist}
                size={"page"}
                handleParentUI={handleParentUI}
            />

            {/* <SessionPlaylistTopBar
                size={"page"}
                openAddNew={openAddNew}
                closeAddNew={closeAddNew} // ??
                close={""} // ??
            /> */}

            {/* <SessionPlaylistNavHeading /> */}

            {/* <div className={styles["movie-list"]}>
                {!!sessionPlaylist?.length ? (
                    sessionPlaylist.map((el, i) => (
                        <div
                            key={"session data " + i}
                            className={styles["row"]}
                        >
                            <Link
                                href={`/el/movie/${el.id}`}
                                onClick={() => clearPreviousItem(el.id)}
                            >
                                <div className={styles["row-content-wrap"]}>
                                    <div
                                        style={{
                                            position: "relative",
                                        }}
                                        className={styles.picWrap}
                                    >
                                        <Image
                                            src={
                                                el.pic
                                                    ? el.pic
                                                    : detectImage(el)
                                            }
                                            alt={el.title}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div>
                                        <h5>{el.title}</h5>
                                        <p className={styles.subtitle}>
                                            {el.cast &&
                                                el.cast.map((actor, i) => (
                                                    <span
                                                        key={`cast ${actor.name} ${i}`}
                                                    >
                                                        {i > 0 && ", "}
                                                        {actor.name}
                                                    </span>
                                                ))}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <p onClick={() => removeFromPlaylist(i)}>X</p>
                        </div>
                    ))
                ) : (
                    <div className={styles["no-data-row"]}>
                        <p>No data</p>
                    </div>
                )}
            </div> */}

            {/* <SessionPlaylistNavTable data={sessionPlaylist} /> */}

            {/* 🧠👇🔴🔴🔴 REDO: vedi session playlist */}
            {/* {addNewModal && (
                <div className={"modal"}>
                    <div className={"modal-container"}>
                        <span className={"modal-close"} onClick={closeModal}>
                            X
                        </span>
                        <AddNewForm closeModal={closeModal} />
                    </div>
                </div>
            )} */}

            <Modal isOpen={addNewModal || saveModal} onClose={closeModal}>
                {addNewModal && (
                    <Form
                        formLabel={"movie"}
                        handleEditsInParent={addNewToPlaylist}
                        parentIsWaiting={true}
                    />
                )}

                {saveModal && !!sessionPlaylist?.length && (
                    <div className={"modal-container"}>
                        <SavePlaylistForm
                            closeModal={closeModal}
                            sessionPlaylist={sessionPlaylist}
                        />
                    </div>
                )}
            </Modal>

            {/* {saveModal && (
                <div className={"modal"}>
                    <div className={"modal-container"}>
                        <span className={"modal-close"} onClick={closeModal}>
                            X
                        </span>
                        <SavePlaylistForm
                            closeModal={closeModal}
                            sessionPlaylist={sessionPlaylist}
                        />
                    </div>
                </div>
            )} */}
        </main>
    );
}
