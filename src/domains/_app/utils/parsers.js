/*
    QUESTI SONO TUTTI I PARSER CUSTOM PER OPERAZIONI LEGATE SOLO ALLA STRUTTURA DATI DI QUESTA APP
    Es. - Prepare dati per db - Preparare dati da db per renders in UI dedicate
    Lo scopo é di portare qua tutte quelle funzioni che servono piú volte e con logica avanzata, cosí da poterle invocare in una riga nei vari components
*/

import {
    sortByLength,
    sortByObjDate,
    sortByObjNumberValue,
    sortByObjValue,
} from "@/src/application/utils/orderData";
// import { onlyUnique } from "@/src/application/utils/parsers";

function parseTagsByType(obj, TAGS_OBJ) {
    console.log("parseTagsByType: ", { obj, TAGS_OBJ });

    // using TAGS_OBJ to create parsedObj
    const parsedObj = {};
    Object.entries(TAGS_OBJ).map(([key, arr]) => {
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
    // console.log("parsedObj: ", parsedObj);
    return parsedObj;
}

// function parseTagsByTypeSelection() {
//     const parsedObj = JSON.parse(process.env.TAGS_OBJ);
//     // console.log("💚 parseTagsByTypeSelection: ", parsedObj);
//     return parsedObj;
// } // SPOSTARE

// function parseCategoriesByTypeSelection(CATEGORY_TYPES) {
//     const parsedObj = JSON.parse(CATEGORY_TYPES);
//     return parsedObj;
// } // SPOSTARE

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

// receive arr of objects // return arr of ids
const extractIDs = (data) => data.map(({ id }) => id);
// receive arr of objects // return arr of ids
const extractNames = (data) => data.map(({ name }) => name);

//  arr é l'array da filtrare, values sono i valori da cercare
// se uno dei valori é presente in arr torna true
const anyExist = (arr, values) =>
    values.some((value) => {
        return arr.includes(Number(value));
    });

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
    parseTagsForUiList,
    orderData,
    parseOrderOptions,
    detectImage,
    extractIDs,
    extractNames,
    anyExist,
};
