import { useEffect, useState } from "react";
import standardStyles from "@/src/domains/all/components/Filters/InputsSelector/InputsSelector.module.css";
import ErrorUI from "@/src/domains/_app/components/Error/components/ErrorUI/ErrorUI";
import updateFilters from "@/src/domains/all/components/Filters/DropdownMenusByCategory/actions/updateFilters";
import { getMenusState } from "@/src/domains/all/components/Filters/DropdownMenusByCategory/actions/getMenusStates";
import { renderCategory } from "./utils/parseDropdownMenusData";
import loopObject from "@/src/domains/_app/utils/loopObject";

// Utils
const renderDropdownLevel = ({
    menuStructure,
    index,
    styles,
    dropdownMenus,
    filters,
    handleMenus, // queste due fn vanno rimosse da props in qualche modo
    handleFilters, // queste due fn vanno rimosse da props in qualche modo
}) => {
    console.log("renderDropdownLevel: ", {
        menuStructure,
        index,
        styles,
        dropdownMenus,
    });
    return loopObject(menuStructure).map(([key, values], i) => {
        console.log("⭐ loopObject(menuStructure) el: ", {
            key,
            values,
        });

        if (values) {
            if (Array.isArray(values)) {
                return (
                    <DropdownMenusList
                        key={key}
                        groupKey={key}
                        values={values}
                        index={index} // buggy ?
                        styles={styles}
                        dropdownMenus={dropdownMenus}
                        handleMenus={handleMenus}
                        filters={filters}
                        handleFilters={handleFilters}
                        menuStructure={menuStructure}
                    />
                );
            } else if (typeof values === "object") {
                return (
                    <DropdownMenusLevel
                        key={key}
                        groupKey={key}
                        values={values}
                        index={index}
                        styles={styles}
                        dropdownMenus={dropdownMenus}
                        filters={filters}
                        handleFilters={handleFilters}
                        handleMenus={handleMenus}
                        menuStructure={menuStructure}
                    />
                );
            }
        }
    });
};

