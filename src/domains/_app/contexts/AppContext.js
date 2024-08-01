import { useContext } from "react";
// import { UserContext } from "./UserContext";
// import { ThemeContext } from "./ThemeContext";

import { SettingsContext } from "./SettingsContext";
import { TooltipContext } from "./TooltipContext";

export const useAppContext = () => {
    // const user = useContext(UserContext);
    const settings = useContext(SettingsContext);
    const { showScrollbars, theme, isSettingsLoaded, updateSettings } =
        settings;
    const tooltip = useContext(TooltipContext);
    const { showTooltip, hideTooltip } = tooltip;

    console.log("useAppContext: ", {
        settings,
        tooltip,
        showScrollbars,
        theme,
        isSettingsLoaded,
        showTooltip,
        hideTooltip,
        updateSettings,
    });
    return {
        // user,
        showScrollbars,
        theme,
        isSettingsLoaded,
        showTooltip,
        hideTooltip,
        updateSettings,
    };
};
