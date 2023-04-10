/*
    QUESTI SONO TUTTI I PARSER CUSTOM PER OPERAZIONI LEGATE SOLO ALLA STRUTTURA DATI DI QUESTA APP
    Es. - Prepare dati per db - Preparare dati da db per renders in UI dedicate
    Lo scopo é di portare qua tutte quelle funzioni che servono piú volte e con logica avanzata, cosí da poterle invocare in una riga nei vari components
*/

import axios from "axios";
import { formatFormInputDate } from "../convertTimestamp";
import {
    sortByLength,
    sortByObjDate,
    sortByObjNumberValue,
    sortByObjValue,
} from "../orderData";

function parseTagsByType(obj) {
    console.log("parseTagsByType: ", obj);
    console.log("process.env.TAGS_OBJ: ", process.env.TAGS_OBJ);

    // using TAGS_OBJ to create parsedObj
    const secretObj = JSON.parse(process.env.TAGS_OBJ);
    const parsedObj = {};
    Object.entries(secretObj).map(([key, arr]) => {
        let currentObj = {};
        arr.map((str) => (currentObj[str] = obj[str]));
        parsedObj[key] = currentObj;
    });

    // check and merge possible undefined states .aka "No Type"
    let noTypeData = [];
    if (obj["null"]) {
        noTypeData = [...noTypeData, ...obj["null"]];
    }
    if (obj[""]) {
        noTypeData = [...noTypeData, ...obj[""]];
    }
    parsedObj.Unknown["No Type"] = noTypeData;
    console.log("parsedObj: ", parsedObj);
    return parsedObj;
}

function parseTagsByTypeSelection() {
    const parsedObj = JSON.parse(process.env.TAGS_OBJ);
    console.log("💚 parseTagsByTypeSelection: ", parsedObj);
    return parsedObj;
}

function parseCategoriesByTypeSelection() {
    const parsedObj = JSON.parse(process.env.CATEGORY_TYPES);
    return parsedObj;
}

function parseTagsForUiList(arr) {
    let parsedObj = {};

    arr.map((el) => {
        if (parsedObj[el.type]) {
            parsedObj[el.type].push(el);
        } else {
            parsedObj[el.type] = [el];
        }
    });

    if (parsedObj["null"] || parsedObj[""]) {
        let noTypeData = [];
        if (parsedObj["null"]) {
            noTypeData = [...noTypeData, ...parsedObj["null"]];
            delete parsedObj["null"];
        }
        if (parsedObj[""]) {
            noTypeData = [...noTypeData, ...parsedObj[""]];
            delete parsedObj[""];
        }
        parsedObj["No Type"] = noTypeData;
    }

    return parsedObj;
}

const orderData = (arr, order) => {
    let response;
    if (order === "title" || order === "name") {
        response = sortByObjValue(arr, order, "asc");
    }
    if (order === "rating") {
        response = sortByObjNumberValue(arr, order, "desc");
    }
    if (order === "release") {
        response = sortByObjDate(arr, order, "desc");
    }
    if (order === "created_at") {
        response = sortByObjDate(arr, order, "desc");
    }
    if (order === "birthday") {
        response = sortByObjDate(arr, order, "desc");
    }
    if (order === "movies") {
        response = sortByLength(arr, "urls", "desc");
    }
    //reversed
    if (order === "title_reversed") {
        response = sortByObjValue(arr, "title", "desc");
    }
    if (order === "name_reversed") {
        response = sortByObjValue(arr, "name", "desc");
    }
    if (order === "rating_reversed") {
        response = sortByObjNumberValue(arr, "rating", "asc");
    }
    if (order === "release_reversed") {
        response = sortByObjDate(arr, "release", "asc");
    }
    if (order === "older") {
        response = sortByObjDate(arr, "created_at", "asc");
    }
    if (order === "birthday_reversed") {
        response = sortByObjDate(arr, order, "asc");
    }
    if (order === "movies_reversed") {
        response = sortByLength(arr, "urls", "asc");
    }
    return response;
};
const parseOrderOptions = (arr) => {
    return (
        <>
            {arr.map((value) => {
                if (value === "name") {
                    return (
                        <option value={value} key={"order option: " + value}>
                            Name (A to Z)
                        </option>
                    );
                }
                if (value === "name_reversed") {
                    return (
                        <option value={value} key={"order option: " + value}>
                            Name (Z to A)
                        </option>
                    );
                }
                if (value === "title") {
                    return (
                        <option value={value} key={"order option: " + value}>
                            Title (A to Z)
                        </option>
                    );
                }
                if (value === "title_reversed") {
                    return (
                        <option value={value} key={"order option: " + value}>
                            Title (Z to A)
                        </option>
                    );
                }
                if (value === "rating") {
                    return (
                        <option value={value} key={"order option: " + value}>
                            Rating (Higher)
                        </option>
                    );
                }
                if (value === "rating_reversed") {
                    return (
                        <option value={value} key={"order option: " + value}>
                            Rating (Lower)
                        </option>
                    );
                }
                if (value === "birthday") {
                    return (
                        <option value={value} key={"order option: " + value}>
                            Age (Younger)
                        </option>
                    );
                }
                if (value === "birthday_reversed") {
                    return (
                        <option value={value} key={"order option: " + value}>
                            Age (Older)
                        </option>
                    );
                }
                if (value === "movies") {
                    return (
                        <option value={value} key={"order option: " + value}>
                            Movies (desc)
                        </option>
                    );
                }
                if (value === "movies_reversed") {
                    return (
                        <option value={value} key={"order option: " + value}>
                            Movies (asc)
                        </option>
                    );
                }
                if (value === "release") {
                    return (
                        <option value={value} key={"order option: " + value}>
                            Release (Newest)
                        </option>
                    );
                }
                if (value === "older") {
                    return (
                        <option value={value} key={"order option: " + value}>
                            Release (Older)
                        </option>
                    );
                }
                if (value === "created_at") {
                    return (
                        <option value={value} key={"order option: " + value}>
                            Latest
                        </option>
                    );
                }
            })}
        </>
    );
};

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
        return value.map((el) => el.name);
    } else if (key === "movies") {
        return value.map((el) => el.title);
    } else if (
        key === "pic" ||
        key === "id" ||
        key === "name" ||
        key === "title" ||
        key === "nationalities" ||
        key === "genre" ||
        key === "rating" ||
        key === "created_at" ||
        key === "urls"
    ) {
        return value;
    }
};

