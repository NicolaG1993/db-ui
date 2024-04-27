import styles from "@/src/application/styles/Layout.module.css";
import { useEffect, useRef, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

export default function AppBlur(visible) {
    let [spinnerColor, setSpinnerColor] = useState("#ffffff");

    const div = useRef(null);

    const showBlur = () => {
        div.current.classList.add("fadeIn");
    };
    const hideBlur = () => {
        div.current.classList.remove("fadeIn");
    };

    useEffect(() => {
        visible ? showBlur() : hideBlur();
    }, [visible]);

    // const override = {
    //     display: "block",
    //     margin: "0 auto",
    //     borderColor: "red",
    // };

    return (
        <div
            id={styles.AppBlur}
            className={`${styles.fadeOut} ${visible ? styles.fadeIn : ""}`}
            ref={div}
        >
            <div className={styles.blurBox}>
                {/* <p>Loading...</p> */}
                <PuffLoader
                    color={spinnerColor}
                    loading={visible}
                    size={40}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    );
}
