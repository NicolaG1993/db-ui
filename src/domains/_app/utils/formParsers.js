import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";
import { formatFormInputDate } from "@/src/application/utils/convertTimestamp";

const parseFormProps = (key, value) => {
    if (key === "birthday" || key === "release") {
        return formatFormInputDate(value);
    } else if (
        key === "actors" ||
        key === "studios" ||
        key === "distributions" ||
        key === "categories" ||
        key === "tags"
    ) {
        return value.map((el) => el);
    } else if (key === "movies") {
        return value.map((el) => el);
    } else {
        return value;
    }
    // else if (
    //     key === "pic" ||
    //     key === "id" ||
    //     key === "name" ||
    //     key === "title" ||
    //     key === "nationalities" ||
    //     key === "genre" ||
    //     key === "rating" ||
    //     key === "created_at" ||
    //     key === "type" ||
    //     key === "nameType" ||
    //     key === "group" ||
    //     key === "urls"
    // ) {
    //     return value;
    // }
    // 🧠 Ho commentato questa condition per fare l'hydrate di ActorForm on edit - non so se rompe qualcos'altro 🧠
};

// remove all null, undefined, etc.. from relations obj before calling API - just to be sure we dont have to store in DB wrong values
const cleanFalseRelations = (obj) => {
    let newObj = {};
    Object.entries(obj).map(([key, arr]) => {
        newObj[key] = arr.filter((el) => {
            if (el !== null || el !== undefined) {
                return el;
            }
        });
    });
    return newObj;
};

// used to extract new realtions from array of objects
const newRelationsStandardMethod = (arr, propsData, key) => {
    console.log("newRelationsStandardMethod: ", { arr, propsData, key });
    return arr.filter(
        (id) =>
            !propsData[key]
                .filter((el) => el.id) // skip any corrupted element saved before in db
                .map((el) => el.id) // modify the rest
                .includes(id) // check if includes the user selected x
    );
    // .map((el) => el.id); // get only the ids
};

// used to extract new realtions from array of objects - only for movies
const newRelationsMoviesMethod = (arr, propsData, key) => {
    return arr
        .filter(
            (o) =>
                !propsData[key]
                    .filter((el) => el.title) // skip any corrupted element saved before in db
                    .map((el) => el.title) // modify the rest
                    .includes(o.title) // check if includes the user selected x
        )
        .map((el) => el.id); // get only the ids
};

// used to extract new realtions from array - only for nationalities
const newRelationsNationalitiesMethod = (arr, propsData, key) => {
    return arr
        .filter(
            (o) =>
                !propsData[key]
                    .filter((el) => el)
                    .map((el) => el)
                    .includes(o)
        )
        .map((el) => el);
};

// Used to identify in form which relations are new or removed in the edit
const parseFormRelationsEdit = (allRelations, propsData) => {
    // !important that we need ids and not names for db update
    let addedRelations = {};
    let removedRelations = {};

    console.log("parseFormRelationsEdit: ", { allRelations, propsData });
    if (allRelations) {
        Object.entries(allRelations).map(([key, arr], i) => {
            if (key === "nationalities") {
                // fare anche caso nationality N/A? serve veramente ? 🧠
                // Controllare questa parte 🧠 looks ok-ish but needs check
                addedRelations[key] = newRelationsNationalitiesMethod(
                    arr,
                    propsData,
                    key
                );
                removedRelations[key] = propsData[key].filter(
                    (el) => !arr.map((x) => x).includes(el)
                );

                // check for falsy values already stored in DB - if so add them to removedRelations
                if (propsData[key]) {
                    const falseValues = propsData[key].filter((el) => {
                        if (el === null || el === undefined) {
                            return el;
                        }
                    });
                    if (falseValues.length) {
                        removedRelations[key] = [
                            ...removedRelations[key],
                            null,
                            undefined,
                        ];
                    }
                }
            } else {
                // 🟡🟡🟡 TEST: SEAMS OK
                // set the new relations
                addedRelations[key] = newRelationsStandardMethod(
                    arr, // int[]
                    propsData, // obj
                    key // string (es. "actors")
                );
                // set the deleted relations
                removedRelations[key] = propsData[key]
                    .filter(({ id }) => !arr.includes(id))
                    .map((el) => el.id);
            }
            console.log("addedRelations: ", addedRelations);
            console.log("removedRelations: ", removedRelations);
        });
    }

    addedRelations = cleanFalseRelations(addedRelations);

    return {
        addedRelations,
        removedRelations,
    };
};

/* USED IN FORM TO PARSE ALL RELATIONS ON CREATION/EDIT */
const parseFormRelations = (formRelations, formState) => {
    let allRelations = {};

    formRelations.map(({ topic, label }) => {
        if (label === "nationality") {
            allRelations.nationalities = formState.nationalities;
        } else {
            const parsedRelation = formState[topic].map((el) => el.id);
            allRelations[topic] = parsedRelation;
        }
    });

    return allRelations;
};

// 🧠 the plan is not to use this async anymore - we pass the form relations as prop already
const parseFormRelationsPromise = async (formRelations, formState) => {
    // console.log("ARR: ", formRelations); // [{topic: 'actors', label: 'actor'}, ...]
    let allRelations = {};
    // We need Promise.all because we can't await axiosAuthInstance with map() 👍
    const allPromises = formRelations.map(({ topic, label }) => {
        if (label !== "nationality") {
            return axiosAuthInstance
                .get(`/api/list/all`, {
                    params: { table: label },
                })
                .then(({ data }) => {
                    allRelations[topic] = data
                        .filter((el) => formState[topic].includes(el.name))
                        .map((el) => {
                            return { name: el.name, id: el.id || el.code }; // nationalities non hanno id
                        });
                })
                .catch((err) => console.error(err));
        } else {
            allRelations.nationalities = formState.nationalities;
        }
    });
    return Promise.all(allPromises).then(() => allRelations); // allRelations posso averlo solo dopo aver risolto 🧠
}; // ridurre ad una singola API call - non usarla dentro a map 🧨🧨🧨
const parseFormRelationsPromiseMovie = async (formRelations, formState) => {
    let allRelations = {};
    const allData = await axiosAuthInstance.get(`/api/all/relations`);
    formRelations.map(({ topic, label }) => {
        if (label !== "nationality") {
            allRelations[topic] = data[label]
                .filter((el) => formState[topic].includes(el.name))
                .map((el) => {
                    return { name: el.name, id: el.id || el.code }; // nationalities non hanno id
                });
        }
    });

    return allRelations;
};

/*
function parseDataForForm(obj) {
    const parsedObj = {};
    Object.entries(obj).forEach(([key, value]) =>
        Array.isArray(value) && key !== "urls" && key !== "nationality"
            ? key !== "clips"
                ? (parsedObj[key] = value.map((it) => it.name))
                : (parsedObj[key] = value.map((it) => it.title))
            : (parsedObj[key] = value)
    );
    return parsedObj;
}
*/

export {
    parseFormProps,
    parseFormRelationsEdit,
    parseFormRelations,
    parseFormRelationsPromise,
    newRelationsMoviesMethod,
};
