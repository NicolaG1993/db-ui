import axios from "axios";
import { mergeArrays } from "@/src/application/utils/parsers";

export default async function getActorsMissingTags(
    actors,
    tags,
    originalFormState
) {
    console.log("getActorsMissingTags invoked!");
    try {
        //NEW TAGS
        const { data } = await axios.get("/api/actor/by-name", {
            params: { items: JSON.stringify(actors) },
        });

        let extractedNames = originalFormState.actors.map((el) => el.name);
        const removedActors = extractedNames.filter(
            (el) => !actors.includes(el)
        );

        let removedActorsRes;
        if (removedActors && removedActors.length) {
            const res = await axios.get("/api/actor/by-name", {
                params: { items: JSON.stringify(removedActors) },
            });
            removedActorsRes = res.data;
        }

        // PARSING RESPONSE
        // NEW TAGS
        let allTags = []; // all active cast tags
        if (data && data.length) {
            data.map((actor) => {
                let onlyTagNames = actor.tags.map((t) => t.name);
                allTags = mergeArrays(allTags, onlyTagNames);
            });
        }
        const missingTags = allTags.filter((el) => !tags.includes(el));

        // REMOVED TAGS
        let removedTags = [];
        if (removedActorsRes && allTags.length) {
            removedActorsRes.map((actor) => {
                let onlyTagNames = actor.tags.map((t) => t.name); // all tags from removed cast
                let uniqueTags = onlyTagNames.filter(
                    (el) => !allTags.includes(el)
                ); // all tags from removed cast not present in actual cast tags
                removedTags = tags.filter((el) => uniqueTags.includes(el)); // all unique tags present in original state tags - the final values to remove!
            });
        }

        // return missingTags;
        return { missingTags, removedTags };
    } catch (err) {
        console.log("getActorsMissingTags ERROR: ", err);
        return err;
    }
}