const parseFormRelationsPromise = async (arr, formState) => {
    let relatedData = {};
    // We need Promise.all because we can't await axios with map() 👍
    const allPromises = arr.map(({ topic, label }) => {
        return axios
            .get(`/api/${label}/all`)
            .then(({ data }) => {
                console.log("💛💛💛 data", label, data);
                relatedData[topic] = data
                    .filter((el) => formState[topic].includes(el.name))
                    .map((el) => {
                        return { name: el.name, id: el.id || el.code }; // nationalities non hanno id
                    });
            })
            .catch((err) => console.error(err));
    });
    return Promise.all(allPromises).then(() => relatedData); // relatedData posso averlo solo dopo aver risolto 🧠
};

const parseFormRelationsEdit = (relatedData, propsData) => {
    console.log("💛💛💛 parseFormRelationsEdit", relatedData, propsData);
    // !important that we need ids and not names for db update
    let addedRelations = {};
    let removedRelations = {};

    let standardMethod = (arr, propsData, key) => {
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

    let nationalitiesMethod = (arr, propsData, key) => {
        return arr
            .filter(
                (o) =>
                    !propsData[key]
                        .filter((el) => el)
                        .map((el) => el)
                        .includes(o.name)
            )
            .map((el) => el.name);
    };

    if (relatedData) {
        Object.entries(relatedData).map(([key, arr], i) => {
            console.log("💛💛💛 parseFormRelationsEdit data", key, arr);

            if (key === "nationalities") {
                // fare anche caso nationality N/A? serve veramente ? 🧠
                addedRelations[key] = nationalitiesMethod(arr, propsData, key);
                removedRelations[key] = propsData[key].filter(
                    (el) => !arr.map((x) => x.name).includes(el)
                );
            } else {
                // set the new relations
                addedRelations[key] = standardMethod(arr, propsData, key);
                // set the deleted relations
                removedRelations[key] = propsData[key]
                    .filter((el) => !arr.map((el) => el.id).includes(el.id))
                    .map((el) => el.id);
            }
        });
    }

    return {
        addedRelations,
        removedRelations,
    };
};

const tagsCheck = (tags) => {
    let parsedTags = [];

    const anyExist = (arr, values) =>
        values.some((value) => {
            return arr.includes(Number(value));
        }); //  arr é l'array da filtrare, values sono i valori da cercare
    // se uno dei valori é presente in arr torna true

    const relations = JSON.parse(process.env.TAGS_REL);

    Object.entries(relations).map(([key, obj]) => {
        if (anyExist(tags, obj.related)) {
            //se tags contiene uno di questi valori
            parsedTags.push(Number(obj.id)); //aggiungi obj.id a parsedTags
        }
    });

    return [...parsedTags, ...tags];
};

const detectImage = (obj) => {
    if (obj && obj.movies && obj.movies.length) {
        let validElements = obj.movies.filter((el) => el.pic);
        if (validElements.length) {
            return validElements[0].pic;
        } else {
            return "/no-image.png";
        }
    } else {
        return "/no-image.png";
    }
};

export {
    parseTagsByType,
    parseTagsByTypeSelection,
    parseCategoriesByTypeSelection,
    parseTagsForUiList,
    orderData,
    parseOrderOptions,
    parseFormProps,
    parseFormRelationsPromise,
    parseFormRelationsEdit,
    tagsCheck,
    detectImage,
};
