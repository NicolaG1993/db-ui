import { useState } from "react";
import SessionPlaylist from "../SessionPlaylist/SessionPlaylist";
import RandomNumberButton from "./RandomNumberButton";
import SessionPlaylistButton from "./SessionPlaylistButton";
import styles from "./Widgets.module.css";
import RandomNumberGenerator from "../../../components/RandomNumberGenerator/RandomNumberGenerator";

export default function Widget() {
    const [widget, setWidget] = useState(false);

    const closeWidget = () => {
        setWidget(false);
    };
    const openWidget = (str) => {
        setWidget(str);
    };

    return (
        <>
            <div className={styles["widgets-btns"]}>
                <SessionPlaylistButton
                    open={widget === "SessionPlaylist"}
                    closeWidget={closeWidget}
                    openWidget={openWidget}
                />
                <RandomNumberButton
                    open={widget === "RandomNumberGenerator"}
                    closeWidget={closeWidget}
                    openWidget={openWidget}
                />
            </div>

            <div className={styles["widgets-wrap"]}>
                <div
                    className={styles["widget-box"]}
                    style={{
                        height: widget === "SessionPlaylist" ? "650px" : "0",
                        // minWidth: open ? "200px" : "0",
                    }}
                >
                    <div className={styles["nav-content"]}>
                        <SessionPlaylist
                            open={widget === "SessionPlaylist"}
                            closeWidget={closeWidget}
                        />
                    </div>
                </div>

                <div
                    className={styles["widget-box"]}
                    style={{
                        height:
                            widget === "RandomNumberGenerator" ? "400px" : "0",
                    }}
                >
                    <div className={styles["nav-content"]}>
                        <RandomNumberGenerator
                            open={widget === "RandomNumberGenerator"}
                            closeWidget={closeWidget}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