const renderDropdownElements = ({
    array,
    key,
    styles,
    filters,
    handleFilters,
}) => {
    console.log("renderDropdownElements ACTIVATED 🧨", {
        array,
        key,
        styles,
        filters,
        handleFilters,
    });

    return (
        <div className={styles.categoryDropdown}>
            {array.map((it) => {
                return filters && filters.find((x) => it === x) ? (
                    <div
                        key={
                            "Dropdown element (selected) • value: " +
                            it.id +
                            " key: " +
                            key
                        }
                    >
                        <span
                            className={styles.selectedEl}
                            onClick={() => handleFilters(it, "remove")}
                        >
                            {it.name}
                        </span>
                    </div>
                ) : (
                    <div
                        key={
                            "Dropdown element (not selected) • value: " +
                            it.id +
                            " key: " +
                            key
                        }
                    >
                        <span
                            className={styles.unselectedEl}
                            onClick={() => handleFilters(it, "add")}
                        >
                            {it.name}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

// COMPONENTS
function DropdownMenusLevel({
    groupKey,
    values,
    index,
    styles,
    menuStructure,
    dropdownMenus,
    filters,
    handleFilters,
    handleMenus,
}) {
    // FIX - refactor
    // devo prendere styles anche da file o va bene cosí?
    // mi serve proprio "menuStructure" fino a qua?

    // 🔴🔴🔴 FIX! WIP 🔴🔴🔴
    let objectEntries = loopObject(values); // buggy
    const DropdownMenusLevelChilds = () =>
        renderDropdownLevel({
            menuStructure: menuStructure[groupKey],
            index: index++,
            styles,
            dropdownMenus,
            filters,
            handleFilters,
            handleMenus, // 🧠 questa fn fa un giro assurdo come prop, non ideale 🧠
        });

    /*
    const DropdownMenusLevelChilds = () =>
        objectEntries.map(([key, values], i) =>
            renderDropdownLevel({
                menuStructure,
                index: index++,
                styles,
                dropdownMenus,
                handleMenus,
                
                values,
                key,

            })
        );
    */

    console.log("🔴🔴🔴 DropdownMenusLevel: ", {
        groupKey,
        values,
        index,
        styles,
        menuStructure,
        objectEntries,
        dropdownMenus,
    });

    return (
        <div
            className={styles.categoryWrap}
            key={"index: " + index + " key: " + groupKey}
        >
            <div
                className={styles.category}
                onClick={
                    () =>
                        handleMenus({
                            ...dropdownMenus,
                            [index]: {
                                ...dropdownMenus[index],
                                [groupKey]: !dropdownMenus[index][groupKey],
                            },
                        }) // FIX // REFACTOR
                }
            >
                <span>• {groupKey}</span>
                <span>{objectEntries.length}</span>
            </div>
            {dropdownMenus[index][groupKey] && (
                <div className={styles.categoryDropdown}>
                    <DropdownMenusLevelChilds />
                </div>
            )}
        </div>
    );
}

function DropdownMenusList({
    groupKey,
    values,
    index,
    styles,
    menuStructure,
    dropdownMenus,
    filters,
    handleMenus,
    handleFilters,
}) {
    // FIX - refactor
    // devo prendere styles anche da file o va bene cosí?
    // mi serve proprio "menuStructure" fino a qua?

    console.log("DropdownMenusList: ", {
        groupKey,
        values,
        index,
        styles,
        menuStructure,
        dropdownMenus,
        filters,
    });
    return (
        <div
            className={styles.categoryWrap}
            key={"index: " + index + " key: " + groupKey}
        >
            <div
                className={styles.category}
                onClick={() =>
                    handleMenus({
                        ...dropdownMenus,
                        [index]: {
                            ...dropdownMenus[index],
                            [groupKey]: !dropdownMenus[index][groupKey],
                        },
                    })
                }
            >
                <span>• {groupKey}</span>
                <span>{values.length}</span>
            </div>

            {dropdownMenus[index][groupKey] &&
                renderDropdownElements({
                    array: values,
                    groupKey,
                    styles,
                    handleFilters,
                    filters,
                    // filters: props.filters, // ? not sure - maybe just filters
                })}
        </div>
    );
}

/*
function DropdownMenusLevel({ array, index, dropdownMenus }) {
    console.log("✅ DropdownMenusLevel: ", {
        array,
        index,
        dropdownMenus,
    });
    // move outside ? maybe
    // const dataToRender = checkEntries({
    //     array,
    //     index,
    // });

 
    const render = array.map(([key, values], i) => {
        //
        // renderCategory({ values, key, index, dropdownMenus });
        //

        if (values) {
            if (Array.isArray(values)) {
                return <DropdownMenusLevel key={key} index={index} />;
            } else if (typeof values === "object") {
                return <DropdownMenusElement key={key} index={index} />;
            }
        }
    });

    return <div className={""}>{render()}</div>;
    

 
    // if (true) {
    //     return (
    //         <DropdownMenusLevel
    //             array={loopObject(menuStructure)}
    //             index={index++}
    //             dropdownMenus={dropdownMenus}
    //         />
    //     );
    // } else {
    //     return <DropdownMenusElement />;
    // }
    
}
*/

// function DropdownMenus({ menuStructure, dropdownMenus, styles }) {
// move outside
/*
    const renderCategory = ({ values, key, index, dropdownMenus }) => {
        console.log("🔥 renderCategory: ", {
            values,
            key,
            index,
            dropdownMenus,
        });

        // TODO ...
    };
    */
// console.log(" 💦 startRenderData: ", {
//     menuStructure,
//     dropdownMenus,
//     array: loopObject(menuStructure),
//     dataToRender,
// });
///////////////////////////////////
// return (
//     <div id={styles.DropdownMenus}>
//         {renderDropdownLevel(menuStructure, 1)}
//     </div>
// );
/*
    return (
        <DropdownMenusLevel
            array={loopObject(menuStructure)}
            index={1}
            dropdownMenus={dropdownMenus}
        />
    );
    */
// Wrap -> Livello 1 dropdowns -> Livello 2 -> Lista tags
// return startRenderData(menuStructure);
// }

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
    const [filters, setFilters] = useState(props.filters || []);

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
            hydrateDropdowns(stateObj);
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
    // SET DROPDOWN MENUS
    //////////////////////////////
    const hydrateDropdowns = (stateObj) => {
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

    const handleMenus = (newState) => {
        setDropdownMenus(newState);
    };

    //////////////////////////////
    // UPDATE FILTER STATE
    //////////////////////////////
    const handleFilters = (val, action) => {
        let array = updateFilters(val, action, props, filters, dropdownMenus);
        setFilters(array);
    };

    //////////////////////////////
    // DOM
    //////////////////////////////

    /*
    return (
        <DropdownMenus
            menuStructure={props.menuStructure}
            dropdownMenus={dropdownMenus}
            styles={styles}
        />
    );
    */
    return (
        <div id={styles.DropdownMenus}>
            {renderReady ? (
                renderDropdownLevel({
                    menuStructure: props.menuStructure,
                    index: 1,
                    styles,
                    dropdownMenus,
                    filters,
                    handleFilters,
                    handleMenus,
                })
            ) : (
                <p>Loading...</p>
            )}
        </div>
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
