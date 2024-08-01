import { useState, useEffect } from "react";
import axios from "axios";
import styles from "@/src/domains/_app/constants/components/SideNavMenu/SideNavMenu.module.css";
// We need to move the required styles to "SideNavMenu.module.css"
// the problem right now is that i believe we are using them somewhere else / non ho voglia di sistemarlo ora, sto facendo altro
import adminDashboardtyles from "@/src/application/styles/AdminDashboard.module.css";
import allThemes from "@/src/application/settings/allThemes";
import CustomDropdown from "@/src/domains/_app/components/Inputs/CustomDropdown/CustomDropdown";

export default function DropDownPreferences({ userId }) {
    const [settings, setSettings] = useState({
        showScrollbars: true,
        theme: "theme-light",
    });

    useEffect(() => {
        async function fetchSettings() {
            try {
                const response = await axios.get(
                    `/api/settings/user/${userId}`
                );
                const userSettings = response.data;
                if (userSettings) {
                    setSettings(userSettings);
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            }
        }
        fetchSettings();
    }, [userId]);

    const handleSettingChange = async (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);

        try {
            await axios.post("/api/settings/user/modify", {
                userId,
                ...newSettings,
            });
        } catch (error) {
            console.error("Error updating settings:", error);
        }
    };

    return (
        <div className={styles.dropDown} id={styles.Preferences}>
            <div className={styles.preferencesHeading}>
                <p>{"Interface: "}</p>
            </div>
            <div className={styles.preferencesBody}>
                <label>
                    <input
                        type="checkbox"
                        checked={settings.showScrollbars}
                        onChange={(e) =>
                            handleSettingChange(
                                "showScrollbars",
                                e.target.checked
                            )
                        }
                    />
                    Show Scrollbars
                </label>
                <label>
                    Theme:
                    <CustomDropdown
                        options={allThemes}
                        selectedValue={settings.theme}
                        onSelect={(themeTag) =>
                            handleSettingChange("theme", themeTag)
                        }
                        OptionComponent={({ el, handleOptionSelect }) => (
                            <div
                                className={adminDashboardtyles["theme-option"]}
                                value="theme-light"
                                // onClick={() => setTheme(el.tag)}
                                onClick={() => handleOptionSelect(el.tag)}
                            >
                                <div
                                    className={
                                        adminDashboardtyles["theme-preview"]
                                    }
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
                        )}
                    />
                    {/* 

                   

                    

                 
                    <select
                        value={settings.theme}
                        onChange={(e) =>
                            handleSettingChange("theme", e.target.value)
                        }
                    >
                        {allThemes.map((el) => (
                            <option
                                key={el.tag}
                                className={adminDashboardtyles["theme-option"]}
                                value="theme-light"
                                // onClick={() => setTheme(el.tag)}
                            >
                                <div
                                    className={
                                        adminDashboardtyles["theme-preview"]
                                    }
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
                            </option>
                        ))}
                    </select>
                       */}
                </label>
            </div>
        </div>
    );
}
