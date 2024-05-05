import Cookies from "js-cookie";

const getSavedState = (topicLabel, emptyState) => {
    let result = emptyState;

    if (Cookies.get("formState")) {
        const cookie = JSON.parse(Cookies.get("formState"));
        if (cookie.formLabel === topicLabel) {
            result = cookie.formState;
        }
    }

    return result;
};

export default getSavedState;
