import { useState } from "react";
import styles from "@/src/application/styles/AdminDashboard.module.css";
import Form from "@/src/domains/_app/components/Form/components/FormWrap";
import Cookies from "js-cookie";
import { selectFormStoreUI } from "@/src/application/redux/slices/formSlice";
import { shallowEqual, useSelector } from "react-redux";

export default function NewDataForm({ formLabel }) {
    const [UI, setUI] = useState(
        formLabel
            ? formLabel
            : Cookies.get("formState")
            ? JSON.parse(Cookies.get("formState"))?.formLabel
            : "movie"
    );

    // TODO: if (formLabel) ... 🧠🧠🧠 show only Form[formLabel]
    // else user can choose form

    // check if form drawer is open
    const uiState = useSelector(selectFormStoreUI, shallowEqual);

    const handleFormChange = (label) => !uiState.drawerIsOpen && setUI(label);

    console.log("NewDataForm: ", { formLabel, UI, uiState });
    return (
        <>
            {/* 👇 CHANGE DOWN HERE: make flexible 👇 */}
            {!formLabel && (
                <div className={styles.selector}>
                    <ul>
                        <li
                            onClick={() => handleFormChange("actor")}
                            className={`${
                                UI === "actor" ? styles.selected : null
                            } ${
                                uiState.drawerIsOpen ? styles.notAllowed : null
                            }`}
                        >
                            Actor •
                        </li>
                        <li
                            onClick={() => handleFormChange("movie")}
                            className={`${
                                UI === "movie" ? styles.selected : null
                            } ${
                                uiState.drawerIsOpen ? styles.notAllowed : null
                            }`}
                        >
                            Movie •
                        </li>
                        <li
                            onClick={() => handleFormChange("studio")}
                            className={`${
                                UI === "studio" ? styles.selected : null
                            } ${
                                uiState.drawerIsOpen ? styles.notAllowed : null
                            }`}
                        >
                            Studio •
                        </li>
                        <li
                            onClick={() => handleFormChange("distribution")}
                            className={`${
                                UI === "distribution" ? styles.selected : null
                            } ${
                                uiState.drawerIsOpen ? styles.notAllowed : null
                            }`}
                        >
                            Distribution •
                        </li>
                        <li
                            onClick={() => handleFormChange("category")}
                            className={`${
                                UI === "category" ? styles.selected : null
                            } ${
                                uiState.drawerIsOpen ? styles.notAllowed : null
                            }`}
                        >
                            Category •
                        </li>
                        <li
                            onClick={() => handleFormChange("tag")}
                            className={`${
                                UI === "tag" ? styles.selected : null
                            } ${
                                uiState.drawerIsOpen ? styles.notAllowed : null
                            }`}
                        >
                            Tag •
                        </li>
                    </ul>
                </div>
            )}

            <Form
                formLabel={UI}
                // handleEditsInParent={addNewToPlaylist}
                // parentIsWaiting={true}
            />
        </>
    );
}

// si puo ridurre tutto con un loop, importando i nomi da un file custom esterno 🧠
