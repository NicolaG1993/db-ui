function parseDataForDB(obj) {
    console.log("obj: ", obj);
    const parsedObj = {};
    Object.entries(obj).forEach(([key, value]) =>
        Array.isArray(value) && key !== "urls" && key !== "nationality"
            ? (parsedObj[key] = value.map((it) => it.id))
            : (parsedObj[key] = value)
    );
    return parsedObj;
}
function parseDataForForm(obj) {
    console.log("obj: ", obj);
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

const filtersParser = (filters) => {
    const parsedFilters = JSON.parse(filters); // parse
    console.log("parsedFilters!", parsedFilters);

    const allObjKeys = Object.keys(parsedFilters); // [models, categories, ...]
    allObjKeys.map((k) => {
        if (!parsedFilters[k].length) {
            parsedFilters[k] = undefined;
        }
    }); // clean filters by deleting empty arrays
    // NB. we are not returning from map, we just have to replace values in another obj (parsedFilters)
    console.log("new parsedFilters!", parsedFilters);
    return parsedFilters;
};

const groupJsonByValue = function (jsonObj, key) {
    return jsonObj.reduce(function (accumulator, current) {
        (accumulator[current[key]] = accumulator[current[key]] || []).push(
            current.name // rimuovere ".name" se current non é obj
        );
        return accumulator;
    }, {});
}; // dovrei farne una utils 🧠👍

export { parseDataForDB, parseDataForForm, filtersParser, groupJsonByValue };
