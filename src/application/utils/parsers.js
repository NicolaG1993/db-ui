// UTILS DA UTILIZZARE ANCHE IN ALTRE APPS

const groupJsonByValue = function (jsonObj, key) {
    return jsonObj.reduce(function (accumulator, current) {
        (accumulator[current[key]] = accumulator[current[key]] || []).push(
            current.name // rimuovere ".name" se current non é obj
        );
        return accumulator;
    }, {});
}; // dovrei farne una utils su NGD 🧠👍

// used to delete empty arrays inside a json object
const deleteJSONEmptyArrays = (jsonObj) => {
    const parsedObject = JSON.parse(jsonObj);
    const allKeys = Object.keys(parsedObject);
    allKeys.map((k) => {
        if (!parsedObject[k].length) {
            parsedObject[k] = undefined;
        }
    });
    return parsedObject;
};

// used to merge array avoiding duplicate values
const mergeArrays = (array1, array2) => {
    return [...new Set([...array1, ...array2])];
};

// used to reduce array to unique values
const onlyUnique = (arr) => {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
};

/*
function parseDataForDB(obj) {
    const parsedObj = {};
    Object.entries(obj).forEach(([key, value]) =>
        Array.isArray(value) && key !== "urls" && key !== "nationality"
            ? (parsedObj[key] = value.map((it) => it.id))
            : (parsedObj[key] = value)
    );
    return parsedObj;
}
*/

export { groupJsonByValue, deleteJSONEmptyArrays, mergeArrays, onlyUnique };
