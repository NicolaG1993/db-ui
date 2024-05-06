import { useEffect, useState } from "react";
import standardStyles from "@/src/domains/all/components/Filters/InputsSelector/InputsSelector.module.css";
import ErrorUI from "@/src/domains/_app/components/Error/components/ErrorUI/ErrorUI";
import updateFilters from "@/src/domains/all/components/Filters/DropdownMenusByCategory/actions/updateFilters";
import { getMenusState } from "@/src/domains/all/components/Filters/DropdownMenusByCategory/actions/getMenusStates";

const loopObject = (object) => Object.entries(object); // utils 🧠

function DropdownMenus({ menuStructure, dropdownMenus }) {
    const renderAllData = (menuStructure) => {
        let objectEntries = loopObject(menuStructure);
        console.log("renderAllData: ", {
            menuStructure,
            dropdownMenus,
            objectEntries,
        });
        return checkEntries(objectEntries, 1);
    };

    const checkEntries = (array, level) => {
        console.log("checkEntries: ", { array, level });
        return array.map(([key, values], i) =>
            renderCategory(values, key, level, dropdownMenus)
        );
    };

    const renderCategory = (values, key, level, dropdownMenus) => {
        console.log("🔥 renderCategory: ", {
            values,
            key,
            level,
            dropdownMenus,
        });

        // TODO ...
    };

    // return <></>;
    return renderAllData(menuStructure);
}

export default function DropdownMenusByCategory(props) {
    //////////////////////////////
    // STATE
    //////////////////////////////

    console.log("*🌸 Rendering *DropdownMenusByCategory* ", props);

    // TODO:
    // props.menuStructure contiene solo names
    // abbinargli gli ids corrispondenti (da tags che riceviamo da API on render)
    // renderizzarli nel gruppo corretto
    // handle add
    // handle remove
    // handle tags hints

    const [error, setError] = useState();
    const [dropdownMenus, setDropdownMenus] = useState({});
    const [renderReady, setRenderReady] = useState(false);
    const [stateObj, setStateObj] = useState({}); // ??? elimina ???

    let styles = props.styles
        ? { ...standardStyles, ...props.styles }
        : standardStyles;

    useEffect(() => {
        if (!props.menuStructure) {
            setError("Error: props.menuStructure is missing");
        } else if (typeof props.menuStructure !== "object") {
            setError("Error: props.menuStructure is not an object");
        } else if (props.filters && !Array.isArray(props.filters)) {
            setError("Error: props.filters is not an array");
        } else {
            handleMenus(stateObj);
        }
    }, []);

    //////////////////////////////
    // SET DROPDOWN MENUS
    //////////////////////////////
    const handleMenus = (stateObj) => {
        // rename handleMenus() to hydrateDropdowns() 🧠
        // rename getMenusState() to getDropdownsState() 🧠
        let { res, err } = getMenusState({
            stateObj,
            propsObj: props.menuStructure,
            dropdownMenus,
        });
        console.log("🧠 handleMenus: ", {
            stateObj,
            res,
            err,
        });
        err && setError(err); // 🧠 handle Error correctly - now we are just storing it 🧠
        setDropdownMenus(res); // rename setDropdownMenus() to setDropdownsState() 🧠
        setRenderReady(true);
    };

    //////////////////////////////
    // DOM
    //////////////////////////////

    return (
        <DropdownMenus
            menuStructure={props.menuStructure}
            dropdownMenus={dropdownMenus}
        />
    );
    // return <div className={styles.categoryDropdown}>...</div>;

    // return (
    //     <>
    //         {error ? (
    //             <ErrorUI error={error} styles={null} />
    //         ) : renderReady ? (
    //             renderAllData(props.menuStructure)
    //         ) : (
    //             "Loading"
    //         )}
    //     </>
    // );
}

/*
export default function DropdownMenusByCategory(props) {
    //////////////////////////////
    // STATE
    //////////////////////////////
    console.log("*Rendering *DropdownMenusByCategory* ", props);
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
        if (!props.menuStructure) {
            setError("Error: props.menuStructure is missing");
        } else if (typeof props.menuStructure !== "object") {
            setError("Error: props.menuStructure is not an object");
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
    // RENDERING
    //////////////////////////////
 
   

    const renderCategory = (values, key, level, dropdownMenus) => {
        console.log("🔥 renderCategory: ", {
            values,
            key,
            level,
            dropdownMenus,
        });
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
        console.log("renderValues ACTIVATED 🧨", { array, key });
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
                renderAllData(props.menuStructure)
            ) : (
                "Loading"
            )}
        </>
    );
}

// FARE CUSTOM COMPONENTS DI QUESTO 🧠👍
// È GIA PRONTO!

*/
