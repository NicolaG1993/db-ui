import { useEffect, useState } from "react";
import standardStyles from "@/src/domains/all/components/Filters/InputsSelector/InputsSelector.module.css";
import ErrorUI from "@/src/domains/_app/components/Error/components/ErrorUI/ErrorUI";
import updateFilters from "@/src/domains/all/components/Filters/DropdownMenusByCategory/actions/updateFilters";
import { getMenusState } from "@/src/domains/all/components/Filters/DropdownMenusByCategory/actions/getMenusStates";

export default function DropdownMenusByCategory(props) {
    //////////////////////////////
    // STATE
    //////////////////////////////
    // console.log("*Rendering *DropdownMenusByCategory* ", props);
    const [error, setError] = useState();
    const [stateObj, setStateObj] = useState({});
    const [dropdownMenus, setDropdownMenus] = useState({});
    const [renderReady, setRenderReady] = useState(false);
    const [filters, setFilters] = useState(props.filters || []);

    let styles = props.styles
        ? { ...standardStyles, ...props.styles }
        : standardStyles;

    const loopObject = (object) => Object.entries(object);

    useEffect(() => {
        if (!props.obj) {
            setError("Error: props.obj is missing");
        } else if (typeof props.obj !== "object") {
            setError("Error: props.obj is not an object");
        } else if (props.filters && !Array.isArray(props.filters)) {
            setError("Error: props.filters is not an array");
        } else {
            handleMenus(stateObj);
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
    const handleFilters = (val, action) => {
        let array = updateFilters(val, action, props, filters, dropdownMenus);
        setFilters(array);
    };

    //////////////////////////////
    // SET DROPDOWN MENUS
    //////////////////////////////
    const handleMenus = (stateObj) => {
        let { res, err } = getMenusState({
            stateObj,
            propsObj: props.obj,
            dropdownMenus,
        });
        err && setError(err);
        setDropdownMenus(res);
        setRenderReady(true);
    };

    //////////////////////////////
    // RENDERING
    //////////////////////////////
    const renderAllData = (object) => {
        let objectEntries = loopObject(object);
        return checkEntries(objectEntries, 1);
    };

    const checkEntries = (array, level) => {
        return array.map(([key, values], i) =>
            renderCategory(values, key, level, dropdownMenus)
        );
    };

    const renderCategory = (values, key, level, dropdownMenus) => {
        if (values) {
            if (Array.isArray(values)) {
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

    const renderValues = (array, key) => {
        // console.log("renderValues ACTIVATED 🧨", { array, key });
        return (
            <div className={styles.categoryDropdown}>
                {array.map((it) => {
                    return props.filters &&
                        props.filters.find((x) => it === x) ? (
                        <div key={"value: " + it + " key: " + key}>
                            <span
                                className={styles.selectedEl}
                                onClick={() => handleFilters(it, "remove")}
                            >
                                {it}
                            </span>
                        </div>
                    ) : (
                        <div key={"value: " + it + " key: " + key}>
                            <span
                                className={styles.unselectedEl}
                                onClick={() => handleFilters(it, "add")}
                            >
                                {it}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <>
            {error ? (
                <ErrorUI error={error} styles={null} />
            ) : renderReady ? (
                renderAllData(props.obj)
            ) : (
                "Loading"
            )}
        </>
    );
}

// FARE CUSTOM COMPONENTS DI QUESTO 🧠👍
// È GIA PRONTO!
