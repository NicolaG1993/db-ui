import getActorsMissingTags from "@/src/domains/_app/components/Form/actions/getActorsMissingTags.js";
import extractMissingTags from "@/src/domains/_app/components/Form/actions/extractMissingTags.js";

const checkHints = ({
    topic,
    data, // 🟢 FIXED
    formState, // uguale a originalFormState, not actual selection
    originalFormState,
    appSettings,
    currentSelection,
}) => {
    console.log("🔴 checkHints: ", {
        topic,
        data,
        formState,
        originalFormState,
        appSettings,
        currentSelection,
    });
    let res;
    // should we check possible tags updates from selected actors ?
    if (topic === "actors") {
        // 🧠 "actors" dovrebbe essere flexible ?
        // 🧠 i refactored extractMissingTags without API calls, maybe i can do it also here?
        res = getActorsMissingTags({
            currentSelection, // formState[topic], // currentSelection ?
            currentTags: formState.tags,
            originalFormState,
            propsData: data,
        });
        // console.log("getActorsMissingTags: ", res);
        return res;
    } else if (topic === "tags") {
        // 🧠 "tags" dovrebbe essere flexible ?
        // check for related tags that could be missing
        // res = extractMissingTags(formState[topic], appSettings.TAGS_REL, data);
        res = extractMissingTags(currentSelection, appSettings.TAGS_REL, data);
        // console.log("extractMissingTags: ", res);
        return res;
    }
};

export default checkHints;

// FIX: I'm not handling errors here! 🔴
