const checkLevelValuesError = (val, key) => {
    // console.log("checkLevelValuesError: ", { valType: typeof val, val, key });
    if (typeof val !== "object" && !Array.isArray(val)) {
        return `Error: The level "${key}" contains a value that is not an object or an array`;
    }
    if (Array.isArray(val)) {
        // if its array check all values inside
        val.map((el) => {
            if (typeof el === "function") {
                return `Error: Some input inside "${key}" level is a function, not a string`;
            } else if (typeof el === "object") {
                return `Error: Some input inside "${key}" level is an object, not a string`;
            } else if (typeof el !== "string" || !el instanceof String) {
                return `Error: Some input inside "${key}" level is not a string`;
            }
        });
    }
};

export default checkLevelValuesError;
