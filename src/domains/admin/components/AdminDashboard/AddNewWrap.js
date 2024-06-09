import { useState } from "react";
import styles from "@/src/application/styles/AdminDashboard.module.css";
import Form from "@/src/domains/_app/components/Form/components/Form";
import Cookies from "js-cookie";

export default function AddNewWrap({ setAddForm }) {
    const [UI, setUI] = useState(
        Cookies.get("formState")
            ? JSON.parse(Cookies.get("formState"))?.formLabel
            : "actor"
    );

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
                            onClick={() => setUI("actor")}
                            className={UI === "actor" ? styles.selected : null}
                        >
                            Actor •
                        </li>
                        <li
                            onClick={() => setUI("movie")}
                            className={UI === "movie" ? styles.selected : null}
                        >
                            Movie •
                        </li>
                        <li
                            onClick={() => setUI("studio")}
                            className={UI === "studio" ? styles.selected : null}
                        >
                            Studio •
                        </li>
                        <li
                            onClick={() => setUI("distribution")}
                            className={
                                UI === "distribution" ? styles.selected : null
                            }
                        >
                            Distribution •
                        </li>
                        <li
                            onClick={() => setUI("category")}
                            className={
                                UI === "category" ? styles.selected : null
                            }
                        >
                            Category •
                        </li>
                        <li
                            onClick={() => setUI("tag")}
                            className={UI === "tag" ? styles.selected : null}
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
