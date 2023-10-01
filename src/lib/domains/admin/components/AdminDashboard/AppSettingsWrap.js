import { useState } from "react";

import { setTheme } from "@/utils/themes";
import styles from "@/styles/AdminDashboard.module.css";

export default function AppSettingsWrap({ toggleAppSettings }) {
    /**
     * User seleziona impostazioni (theme, etc...)
     * Su conferma i settings sono salvati in cookie - persistente
     * L'App o applica quelli dello user - se cookie esiste - altrimenti quelli di base
     */

    let allThemes = [
        {
            name: "Dark",
            rgb1: "rgb(50, 50, 50)",
            rgb2: "rgb(93, 93, 93)",
            tag: "theme-dark",
        },
        {
            name: "Grey",
            rgb1: "rgb(180, 180, 180)",
            rgb2: "rgb(83, 83, 83)",
            tag: "theme-grey",
        },
        {
            name: "Light",
            rgb1: "rgb(199, 199, 199)",
            rgb2: "rgb(245, 245, 245)",
            tag: "theme-light",
        },
        {
            name: "Night",
            rgb1: "rgb(15, 17, 34)",
            rgb2: "rgb(38, 46, 121)",
            tag: "theme-night",
        },
        {
            name: "Sunset",
            rgb1: "rgb(184, 72, 80)",
            rgb2: "rgb(249, 173, 71)",
            tag: "theme-sunset",
        },
        {
            name: "Nature",
            rgb1: "rgb(60, 98, 85)",
            rgb2: "rgb(166, 187, 141)",
            tag: "theme-nature",
        },
    ];

    return (
        <div id={"Overlay"}>
            <div className={"overlayWindow"}>
                <div className={"topBar"}>
                    <span onClick={() => toggleAppSettings(false)}>X</span>
                </div>
                <div className={styles.formWrapContainer}>
                    <div className={styles.formWrap}>
                        <div>
                            <h2>Settings</h2>
                        </div>

                        <form
                            onSubmit={(e) => confirmChanges(e)}
                            className={styles.form}
                        >
                            <div className={styles["form-col-left"]}>
                                <label>
                                    <h4>Theme</h4>
                                </label>
                            </div>

                            <div className={styles["form-col-right"]}>
                                {allThemes.map((el) => (
                                    <div
                                        key={el.tag}
                                        className={styles["theme-option"]}
                                        onClick={() => setTheme(el.tag)}
                                    >
                                        <div
                                            className={styles["theme-preview"]}
                                        >
                                            <div
                                                style={{
                                                    background: el.rgb1,
                                                }}
                                            ></div>
                                            <div
                                                style={{
                                                    background: el.rgb2,
                                                }}
                                            ></div>
                                        </div>
                                        <span>{el.name}</span>
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
