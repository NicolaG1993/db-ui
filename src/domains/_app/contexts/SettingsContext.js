import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children, userId }) => {
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

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
};

// export const useSettings = () => useContext(SettingsContext);
