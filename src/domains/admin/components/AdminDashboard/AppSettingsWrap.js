import { useState } from "react";
import styles from "@/src/application/styles/AdminDashboard.module.css";
import { setTheme } from "@/src/domains/_app/constants/actions/themes";
import allThemes from "@/src/application/settings/allThemes";

export default function AppSettingsWrap({ toggleAppSettings }) {
    /**
     * User seleziona impostazioni (theme, etc...)
     * Su conferma i settings sono salvati in cookie - persistente
     * L'App o applica quelli dello user - se cookie esiste - altrimenti quelli di base
     */

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
                                            >
                                                <span
                                                    style={{
                                                        color: el.textColor,
                                                    }}
                                                >
                                                    T
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    background: el.rgb2,
                                                }}
                                            ></div>
                                            <div
                                                style={{
                                                    background: el.rgb3,
                                                }}
                                            ></div>
                                            <div
                                                style={{
                                                    background: el.rgb4,
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
