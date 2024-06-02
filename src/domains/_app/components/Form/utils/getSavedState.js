import Cookies from "js-cookie";

const getSavedState = (topicLabel, emptyState) => {
    let result = emptyState;

    if (Cookies.get("formState")) {
        const cookie = JSON.parse(Cookies.get("formState"));
        if (cookie.formLabel === topicLabel) {
            result = { ...emptyState, ...cookie.formState };
        }
    }

    return result;
};

export default getSavedState;
