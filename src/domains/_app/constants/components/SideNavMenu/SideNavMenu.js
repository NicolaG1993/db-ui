import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "@/src/domains/_app/constants/components/SideNavMenu/SideNavMenu.module.css";
import {
    openForm,
    resetFormStore,
} from "@/src/application/redux/slices/formSlice";

export default function SideNavMenu({ onClose }) {
    const dispatch = useDispatch();

    // ??? They should not be handled here (Layout or Redux)

    const [appSettings, setAppSettings] = useState(false);

    // Should not be handled here
    const addTest = async (e) => {
        e.preventDefault();
        console.log("💛💛💛 TEST STARTING NOW");

        try {
            const resp = await axios.post(`/api/test/new`, {
                // ...obj,
                // tags,
                // nationality,
            });
            console.log("💚💚💚 TEST COMPLETED: ", resp);
        } catch (err) {
            console.log("🧡🧡🧡 ERROR: ", err);
        }
    };

    return (
        <div id={styles.SideNavMenu}>
            <div className={styles.dropdownsWrap}>
                <div>
                    <p>Profile</p>
                </div>

                <div>
                    <p>Settings</p>
                </div>

                <div>
                    <p>Preferences</p>
                </div>
            </div>

            <div className={styles.content}>
                <button
                    onClick={() => {
                        dispatch(resetFormStore()); // cleanup formState
                        dispatch(openForm()); // open Form UI
                        // setAddForm(true);
                        onClose();
                    }}
                    className="button-standard"
                >
                    + Add Data
                </button>
                <button disabled onClick={(e) => addTest(e)}>
                    RUN TEST
                </button>

                {/* <button
                    onClick={() => setAppSettings(true)}
                    className="button-standard"
                >
                    Settings
                </button> */}
                <button disabled>TEST AREA</button>
                <button disabled>Clear Session Data</button>
                <button disabled>Data Migration</button>
                <button disabled>Logout</button>
            </div>
        </div>
    );
}
