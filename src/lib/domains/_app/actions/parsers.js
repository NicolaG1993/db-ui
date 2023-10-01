const groupJsonByValue = function (jsonObj, key) {
    return jsonObj.reduce(function (accumulator, current) {
        (accumulator[current[key]] = accumulator[current[key]] || []).push(
            current.name // rimuovere ".name" se current non é obj
        );
        return accumulator;
    }, {});
}; // dovrei farne una utils su NGD 🧠👍

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

export { groupJsonByValue };
