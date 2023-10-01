import { useEffect, useState } from "react";
import styles from "./ToggleSwitch.module.css";

export default function ToggleSwitch({ updateState }) {
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        updateState(isChecked);
    }, [isChecked]);
    const checkHandler = () => {
        setIsChecked(!isChecked);
    };
    return (
        <label className={styles["switch"]}>
            <input
                type="checkbox"
                id="checkbox"
                checked={isChecked}
                onChange={checkHandler}
            />
            <span className={`${styles["slider"]} ${styles["round"]}`}></span>
        </label>
    );
}
