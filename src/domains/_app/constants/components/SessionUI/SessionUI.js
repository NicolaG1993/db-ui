import SessionPlaylist from "../SessionPlaylist/SessionPlaylist";
import styles from "@/src/application/styles/Layout.module.css";
import { useState } from "react";

export default function SessionUI() {
    const [nav, setNav] = useState(false);

    return (
        <>
            <div
                id={styles["SessionUI"]}
                style={{
                    height: nav ? "650px" : "0",
                    // minWidth: nav ? "200px" : "0",
                }}
            >
                <div className={styles["nav-content"]}>
                    {nav ? (
                        <>
                            <SessionPlaylist />
                        </>
                    ) : (
                        <></>
                    )}
                </div>

                <div className={styles["nav-btn"]} onClick={() => setNav(!nav)}>
                    {nav ? "Minimize" : "Session Tab"}
                </div>
            </div>
        </>
    );
}
