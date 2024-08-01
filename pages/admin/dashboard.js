// ELIMINARE PAGE 🔴👇

import { useEffect, useState } from "react";
// import AddNewWrap from "@/src/domains/_app/constants/components/SideNavMenu/components/NewDataForm";
// import AppSettingsWrap from "@/src/domains/admin/components/AdminDashboard/AppSettingsWrap";
import styles from "@/src/application/styles/AdminDashboard.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { resetFormStore } from "@/src/application/redux/slices/formSlice";

export default function Dashboard() {
    const [addForm, setAddForm] = useState(false);
    const [appSettings, setAppSettings] = useState(false);
    const dispatch = useDispatch();

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

    // 🧠 Modal andrebbe messo qua in veritá? -ed andrebbe usato sia per Form che per Settings - check this pls 🧠
    return (
        <>
            <main id={"ElMain"} className={styles.main}>
                <h1>Admin Dashboard</h1>

                <div className={styles.content}>
                    <button
                        onClick={() => {
                            dispatch(resetFormStore()); // cleanup formState
                            setAddForm(true);
                        }}
                        className="button-standard"
                    >
                        + Add Data
                    </button>
                    <button disabled onClick={(e) => addTest(e)}>
                        RUN TEST
                    </button>
                    <button disabled>Data Migration</button>
                    <button
                        onClick={() => setAppSettings(true)}
                        className="button-standard"
                    >
                        Settings
                    </button>
                </div>
            </main>
            {/* TODO: TRANSFORM BOTH WRAPS INTO MODAL COMPONENTS */}
            {/* {addForm && <AddNewWrap setAddForm={setAddForm} />} */}
            {/* {appSettings && (
                <AppSettingsWrap toggleAppSettings={setAppSettings} />
            )} */}
        </>
    );
}
