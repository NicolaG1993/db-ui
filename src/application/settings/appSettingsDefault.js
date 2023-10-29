// Modify this file to customize the app settings

const appSettingsDefault = {
    // all category groups for forms
    CATEGORY_TYPES: ["Genres", "No Type"],

    // all tags groups and sub-groups for forms
    TAGS_OBJ: {
        Body: ["Ethnicity", "Hair", "Height"],
        "Movie Certifications": ["Age"],
        Recognitions: ["Awards", "Sales"],
        Unknown: ["No Type"],
    },

    // all tags related to other tags - for tags hints in forms
    TAGS_REL: {
        // title: { id: 5, related: [11, 12, 35, 36, 48, 62] },
    },
};

export default appSettingsDefault;
