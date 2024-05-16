import axios from "axios";
import { mergeArrays } from "@/src/application/utils/parsers";

const deleteDuplicates = (arr) =>
    arr.filter(
        (value, index, self) =>
            index === self.findIndex((t) => t.id === value.id)
    ); // make util 🧠

export default function getActorsMissingTags({
    currentSelection,
    currentTags,
    originalFormState,
    propsData,
}) {
    console.log("🔴 getActorsMissingTags: ", {
        currentSelection,
        currentTags,
        originalFormState,
        propsData,
    });

    let allActorsTags = []; // all tags from selected actors // former "allTags"
    let allActorsTagsIds = []; //former "allTagsIds"
    let allActorsIDs = [];
    const currentTagsIDs = currentTags.map((t) => t.id); // former "tagsIdOnly"

    if (!!currentSelection?.length) {
        // get full actor objects for currentSelection

        currentSelection.map((actor) => {
            allActorsTags = mergeArrays(allActorsTags, actor.tags || []);
            allActorsTagsIds = allActorsTags.map((t) => t.id);
            allActorsIDs.push(actor.id);
        });
    }

    // 🌟 MISSING TAGS 🌟
    const missingTags = allActorsTags.filter(
        (el) => !currentTagsIDs.includes(el.id)
    );

    // 🌟 REMOVED TAGS 🌟

    // .1 🟢 get actors removed from originalFormState
    // // .1.1 🟢 actors obj con tags, ovviamente
    // // .1.2 🟢 propsData é la fonte di veritá per actors
    // // .1.3 🟢 filtra actors rimossi da originalState

    const removedActors = originalFormState.actors.filter(
        (act) => !allActorsIDs.includes(act.id)
    ); // 🧠 this is correct but we want to use actors from "propsData" for tags

    /////
    /*
        🧠 TRYING TO SIMPLIFY LOOPINGS 🧠 (dont prioritize)
        allActorsIDs.map((id) =>
            originalFormState.actors.find((act) => act.id === id)
        );

        const removedActorsData = allActorsIDs
            .map((id) => originalFormState.actors.find((act) => act.id === id))
            .map(({ id }) => propsData.find((act) => act.id === id));
        */
    /////

    // .2 🟢 dobbiamo estrarre dai tags gia selezionati quelli che sono inclusi solo in removedActors
    // // .2.1 🟢 focus su tags come body, roles - gli altri, in teoria, non servono - ma, in teoria, non sono nemmeno salvati in actor allora (?) quindi all good?
    // // .2.2 🟡🧠 i tags gia selezionati sono "state.sideNavData.selected" oppure [...state.sideNavData.selected, ] ?
    let removedTags = [];
    if (removedActors && removedActors.length) {
        const removedActorsData = removedActors.map(({ id }) =>
            propsData.find((act) => act.id === id)
        );

        let removedActorsTags = [];
        removedActorsData.map((act) => {
            if (act.tags) {
                removedActorsTags = [...removedActorsTags, ...act.tags];
            }
        });
        removedTags = currentTags.filter(({ id }) =>
            removedActorsTags.find((t) => t.id === id)
        );

        console.log("🔴 getActorsMissingTags PT. II: ", {
            allActorsIDs,
            removedActors,
            removedTags,
            removedActorsData,
            removedActorsTags,
            // allSelectedTags,
        });
    }

    console.log("🔴 getActorsMissingTags PT. III: ", {
        missingTags: deleteDuplicates(missingTags),
        removedTags: deleteDuplicates(removedTags),
    });

    return {
        missingTags: deleteDuplicates(missingTags),
        removedTags: deleteDuplicates(removedTags),
    };
}

async function oldFn({
    currentSelection,
    currentTags,
    originalFormState,
    propsData,
}) {
    console.log("🔴 getActorsMissingTags: ", {
        currentSelection,
        currentTags,
        originalFormState,
        propsData,
    });
    // 🧠 IN TEORIA "ACTOR" OBJECT LO RICEVO GIA NEL FORM
    // NO NEED TO CALL API AGAIN

    // INVECE NO... VALUES IN FORM ARE ONLY {name, id}
    // 🔴🔴🔴 VEDERE SE DEVO CAMBIARE BE - O SE FILTRO OBJECT DA QUALCHE PARTE 🔴🔴🔴
    // UPDATE: DEVO SPOSTARE FETCH - USARLO PER POPULATE SIDENAV - Cosí abbiamo gia tutto da la`
    try {
        //NEW TAGS

        const { data } = await axios.get("/api/actor/by-id", {
            params: {
                items: JSON.stringify(currentSelection.map((el) => el.id)),
            },
        }); // 🧠 se abbiamo currentSelection stored non fare call
        // 🧠 "actor" e "currentSelection" dovrebbero essere flexible

        // let extractedOriginalIDs = originalFormState.currentSelection.map(
        //     (el) => el.id
        // );
        let allActorsIDs = currentSelection.map((el) => el.id);

        const removedActors = originalFormState.actors.filter(
            (el) => !allActorsIDs.includes(el.id)
        );

        let removedActorsRes;

        // move down!
        if (removedActors && removedActors.length) {
            // We dont need this, we could just filter formState
            // but now formState is storing only id and name - should store all object
            // then change this! 🧠
            /*
            const res = await axios.get("/api/actor/by-id", {
                params: {
                    items: JSON.stringify(removedActors.map((el) => el.id)),
                },
            });
            removedActorsRes = res.data;
            */
        }

        console.log("🔴 getActorsMissingTags PT. II: ", {
            removedActorsRes,
            removedActors,
            allActorsIDs,
            data,
        });

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

        const tagsIdOnly = currentTags.map((t) => t.id);

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
                removedTags = currentTags.filter((el) =>
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
