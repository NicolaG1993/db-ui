import { useState, useEffect } from "react";
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

export default function SavePlaylistForm({ closeModal, sessionPlaylist }) {
    /*
    • set title - if not generate unique one from date
    • user can select playlist to update instead - same thing goes for not unique title (it will update prev version)
    • create movies from urls 
    • empty sessionPlaylist store after saving

    Update or create new
    */

    // STATE //
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
        validateTitle(title);

        if (Object.keys(errors).length === 0) {
            if (title) {
                searchHints(title);
            } else {
                setHints([]); // all hints here 🧨
            }
        } else {
            setHints([]);
        }
    }, [title]);

    useEffect(() => {
        if (hints) {
            let res = findMatch(hints, title, "title");
            setMatch(res);
        } else {
            setMatch(true);
        }
    }, [hints]);

    // UTILS //
    const getAllPlaylists = async () => {
        try {
            let data = await fetchAllPlaylists();
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
        setErrors(newErrObj);
    };

    const searchHints = (title) => {
        let res = searchMatches(allPlaylists, title, "title");
        setHints(res);
    };

    const handleSelect = (obj) => {
        setMatch(obj);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newElements) {
            askUser();
        } else {
            confirmSubmit(sessionPlaylist, title);
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
            console.log("err: ", err);
            setErrors({ server: err });
        }
    };

    const confirmSubmit = async (newPlaylist, title) => {
        console.log("confirmSubmit invoked: ", { newPlaylist, title });
        if (match) {
            await editPlaylist(match, title, newPlaylist, userInfo); // TEST 🧨
        } else {
            await createPlaylist(title, newPlaylist, userInfo);
        }
        // clear session store state on success
        dispatch(deleteSessionPlaylist());
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
                            {hints.lenght ? (
                                hints.map((el) => (
                                    <p
                                        key={"playlist: " + el.title}
                                        className={styles["select"]}
                                        onClick={handleSelect(el)}
                                    >
                                        {el.title}
                                    </p>
                                ))
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
        </>
    );
}
