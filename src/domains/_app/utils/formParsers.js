import { formatFormInputDate } from "@/src/application/utils/convertTimestamp";
import axios from "axios";

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
    return arr
        .filter(
            (o) =>
                !propsData[key]
                    .filter((el) => el.name) // skip any corrupted element saved before in db
                    .map((el) => el.name) // modify the rest
                    .includes(o.name) // check if includes the user selected x
        )
        .map((el) => el.id); // get only the ids
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
const parseFormRelationsEdit = (relatedData, propsData) => {
    // !important that we need ids and not names for db update
    let addedRelations = {};
    let removedRelations = {};

    if (relatedData) {
        Object.entries(relatedData).map(([key, arr], i) => {
            if (key === "nationalities") {
                // fare anche caso nationality N/A? serve veramente ? 🧠
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
                // set the new relations
                addedRelations[key] = newRelationsStandardMethod(
                    arr,
                    propsData,
                    key
                );
                // set the deleted relations
                removedRelations[key] = propsData[key]
                    .filter((el) => !arr.map((el) => el.id).includes(el.id))
                    .map((el) => el.id);
            }
        });
    }

    addedRelations = cleanFalseRelations(addedRelations);

    return {
        addedRelations,
        removedRelations,
    };
};

/* USED IN FORM TO PARSE ALL RELATIONS ON CREATION/EDIT */
const parseFormRelationsPromise = async (arr, formState) => {
    // console.log("ARR: ", arr); // [{topic: 'actors', label: 'actor'}, ...]
    let relatedData = {};
    // We need Promise.all because we can't await axios with map() 👍
    const allPromises = arr.map(({ topic, label }) => {
        if (label !== "nationality") {
            return axios
                .get(`/api/list/all`, {
                    params: { table: label },
                })
                .then(({ data }) => {
                    relatedData[topic] = data
                        .filter((el) => formState[topic].includes(el.name))
                        .map((el) => {
                            return { name: el.name, id: el.id || el.code }; // nationalities non hanno id
                        });
                })
                .catch((err) => console.error(err));
        } else {
            relatedData.nationalities = formState.nationalities;
        }
    });
    return Promise.all(allPromises).then(() => relatedData); // relatedData posso averlo solo dopo aver risolto 🧠
}; // ridurre ad una singola API call - non usarla dentro a map 🧨🧨🧨
const parseFormRelationsPromiseMovie = async (arr, formState) => {
    let relatedData = {};
    const allData = await axios.get(`/api/all/relations`);
    arr.map(({ topic, label }) => {
        if (label !== "nationality") {
            relatedData[topic] = data[label]
                .filter((el) => formState[topic].includes(el.name))
                .map((el) => {
                    return { name: el.name, id: el.id || el.code }; // nationalities non hanno id
                });
        }
    });

    return relatedData;
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
    parseFormRelationsPromise,
    newRelationsMoviesMethod,
};
