// used to search matching string in a given array of string or object of arrays
const searchData = (data, str) => {
    // UTILS
    const filterArray = (arr, str) =>
        arr.filter((el) =>
            el.name ? el.name.includes(str) : el.includes(str)
        );

    // CASES
    if (str && str.trim().length > 0) {
        str = str.trim().toLowerCase();
        // FOR TAGS OBJ
        if (typeof data === "object" && !Array.isArray(data) && data !== null) {
            let convertedToArray = [];
            Object.values(data).map((val) => {
                if (Array.isArray(val)) {
                    convertedToArray.push(val);
                } else if (
                    typeof val === "object" &&
                    !Array.isArray(val) &&
                    val !== null
                ) {
                    Object.values(val).map((v) => {
                        if (Array.isArray(v)) {
                            convertedToArray = [...convertedToArray, ...v];
                        }
                    });
                }
            });

            return filterArray(convertedToArray, str);
        }
        // FOR ARR OF STRINGS
        else if (Array.isArray(data)) {
            return filterArray(data, str);
        }
    }
};

export { searchData };
