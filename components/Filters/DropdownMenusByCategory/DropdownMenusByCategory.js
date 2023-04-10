import { useEffect, useState } from "react";
import standardStyles from "../InputsSelector/InputsSelector.module.css";
import Error from "@/components/Error/Error";

export default function DropdownMenusByCategory(props) {
    //////////////////////////////
    // STATE
    //////////////////////////////
    // console.log("*Rendering *DropdownMenusByCategory* ", props);
    const [error, setError] = useState();
    const [dropdownMenus, setDropdownMenus] = useState({});
    const [renderReady, setRenderReady] = useState(false);
    const [filters, setFilters] = useState(props.filters || []);
    let styles = props.styles
        ? { ...standardStyles, ...props.styles }
        : standardStyles;

    // console.log("PROPS!: ", props);

    useEffect(() => {
        if (!props.obj) {
            setError("Error: props.obj is missing");
        } else if (typeof props.obj !== "object") {
            setError("Error: props.obj is not an object");
        } else if (props.filters && !Array.isArray(props.filters)) {
            setError("Error: props.filters is not an array");
        } else {
            getMenusState();
        }
    }, []);

    useEffect(() => {
        if (
            props.handleChildState &&
            typeof props.handleChildState !== "function"
        ) {
            setError("Error: handleChildState is not a function");
        } else if (props.handleChildState) {
            props.handleChildState(filters, props.topic);
        }
    }, [filters]);

    //////////////////////////////
    // UPDATE FILTER STATE
    //////////////////////////////
    const updateFilters = (val, action) => {
        if (action === "add") {
            // update only if value is not present in array already, bug prevention
            if (props.filters && !props.filters.some((x) => x === val)) {
                setFilters([...props.filters, val]);
            } else if (!filters.some((x) => x === val)) {
                setFilters([...filters, val]);
            }
        }
        if (action === "remove") {
            setFilters(props.filters.filter((x) => x !== val));
        }
    };

    const checkCategoryValues = (val, key) => {
        if (typeof val !== "object" && !Array.isArray(val)) {
            setError(
                `Error: The category "${key}" contains a value that is not an object or an array`
            );
        }
        if (Array.isArray(val)) {
            // if its array check all values inside
            val.map((el) => {
                if (typeof el === "function") {
                    setError(
                        `Error: Some input inside "${key}" category is a function, not a string`
                    );
                } else if (typeof el === "object") {
                    setError(
                        `Error: Some input inside "${key}" category is an object, not a string`
                    );
                } else if (typeof el !== "string" || !el instanceof String) {
                    setError(
                        `Error: Some input inside "${key}" category is not a string`
                    );
                }
            });
        }
    };

    //////////////////////////////
    // SET DROPDOWN MENUS
    //////////////////////////////
    const getMenusState = () => {
        // console.log("getMenusState ACTIVATED 🧠");
        // PARSE AND SET DROPDOWN MENUS STATE 1st
        let newObj = {};
        let objectEntries = loopObject(props.obj);
        objectEntries.map(([key, val], i) => {
            newObj[key] = false;
            stateObj = { ...stateObj, 1: newObj };
            checkCategoryValues(val, key);
            if (typeof val === "object" && !Array.isArray(val)) {
                getSubMenusState(val, 2, stateObj);
            }
        });
        setDropdownMenus(stateObj);
        setRenderReady(true);
    };

    const getSubMenusState = (values, level, state) => {
        // console.log("getSubMenusState ACTIVATED 🧠");
        let newObj = {};
        let levelObj = {
            ...state[level],
            ...dropdownMenus[level],
        };
        let objectEntries = loopObject(values);
        objectEntries.map(([key, val], i) => {
            newObj[key] = false;
            levelObj = {
                ...levelObj,
                ...newObj,
            };
            stateObj = {
                ...state,
                ...dropdownMenus,
                [level]: levelObj,
            };
            checkCategoryValues(val, key);
            if (typeof val === "object" && !Array.isArray(val)) {
                getSubMenusState(val, Number(level) + 1, stateObj);
            }
        });
        // console.log("stateObj: ", stateObj);
        setDropdownMenus(stateObj);
    };

    //////////////////////////////
    // DATA HANDLERS
    //////////////////////////////
    let stateObj; // has to be setted outside the functions
    const loopObject = (object) => Object.entries(object);

    const checkEntries = (array, level) => {
        return array.map(([key, values], i) =>
            renderCategory(values, key, level)
        );
    };

    const renderValues = (array, key) => {
        return (
            <div className={styles.categoryDropdown}>
                {array.map((it) => {
                    return props.filters &&
                        props.filters.find((x) => it === x) ? (
                        <div key={"value: " + it + " key: " + key}>
                            <span
                                className={styles.selectedEl}
                                onClick={() => updateFilters(it, "remove")}
                            >
                                {it}
                            </span>
                        </div>
                    ) : (
                        <div key={"value: " + it + " key: " + key}>
                            <span
                                className={styles.unselectedEl}
                                onClick={() => updateFilters(it, "add")}
                            >
                                {it}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderCategory = (values, key, level) => {
        if (values) {
            if (Array.isArray(values)) {
                // console.log("*props* ", props);
                // console.log("*dropdownMenus* ", dropdownMenus);
                // console.log("values: ", values);
                // console.log("key: ", key);
                // console.log("level: ", level);
                return (
                    <div
                        className={styles.categoryWrap}
                        key={"level: " + level + " key: " + key}
                    >
                        <div
                            className={styles.category}
                            onClick={() =>
                                setDropdownMenus({
                                    ...dropdownMenus,
                                    [level]: {
                                        ...dropdownMenus[level],
                                        [key]: !dropdownMenus[level][key],
                                    },
                                })
                            }
                        >
                            <span>• {key}</span>
                            <span>{values.length}</span>
                        </div>

                        {dropdownMenus[level][key] && renderValues(values, key)}
                    </div>
                );
            } else if (typeof values === "object") {
                let objectEntries = loopObject(values);
                let Res = () => checkEntries(objectEntries, Number(level) + 1);

                return (
                    <div
                        className={styles.categoryWrap}
                        key={"level: " + level + " key: " + key}
                    >
                        <div
                            className={styles.category}
                            onClick={() =>
                                setDropdownMenus({
                                    ...dropdownMenus,
                                    [level]: {
                                        ...dropdownMenus[level],
                                        [key]: !dropdownMenus[level][key],
                                    },
                                })
                            }
                        >
                            <span>• {key}</span>
                            <span>{objectEntries.length}</span>
                        </div>
                        {dropdownMenus[level][key] && (
                            <div className={styles.categoryDropdown}>
                                <Res />
                            </div>
                        )}
                    </div>
                );
            }
        }
    };

    const renderAllData = (object) => {
        let objectEntries = loopObject(object);
        return checkEntries(objectEntries, 1);
    };

    //////////////////////////////
    // RENDERING
    //////////////////////////////
    return (
        <div className={styles.wrapper}>
            {error ? (
                <Error error={error} styles={null} />
            ) : renderReady ? (
                renderAllData(props.obj)
            ) : (
                "Loading"
            )}
        </div>
    );
}

// FARE CUSTOM COMPONENTS DI QUESTO 🧠👍
// È GIA PRONTO!
