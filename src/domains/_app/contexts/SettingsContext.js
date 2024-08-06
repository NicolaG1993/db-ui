import { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserState } from "@/src/application/redux/slices/userSlice";
import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";
import Cookies from "js-cookie";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    let userInfo = useSelector(selectUserState);

    const [settings, setSettings] = useState({
        showScrollbars: true,
        theme: Cookies.get("db-ui-theme")
            ? Cookies.get("db-ui-theme")
            : undefined,
    });
    const [isSettingsLoaded, setIsSettingsLoaded] = useState(false); // Not needed

    useEffect(() => {
        console.log("⬜ userInfo.id changes: ", userInfo?.id);
        if (userInfo?.id) {
            setIsSettingsLoaded(false);
            async function fetchSettings() {
                try {
                    const response = await axiosAuthInstance.get(
                        `/api/settings/user/${userInfo.id}`
                    );
                    console.log(
                        "🟨 api/settings/user/${userInfo.id} response: ",
                        response
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
        }
    }, [userInfo?.id]);

    useEffect(() => {
        console.log("🧠 settings changes: ", {
            settings,
            cookie: Cookies.get("db-ui-theme"),
        });
        if (settings.theme) {
            document.documentElement.className = settings.theme;
            // 🧠 TODO: We should also store it somewhere like cookies or sessionStorage, in case API stops working the theme should not be reset to default value (now it's happening!)
            Cookies.set("db-ui-theme", settings.theme);
        } else {
            if (Cookies.get("db-ui-theme")) {
                document.documentElement.className = Cookies.get("db-ui-theme");
            } else {
                document.documentElement.className = "theme-dark";
                Cookies.set("db-ui-theme", "theme-dark");
            }
        }
    }, [settings]);

    const updateSettings = async (newSettings) => {
        try {
            const response = await axiosAuthInstance.post(
                "/api/settings/user/modify",
                {
                    userId: userInfo.id,
                    ...newSettings,
                }
            );
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
