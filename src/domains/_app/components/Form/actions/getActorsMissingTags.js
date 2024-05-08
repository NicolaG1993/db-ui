import axios from "axios";
import { mergeArrays } from "@/src/application/utils/parsers";

export default async function getActorsMissingTags(
    actors,
    tags,
    originalFormState
) {
    console.log("🔴 getActorsMissingTags: ", {
        actors,
        tags,
        originalFormState,
    });
    // 🧠 IN TEORIA "ACTOR" OBJECT LO RICEVO GIA NEL FORM
    // NO NEED TO CALL API AGAIN

    // INVECE NO... VALUES IN FORM ARE ONLY {name, id}
    // 🔴🔴🔴 VEDERE SE DEVO CAMBIARE BE - O SE FILTRO OBJECT DA QUALCHE PARTE 🔴🔴🔴
    // UPDATE: DEVO SPOSTARE FETCH - USARLO PER POPULATE SIDENAV - Cosí abbiamo gia tutto da la`
    try {
        //NEW TAGS
        const { data } = await axios.get("/api/actor/by-id", {
            params: { items: JSON.stringify(actors.map((el) => el.id)) },
        });

        // let extractedOriginalIDs = originalFormState.actors.map(
        //     (el) => el.id
        // );
        let extractedActorsIDs = actors.map((el) => el.id);
        const removedActors = originalFormState.actors.filter(
            (el) => !extractedActorsIDs.includes(el.id)
        );

        let removedActorsRes;
        if (removedActors && removedActors.length) {
            // We dont need this, we could just filter formState
            // but now formState is storing only id and name - should store all object
            // then change this! 🧠
            const res = await axios.get("/api/actor/by-id", {
                params: {
                    items: JSON.stringify(removedActors.map((el) => el.id)),
                },
            });
            removedActorsRes = res.data;
        }

        // PARSING RESPONSE
        // NEW TAGS
        let allTags = []; // all active cast tags
        let allTagsIds = [];
        if (data && data.length) {
            data.map((actor) => {
                allTags = mergeArrays(allTags, actor.tags);
                allTagsIds = allTags.map((t) => t.id);
            });
        }

        const tagsIdOnly = tags.map((t) => t.id);

        let missingTags = allTags.filter((el) => !tagsIdOnly.includes(el.id));

        // REMOVED TAGS
        let removedTags = [];
        if (removedActorsRes && allTags.length) {
            removedActorsRes.map((actor) => {
                //  let onlyTagIds = actor.tags.map((t) => t.id); // all tags from removed cast
                // let allTagsIds = allTags.map((t) => t.id); // all tags from removed cast
                let uniqueTags = actor.tags.filter(
                    (el) => !allTagsIds.includes(el.id)
                ); // all tags from removed cast not present in actual cast tags
                removedTags = tags.filter((el) =>
                    uniqueTags.map(({ id }) => id).includes(el.id)
                ); // all unique tags present in original state tags - the final values to remove!
            });
        }

        const deleteDuplicates = (arr) =>
            arr.filter(
                (value, index, self) =>
                    index === self.findIndex((t) => t.id === value.id)
            ); // make utils

        return {
            missingTags: deleteDuplicates(missingTags),
            removedTags: deleteDuplicates(removedTags),
        };
    } catch (err) {
        console.log("getActorsMissingTags ERROR: ", err);
        return err;
    }
}
