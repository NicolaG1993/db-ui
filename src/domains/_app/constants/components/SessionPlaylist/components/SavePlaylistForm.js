import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { titleValidation } from "@/src/application/utils/validateForms.js";
import styles from "@/src/domains/_app/constants/components/SessionPlaylist/components/SavePlaylistForm.module.css";
import fetchAllPlaylists from "@/src/domains/playlists/actions/fetchAllPlaylists.js";
import storeNewItemsFromUrls from "@/src/domains/_app/constants/components/SessionPlaylist/actions/storeNewItemsFromUrls.js";
import {
    findMatch,
    searchMatches,
} from "@/src/application/utils/filterData.js";
import createPlaylist from "@/src/domains/_app/constants/components/SessionPlaylist/actions/createPlaylist.js";
import editPlaylist from "@/src/domains/_app/constants/components/SessionPlaylist/actions/editPlaylist.js";
import { useSelector } from "react-redux";
import { selectUserState } from "@/src/application/redux/slices/userSlice.js";
import { useDispatch } from "react-redux";
import { deleteSessionPlaylist } from "@/src/application/redux/slices/sessionPlaylistSlice";
import { getError } from "@/src/application/utils/error";

export default function SavePlaylistForm({ closeModal, sessionPlaylist }) {
    /*
    • set title - if not generate unique one from date
    • user can select playlist to update instead - same thing goes for not unique title (it will update prev version)
    • create movies from urls 
    • empty sessionPlaylist store after saving

    Update or create new
    */

    // STATE //
    const router = useRouter();
    const dispatch = useDispatch();
    let userInfo = useSelector(selectUserState);

    const [allPlaylists, setAllPlaylists] = useState([]);
    const [newElements, setNewElements] = useState([]);
    const [title, setTitle] = useState("");
    const [hints, setHints] = useState([]);
    const [match, setMatch] = useState();
    const [newElementsModal, setNewElementsModal] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getAllPlaylists();
    }, []);

    useEffect(() => {
        const urlObjects = sessionPlaylist.filter((el) => el.url);
        setNewElements(urlObjects);
    }, [sessionPlaylist]);

    useEffect(() => {
        if (match) {
            setHints([]); // se abbiamo selezionato un match il title ha un update, ma non vogliamo vedere hints
        } else {
            if (title) {
                searchHints(title);
            } else {
                setHints([]); // all hints here: se vogliamo mostrare sempre la lista
            }
        }
    }, [title]);

    useEffect(() => {
        console.log("Hints changed: ", hints);
        if (hints.length) {
            let res = findMatch(hints, title, "title");
            if (res) {
                setMatch(res);
            } else {
                setMatch();
            }
        } else if (!match) {
            // setMatch(true);
            setMatch();
        } else if (match?.title !== title) {
            setMatch();
        }
    }, [hints]);

    useEffect(() => {
        console.log("match changed: ", match);
        if (match) {
            setHints([]);
        } else {
        }
    }, [match]);

    // UTILS //
    const getAllPlaylists = async () => {
        try {
            let data = await fetchAllPlaylists("", userInfo.id);
            setAllPlaylists(data);
        } catch (err) {
            setErrors({ server: err });
        }
    };

    const validateTitle = (title) => {
        // validate title
        let newErrObj = {};
        if (title) {
            const titleCheck = titleValidation("title", title);
            if (titleCheck) {
                newErrObj.title = titleCheck;
            }
        }
        return newErrObj;
    };

    const searchHints = (title) => {
        let res = searchMatches(allPlaylists, title, "title");
        setHints(res);
    };

    const handleSelect = (obj) => {
        setMatch(obj);
        setErrors({});
        setTitle(obj.title);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const newErrObj = validateTitle(title);
        console.log("newErrObj: ", newErrObj);

        if (Object.keys(newErrObj).length === 0) {
            if (newElements.lenght) {
                askUser();
            } else {
                confirmSubmit(sessionPlaylist, title);
            }
        } else {
            console.log("INVALID INPUTS", newErrObj);
            setErrors(newErrObj);
            return;
        }
    };

    const askUser = () => {
        console.log("askUser invoked!");
        setNewElementsModal(true);
    };

    const handleNewItems = async () => {
        // new urls needs to be converted to ids before stored inside db
        // we dont save url objects directly in db
        try {
            // store "newElements" in db and update the "sessionPlaylist"
            let data = await storeNewItemsFromUrls(
                newElements,
                sessionPlaylist
            );
            console.log("data: ", data);
            // then invoke "confirmSubmit"
            confirmSubmit(data, title);
            setNewElementsModal(false);
            closeModal();
        } catch (err) {
            console.log("err: ", getError(err));
            setErrors({ server: getError(err) });
        }
    };

    const confirmSubmit = async (newPlaylist, title) => {
        console.log("confirmSubmit invoked: ", { newPlaylist, title });
        try {
            if (match) {
                await editPlaylist(match, title, newPlaylist, userInfo); // TEST 🧨
            } else {
                await createPlaylist(title, newPlaylist, userInfo);
            }
            // clear session store state on success
            dispatch(deleteSessionPlaylist());
            router.push("/all/playlists");
        } catch (err) {
            console.log("err: ", getError(err));
            setErrors({ server: getError(err) });
        }
    };

    console.log("SavePlaylistForm: ", {
        hints,
        title,
        errors,
        allPlaylists,
        match,
        newElementsModal,
        newElements,
        userInfo,
    });

    // RENDER //
    return (
        <>
            {!newElementsModal ? (
                <div className={styles["form"]}>
                    <p className={styles["form-title"]}>Save playlist</p>
                    <div className={styles["input-wrapper"]}>
                        <input
                            type="text"
                            placeholder={"Playlist title..."}
                            name="title"
                            id="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                        />
                        <button onClick={(e) => handleSubmit(e)}>
                            {match ? "Update" : "Save"}
                        </button>
                    </div>

                    {title && (
                        <div className={styles["input-hints"]}>
                            {hints.length ? (
                                hints.map((el) => (
                                    <p
                                        key={"playlist: " + el.title}
                                        className={styles["select"]}
                                        onClick={() => handleSelect(el)}
                                    >
                                        {el.title}
                                    </p>
                                ))
                            ) : match ? (
                                <></>
                            ) : (
                                <p>New playlist...</p>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles["form"]}>
                    <p className={styles["form-title"]}>
                        New elements detected
                    </p>
                    <p>
                        Please confirm if you want to add them to the database
                    </p>

                    <button onClick={(e) => handleNewItems(e)}>Confirm</button>
                    <button
                        onClick={() =>
                            confirmSubmitWithoutUrls(sessionPlaylist)
                        }
                    >
                        Delete them
                    </button>
                </div>
            )}

            {Object.keys(errors).length > 0 &&
                Object.entries(errors).map(([key, value]) => (
                    <div key={"error: " + key}>
                        <p>ERROR {key}:</p>
                        <p>{value}</p>
                    </div>
                ))}
        </>
    );
}
