import checkLevelValuesError from "@/src/domains/all/components/Filters/DropdownMenusByLevel/actions/checkLevelValuesError";

// USED TO CREATE AN OBJECT WITH AN OBJECT INSIDE FOR EVERY LEVEL, EVERY OBJECT CONTAINS THE BOOLEAN VALUES FOR ALL THAT LEVEL
// SO THE LEVELS ARE STORED SEPARETELY: BY LEVEL - NOT NESTED INSIDE EACHOTHERS es. {1:{}, 2: {}}

const getDropdownsState = ({ stateObj, propsObj, dropdownsState }) => {
    // PARSE AND SET DROPDOWN MENUS STATE 1st
    let firstLevelObj = {};
    let objectEntries = Object.entries(propsObj);
    let error;

    const index = 1;

    objectEntries.map(([key, val], i) => {
        firstLevelObj[key] = false;
        stateObj = { ...stateObj, [index]: firstLevelObj }; // non serve "...stateObj" se lo uso solo per hydrate 🧠 // inoltre posso spostare dopo il loop l'assegnamento di stateObj 🧠

        error = checkLevelValuesError(val, key); // check for errors

        if (typeof val === "object" && !Array.isArray(val)) {
            let { res, err } = getSubMenusState({
                catValues: val,
                level: index + 1,
                stateObj,
                dropdownsState,
            });

            if (err) {
                error = err;
            }

            stateObj = { ...stateObj, ...res };
        }
    });

    return { res: stateObj, error };

    // SPIKE: This way works, but only for 2 levels 🧠 there must be a way to improve this
};

export default getDropdownsState;

// NOT USED OUTSIDE THIS FILE
const getSubMenusState = ({ catValues, level, stateObj, dropdownsState }) => {
    let newObj = {};
    let levelObj = {
        ...stateObj[level],
        ...dropdownsState[level],
    };
    let error;

    let objectEntries = Object.entries(catValues);
    objectEntries.map(([key, val], i) => {
        newObj[key] = false;

        levelObj = {
            ...levelObj,
            ...newObj,
        };

        stateObj = {
            ...stateObj,
            ...dropdownsState,
            [level]: levelObj,
        };

        error = checkLevelValuesError(val, key); // check for errors

        if (typeof val === "object" && !Array.isArray(val)) {
            getSubMenusState({
                catValues: val,
                level: Number(level) + 1,
                stateObj,
                dropdownsState,
            });
        }
    });
    return { res: stateObj, err: error };
};

/*
export { getDropdownsState, getSubMenusState };
*/
