import { useState } from "react";
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
import SavePlaylistForm from "@/src/domains/_app/constants/components/SessionPlaylist/components/SavePlaylistForm.js";
import { useRouter } from "next/router";
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

    // COMPONENT STATE //
    const [addNewModal, setAddNewModal] = useState(false);
    const [saveModal, setSaveModal] = useState(false);
    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);
    const dispatch = useDispatch();
    const router = useRouter();

    ////////////////////////
    // !PLAYLIST ACTIONS! //
    ////////////////////////
    const openAddNew = () => {
        dispatch(resetFormStore());
        setAddNewModal(true);
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
        </main>
    );
}

// TODO:
/*
 * API fixes for saving index 🟡
 * API fixes for updating a playlist 🟡
 * DB table update for index column 🟡
 * Action should pass the index from the playlist element 🟡 or simply use the index of the SessionPlaylist, they are the same value
 * Action for update playlist + parse arguments to pass down to it 🟡
 * When getting the playlist display it correctly for the index value in the UI 🧠🧠🧠
 * * 🔴 We are having some issues with index and pic (when fetched from db - maybe parsing or bad query)
 * test everything 🧠
 
* check indexes are in correct order and no duplicates or gaps ❌
 */
