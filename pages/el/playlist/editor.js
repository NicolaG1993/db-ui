import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    selectSessionPlaylist,
    deleteSessionPlaylist,
    removeFromSessionPlaylist,
    shuffleSessionPlaylist,
    updateSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";
import SavePlaylistForm from "@/src/domains/_app/constants/components/SessionPlaylist/components/SavePlaylistForm.js";
import { useRouter } from "next/router";
import {
    openForm,
    resetFormStore,
} from "@/src/application/redux/slices/formSlice";
import { Button, IconBackArrow, Modal, Playlist } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function EditorPlaylist() {
    const [saveModal, setSaveModal] = useState(false);
    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);
    const dispatch = useDispatch();
    const router = useRouter();

    const openAddNew = () => {
        dispatch(resetFormStore());
        dispatch(openForm({ formLabel: "movie" }));
    };
    const overridePlaylist = (playlist) => {
        dispatch(updateSessionPlaylist(playlist));
    };

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
            status && openAddNew();
        } else if (uiElement === "SAVE_PLAYLIST") {
            status && setSaveModal(true);
        }
    };

    const closeModal = () => {
        setSaveModal(false);
    };

    return (
        <main>
            <div className={"heading"}>
                <h1>PLAYLISTS EDITOR</h1>

                <Button
                    size="large"
                    label="All playlists"
                    customStyles={customStyles}
                    href={"/el/playlist/tournament"}
                    icon={<IconBackArrow />}
                />
            </div>

            <Playlist
                playlist={sessionPlaylist}
                removeFromPlaylist={removeFromPlaylist}
                overridePlaylist={overridePlaylist}
                deletePlaylist={deletePlaylist}
                shufflePlaylist={shufflePlaylist}
                size={"page"}
                handleParentUI={handleParentUI}
                customStyles={customStyles}
            />
            {/* <PlaylistEditor
                playlist={sessionPlaylist} // 🧠 We should be able to choose any playlist (or sessionPlaylist) in this case 🧠
                removeFromPlaylist={removeFromPlaylist}
                clearPreviousItem={clearPreviousItem}
                overridePlaylist={overridePlaylist}
                deletePlaylist={deletePlaylist}
                shufflePlaylist={shufflePlaylist}
                size={"page"}
                handleParentUI={handleParentUI}
            /> */}

            {/*  👇👇🧠🧠 Maybe we should move this to Layout or something.. like Form */}
            <Modal
                isOpen={saveModal}
                onClose={closeModal}
                customStyles={customStyles}
            >
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
