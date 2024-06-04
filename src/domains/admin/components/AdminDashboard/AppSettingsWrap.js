import { useState } from "react";
import styles from "@/src/application/styles/AdminDashboard.module.css";
import { setTheme } from "@/src/domains/_app/constants/actions/themes";

export default function AppSettingsWrap({ toggleAppSettings }) {
    /**
     * User seleziona impostazioni (theme, etc...)
     * Su conferma i settings sono salvati in cookie - persistente
     * L'App o applica quelli dello user - se cookie esiste - altrimenti quelli di base
     */

    // 🧠 I should store this rgb's in a global css variable, always available
    let allThemes = [
        {
            name: "Black",
            rgb1: "rgb(10, 10, 10)", // ---bg000
            rgb2: "rgb(42, 42, 42)", // ---bg400
            rgb3: "rgb(90, 90, 90)", // ---bg700
            rgb4: "rgb(128, 0, 128)", // ---color000
            textColor: "rgb(255, 255, 255)", // ---text
            tag: "theme-black",
        },
        {
            name: "Dark",
            rgb1: "rgb(30, 30, 30)",
            rgb2: "rgb(50, 50, 50)",
            rgb3: "rgb(100, 100, 100)",
            rgb4: "rgb(218, 165, 32)",
            textColor: "rgb(255, 255, 255)",
            tag: "theme-dark",
        },
        {
            name: "Grey",
            rgb1: "rgb(180, 180, 180)",
            rgb2: "rgb(83, 83, 83)",
            rgb3: "rgb(42, 42, 42)",
            rgb4: "rgb(218, 165, 32)",
            textColor: "rgb(255, 255, 255)",
            tag: "theme-grey",
        },
        {
            name: "Light",
            rgb1: "rgb(250, 250, 250)",
            rgb2: "rgb(199, 199, 199)",
            rgb3: "rgb(126, 126, 126)",
            rgb4: "rgb(218, 165, 32)",
            textColor: "rgb(30, 30, 30)",
            tag: "theme-light",
        },
        {
            name: "Hi-Contrast",
            rgb1: "rgb(10, 10, 10)",
            rgb2: "rgb(42, 42, 42)",
            rgb3: "rgb(208, 13, 208)",
            rgb4: "rgb(41, 237, 41)",
            textColor: "rgb(72, 255, 231)",
            tag: "theme-hi-contrast",
        },
        {
            name: "Night",
            rgb1: "rgb(2, 2, 22)",
            rgb2: "rgb(15, 17, 34)",
            rgb3: "rgb(80, 82, 180)",
            rgb4: "rgb(226, 179, 61)",
            textColor: "rgb(255, 255, 255)",
            tag: "theme-night",
        },
        {
            name: "Jungle",
            rgb1: "rgb(10, 10, 10)",
            rgb2: "rgb(42, 42, 42)",
            rgb3: "rgb(90, 90, 90)",
            rgb4: "rgb(77, 162, 67)",
            textColor: "rgb(110, 156, 126)",
            tag: "theme-jungle",
        },
        {
            name: "Nature",
            rgb1: "rgb(42, 76, 64)",
            rgb2: "rgb(110, 156, 126)",
            rgb3: "rgb(182, 206, 152)",
            rgb4: "rgb(126, 187, 228)",
            textColor: "rgb(5, 5, 5)",
            tag: "theme-nature",
        },
        {
            name: "Sunset",
            rgb1: "rgb(101, 73, 141)",
            rgb2: "rgb(238, 144, 90)",
            rgb3: "rgb(255, 207, 104)",
            rgb4: "rgb(114, 28, 61)",
            textColor: "rgb(5, 5, 5)",
            tag: "theme-sunset",
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
