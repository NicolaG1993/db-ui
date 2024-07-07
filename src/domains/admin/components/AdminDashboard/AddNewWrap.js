import { useState } from "react";
import styles from "@/src/application/styles/AdminDashboard.module.css";
import Form from "@/src/domains/_app/components/Form/components/Form";
import Cookies from "js-cookie";
import { selectFormStoreUI } from "@/src/application/redux/slices/formSlice";
import { shallowEqual, useSelector } from "react-redux";

export default function AddNewWrap({ setAddForm }) {
    const [UI, setUI] = useState(
        Cookies.get("formState")
            ? JSON.parse(Cookies.get("formState"))?.formLabel
            : "movie"
    );

    // check if form drawer is open
    const uiState = useSelector(selectFormStoreUI, shallowEqual);

    const handleFormChange = (label) => !uiState.drawerIsOpen && setUI(label);

    return (
        <div id={"Overlay"}>
            <div className={"overlayWindow"}>
                <div className={"topBar"}>
                    <span onClick={() => setAddForm(false)}>X</span>
                </div>

                {/* 👇 CHANGE DOWN HERE 👇 */}
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
                <Form formLabel={UI} />
            </div>
        </div>
    );
}

// si puo ridurre tutto con un loop, importando i nomi da un file custom esterno 🧠
