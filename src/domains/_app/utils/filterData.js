// UTILS // maybe move from here 🧠
const filterArray = (arr, str) =>
    arr.filter((el) =>
        el.name
            ? el.name.toLowerCase().includes(str)
            : el.toLowerCase().includes(str)
    );

// used to search matching string in a given array of string or object of arrays
const searchData = (data, str) => {
    console.log("🧨 searchData: ", { data, str });
    // CASES
    if (str && str.trim().length > 0) {
        str = str.trim().toLowerCase();
        // FOR TAGS OBJ
        // Questa parte per TAGS OBJ potrebbe non servire piú
        // Adesso per tags non torniamo mai un array, ma solo obj modificato
        // si potrebbe peró integrare qui "searchDataOnLevel()" 🧠
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

// NOT IN USE 🧠
const searchDataOnLevel = (data, str, TAGS_OBJ) => {
    console.log("🧨 searchDataOnLevel: ", { data, str, TAGS_OBJ });
    if (str && str.trim().length > 0) {
        // TODO:
        // Loopare nell'oggetto ogni field,
        // quando arrivo ad array come value
        // devo filtrarla.

        // Per ogni "el" di array
        // faccio il match con "str"
        // se lo passa
        // "el" rimane,
        // se no viene rimosso.
        let filteredData = filterArray(data, str);

        // Il risultato viene passato prima da "groupJsonByValue"
        let result = groupJsonByValue(filteredData, "type");
        // poi da "parseTagsByType"
        let newMenuStructure = parseTagsByType(result, TAGS_OBJ);
        // 🔴 FIX: TAGS_OBJ = undefined

        // Usiamo questo nuovo "newMenuStructure" object
        // come nuovo filteredData
        return newMenuStructure;
    }
};

export { searchData, searchDataOnLevel };
