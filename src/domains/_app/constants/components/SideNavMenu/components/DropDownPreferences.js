import { useState, useEffect } from "react";
import axios from "axios";
import styles from "@/src/domains/_app/constants/components/SideNavMenu/SideNavMenu.module.css";
// We need to move the required styles to "SideNavMenu.module.css"
// the problem right now is that i believe we are using them somewhere else / non ho voglia di sistemarlo ora, sto facendo altro
import adminDashboardtyles from "@/src/application/styles/AdminDashboard.module.css";
import allThemes from "@/src/application/settings/allThemes";
import CustomDropdown from "@/src/domains/_app/components/Inputs/CustomDropdown/CustomDropdown";
import { useAppContext } from "@/src/domains/_app/contexts/AppContext";

export default function DropDownPreferences({ userId }) {
    const { showScrollbars, theme, updateSettings } = useAppContext();

    const [settings, setSettings] = useState({
        showScrollbars,
        theme,
    }); // 🧠 I think i can remove this somehow and use only context, i just need to understand how to update Context state from the end of handleSettingChange() - maybe con "finally {}" ???

    // Ho lo stesso fetch in "SettingsProvider.js" 🧠 RENDUNDANT
    // useEffect(() => {
    //     async function fetchSettings() {
    //         try {
    //             const response = await axios.get(
    //                 `/api/settings/user/${userId}`
    //             );
    //             const userSettings = response.data;
    //             if (userSettings) {
    //                 console.log("🧑‍🏭 fetching userSettings: ", userSettings);
    //                 setSettings(userSettings);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching settings:", error);
    //         }
    //     }
    //     fetchSettings();
    // }, [userId]);

    const handleSettingChange = async (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        updateSettings(newSettings);
    };

    return (
        <div className={styles.dropDown} id={styles.Preferences}>
            <div className={styles.preferencesHeading}>
                <p>{"Interface: "}</p>
            </div>
            <div className={styles.preferencesBody}>
                <label>
                    <span className={styles.label}>Show Scrollbars:</span>
                    <input
                        type="checkbox"
                        checked={settings.showScrollbars}
                        onChange={(e) => {
                            console.log(
                                "checkbox onChange: ",
                                e.target.checked
                            );
                            return handleSettingChange(
                                "showScrollbars",
                                e.target.checked
                            );
                        }}
                    />
                </label>
                <label>
                    <span className={styles.label}>Theme:</span>
                    <CustomDropdown
                        options={allThemes}
                        selectedValue={settings.theme}
                        onSelect={(themeTag) =>
                            handleSettingChange("theme", themeTag)
                        }
                        OptionComponent={({ el, handleOptionSelect }) => (
                            <div
                                className={adminDashboardtyles["theme-option"]}
                                // value="theme-light"
                                value={el.tag}
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
                            // 🧠 Move option component to CustomDropdown domain - or other domain like Themes or Settings? 🧠
                        )}
                    />
                </label>
            </div>
        </div>
    );
}
