import { useState } from "react";
import SessionPlaylist from "../SessionPlaylist/SessionPlaylist";
import RandomNumberButton from "./RandomNumberButton";
import SessionPlaylistButton from "./SessionPlaylistButton";
import styles from "./Widgets.module.css";
import RandomNumberGenerator from "../../../components/RandomNumberGenerator/RandomNumberGenerator";
import UserNotesButton from "./UserNotesButton";
import UserNotes from "../../../components/UserNotes/UserNotes";

export default function Widget() {
    const [widget, setWidget] = useState(false);

    const closeWidget = () => {
        setWidget(false);
    };
    const openWidget = (str) => {
        setWidget(str);
    };

    /*
    🧠🧠🧠 TODO: Try to implement a Wrap component to manage the dynamic height for the animations
    -- we could make them comunicate with the components content (es. if last results height +200px)
    */
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
                <UserNotesButton
                    open={widget === "UserNotes"}
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
                            widget === "RandomNumberGenerator" ? "100%" : "0",
                        minHeight:
                            widget === "RandomNumberGenerator" ? "570px" : "0",
                    }}
                >
                    <div className={styles["nav-content"]}>
                        <RandomNumberGenerator
                            open={widget === "RandomNumberGenerator"}
                            closeWidget={closeWidget}
                        />
                    </div>
                </div>

                <div
                    className={styles["widget-box"]}
                    style={{
                        height: widget === "UserNotes" ? "100%" : "0",
                        minHeight: widget === "UserNotes" ? "570px" : "0",
                    }}
                >
                    <div className={styles["nav-content"]}>
                        <UserNotes
                            open={widget === "UserNotes"}
                            closeWidget={closeWidget}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
