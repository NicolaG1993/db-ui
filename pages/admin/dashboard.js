import { useEffect, useState } from "react";
import AddNewWrap from "@/components/AdminDashboard/AddNewWrap";
import AppSettingsWrap from "@/components/AdminDashboard/AppSettingsWrap";
import styles from "@/styles/AdminDashboard.module.css";
import axios from "axios";

export default function Dashboard() {
    const [addForm, setAddForm] = useState(false);
    const [appSettings, setAppSettings] = useState(false);

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
        <>
            <main id={"ElMain"} className={styles.main}>
                <h1>Admin Dashboard</h1>

                <div className={styles.content}>
                    <button onClick={() => setAddForm(true)}>+ Add Data</button>
                    <button disabled onClick={(e) => addTest(e)}>
                        RUN TEST
                    </button>
                    <button disabled>Data Migration</button>
                    <button onClick={() => setAppSettings(true)}>
                        Settings
                    </button>
                </div>
            </main>
            {addForm && <AddNewWrap setAddForm={setAddForm} />}
            {appSettings && (
                <AppSettingsWrap toggleAppSettings={setAppSettings} />
            )}
        </>
    );
}