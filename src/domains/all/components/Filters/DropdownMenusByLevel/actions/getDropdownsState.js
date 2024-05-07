import checkLevelValuesError from "@/src/domains/all/components/Filters/DropdownMenusByLevel/actions/checkLevelValuesError";

// USED TO CREATE AN OBJECT WITH AN OBJECT INSIDE FOR EVERY LEVEL, EVERY OBJECT CONTAINS THE BOOLEAN VALUES FOR ALL THAT LEVEL
// SO THE LEVELS ARE STORED SEPARETELY: BY LEVEL - NOT NESTED INSIDE EACHOTHERS es. {1:{}, 2: {}}

const getDropdownsState = ({ stateObj, propsObj, dropdownMenus }) => {
    // PARSE AND SET DROPDOWN MENUS STATE 1st
    let newObj = {};
    let objectEntries = Object.entries(propsObj);
    let error;

    objectEntries.map(([key, val], i) => {
        newObj[key] = false;
        stateObj = { ...stateObj, 1: newObj };

        error = checkLevelValuesError(val, key); // check for errors

        if (typeof val === "object" && !Array.isArray(val)) {
            let { res, err } = getSubMenusState({
                catValues: val,
                level: 2,
                stateObj,
                dropdownMenus,
            });

            if (err) {
                error = err;
            }

            stateObj = { ...stateObj, ...res };
        }
    });

    return { res: stateObj, err: error };
};

export default getDropdownsState;

// NOT USED OUTSIDE THIS FILE
const getSubMenusState = ({ catValues, level, stateObj, dropdownMenus }) => {
    let newObj = {};
    let levelObj = {
        ...stateObj[level],
        ...dropdownMenus[level],
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
            ...dropdownMenus,
            [level]: levelObj,
        };

        error = checkLevelValuesError(val, key); // check for errors

        if (typeof val === "object" && !Array.isArray(val)) {
            getSubMenusState({
                catValues: val,
                level: Number(level) + 1,
                stateObj,
                dropdownMenus,
            });
        }
    });
    return { res: stateObj, err: error };
};

/*
export { getDropdownsState, getSubMenusState };
*/
