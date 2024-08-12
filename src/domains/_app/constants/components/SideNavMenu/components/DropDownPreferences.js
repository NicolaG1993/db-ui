// import { useState, useEffect } from "react";
// import axios from "axios";
import styles from "@/src/domains/_app/constants/components/SideNavMenu/SideNavMenu.module.css";
// We need to move the required styles to "SideNavMenu.module.css"
// the problem right now is that i believe we are using them somewhere else / non ho voglia di sistemarlo ora, sto facendo altro
import adminDashboardtyles from "@/src/application/styles/AdminDashboard.module.css";
import allThemes from "@/src/application/settings/allThemes";
// import CustomDropdown from "@/src/domains/_app/components/Inputs/CustomDropdown/CustomDropdown";
import { useAppContext } from "@/src/domains/_app/contexts/AppContext";
import { InputSelectCustom } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

const extractThemeName = (allThemes, themeTag) => {
    const theme = allThemes.find((el) => el.tag === themeTag);
    return theme?.name || "";
};

export default function DropDownPreferences({ userId }) {
    const { showScrollbars, theme, updateSettings } = useAppContext();

    const handleSettingChange = async (key, value) => {
        const settings = { showScrollbars, theme };
        const newSettings = { ...settings, [key]: value };
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
                        checked={showScrollbars}
                        onChange={(e) => {
                            // console.log(
                            //     "checkbox onChange: ",
                            //     e.target.checked
                            // );
                            return handleSettingChange(
                                "showScrollbars",
                                e.target.checked
                            );
                        }}
                    />
                </label>
                <label>
                    <span className={styles.label}>Theme:</span>
                    <InputSelectCustom
                        options={allThemes}
                        selectedValue={extractThemeName(allThemes, theme)}
                        onSelect={(themeTag) =>
                            handleSettingChange("theme", themeTag)
                        }
                        OptionComponent={({ el, handleOptionSelect }) => (
                            <div
                                className={adminDashboardtyles["theme-option"]}
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
                        customStyles={customStyles}
                    />
                </label>
            </div>
        </div>
    );
}
