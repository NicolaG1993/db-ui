import styles from "@/src/domains/_app/constants/Layout.module.css";
import { useEffect, useRef, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { motion } from "framer-motion";

export default function AppBlur(visible) {
    let [spinnerColor, setSpinnerColor] = useState("#ffffff");

    // const div = useRef(null);

    // const showBlur = () => {
    //     div.current.classList.add("fadeIn");
    // };
    // const hideBlur = () => {
    //     div.current.classList.remove("fadeIn");
    // };

    // const override = {
    //     display: "block",
    //     margin: "0 auto",
    //     borderColor: "red",
    // };

    return (
        <motion.div
            id={styles.AppBlur}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                repeat: 1,
                repeatType: "reverse",
                duration: 0.5,
                repeatDelay: 0.1,
            }}
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
        </motion.div>
    );
}
