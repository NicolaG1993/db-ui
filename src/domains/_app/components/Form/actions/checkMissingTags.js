import getActorsMissingTags from "@/src/domains/_app/components/Form/actions/getActorsMissingTags.js";
import extractMissingTags from "@/src/domains/_app/components/Form/actions/extractMissingTags.js";

const checkMissingTags = async ({
    topic,
    data,
    formState, // undefined !
    originalFormState, // undefined !
    appSettings, // undefined !
}) => {
    // console.log("🔴 checkMissingTags: ", {
    //     topic,
    //     data,
    //     formState,
    //     originalFormState,
    //     appSettings,
    // });
    let res;
    // check possible tags updates from selected actors
    if (topic === "actors") {
        // 🧠 i refactored extractMissingTags without API calls, maybe i can do it also here?
        res = await getActorsMissingTags(
            formState[topic],
            formState.tags,
            originalFormState,
            data
        );
        // console.log("getActorsMissingTags: ", res);
        return res;
    } else if (topic === "tags") {
        // check for related tags that could be missing
        res = extractMissingTags(formState[topic], appSettings.TAGS_REL, data);
        // console.log("extractMissingTags: ", res);
        return res;
    }
};

export default checkMissingTags;

// FIX: I'm not handling errors here! 🔴
