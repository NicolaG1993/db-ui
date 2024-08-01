const mapSettingsRawToSettings = (rawSettings) => {
    return {
        showScrollbars: rawSettings.show_scrollbars,
        theme: rawSettings.theme,
    };
};

export { mapSettingsRawToSettings };
