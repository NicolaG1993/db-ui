import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

/*
LEFT TODO:
    🟢 Move themes logic to context - now it is still using cookies or similar
    🟢 HOW TO Update context logic from  <DropDownPreferences/>
    🟢 Make App reactive to Setting changes - now needs page reload
    🟢 Remove and replace all old "keepTheme()" and "setTheme()"
*/

export const SettingsContext = createContext();

export const SettingsProvider = ({ children, userId }) => {
    const [settings, setSettings] = useState({
        showScrollbars: true,
        theme: undefined,
    });
    const [isSettingsLoaded, setIsSettingsLoaded] = useState(false); // Not needed

    useEffect(() => {
        setIsSettingsLoaded(false);
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
        setIsSettingsLoaded(true);
    }, [userId]);

    useEffect(() => {
        if (settings.theme) {
            document.documentElement.className = settings.theme;
            // 🧠 TODO: We should also store it somewhere like cookies or sessionStorage, in case API stops working the theme should not be reset to default value (now it's happening!)
        } else {
            document.documentElement.className = "theme-light";
        }
    }, [settings]);

    const updateSettings = async (newSettings) => {
        try {
            const response = await axios.post("/api/settings/user/modify", {
                userId,
                ...newSettings,
            });
            if (response.status === 200) {
                setSettings(newSettings);
            }
        } catch (error) {
            console.error("Error updating settings:", error);
        }
    };

    return (
        <SettingsContext.Provider
            value={{ ...settings, isSettingsLoaded, updateSettings }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

// export const useSettings = () => useContext(SettingsContext);
