// TODO: Filters non é in uso al momento, probabilmente necessita profondo refactor 🧠👇🔴👇

import { useEffect, useState } from "react";
import styles from "@/src/application/styles/Home.module.css";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function FiltersBar({
    filters,
    updateFilters,
    closeFilters,
    deleteAllFilters,
    allLabels,
    obj,
    fetchData,
}) {
    const [filterSelect, setFilterSelect] = useState();

    return (
        <div className={styles.filtersWrap}>
            <div className={styles.filtersbar}>
                {allLabels.map((lab) => (
                    <div key={"label " + lab}>
                        <label>
                            {lab.charAt(0).toUpperCase() +
                                lab.slice(1).toLowerCase() +
                                ":"}
                        </label>

                        <div
                            onClick={() => setFilterSelect(lab)}
                            className={
                                filters[lab] && filters[lab].length
                                    ? styles.selectBtnActive
                                    : styles.selectBtn
                            }
                        >
                            {filters[lab] && filters[lab].length ? (
                                <span>{filters[lab].length} selected</span>
                            ) : (
                                <span>Select</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filterSelect && (
                <FiltersUI
                    topic={filterSelect}
                    closeUI={setFilterSelect}
                    filters={filters}
                    updateFilters={updateFilters}
                    // obj={obj}
                    fetchData={fetchData}
                />
            )}

            <div className={styles.uiControls}>
                <Button
                    size="small"
                    type="button"
                    label={"Remove filters"}
                    customStyles={customStyles}
                    onClick={() => {
                        deleteAllFilters({});
                        setFilterSelect(undefined);
                    }}
                />
                <Button
                    size="small"
                    type="button"
                    label={"Close"}
                    customStyles={customStyles}
                    onClick={() => closeFilters(false)}
                />
            </div>
        </div>
    );
    /**
     * this is the first UI part, where we select the nav menu to open
     * labels have to be created dynamicaly
     */
}

//================================================================================
// Filters UI
//================================================================================
const FiltersUI = ({
    topic,
    closeUI,
    filters,
    updateFilters,
    propData,
    obj,
    fetchData,
}) => {
    const [data, setData] = useState(propData || undefined);
    // const [dataByTypes, setDataByTypes] = useState(undefined);

    useEffect(() => {
        // console.log("FiltersUI renders: ", filters);
    }, []);

    useEffect(() => {
        if (topic) {
            setData(undefined);
            // setDataByTypes(undefined);
            // setMacroDataTypes(undefined);
            // setDropdownMenus({});
            // setMacroDropdownMenus({});
            activateFetch();
        }
    }, [topic]);

    const activateFetch = async (str) => {
        let res = await fetchData(str, topic);
        setData(res);
    }; // dovrei importarla come props da parent component 🧠

    /*
   useEffect(() => {
        console.log(topic + " data 🧠🧠: ", data);
        // execute only for tables with column "type" in it
        // potrei creare un api dedicata per non dover riscrivere codice doppio
        if (data && (topic === "tags" || topic === "???")) {
            let newData = {};
            newData = groupJsonByValue(data, "type");
            console.log("newData: ", newData);
            // setData(newData);
            setDataByTypes(newData);

            // crea state dropdownMenus, e metti tutti chiusi (false)
            // let obj = {};
            // Object.keys(newData).map((k) => (obj[k] = false));
            // setDropdownMenus(obj);
        }
    }, [data]);
    */

    return (
        <div className={styles.filtersUI}>
            {topic && (
                <>
                    <div className={styles.filterHeading}>
                        <h4>{topic}</h4>
                        <span onClick={() => closeUI()}>X</span>
                    </div>

                    <div className={styles.dataWrap}>
                        {data ? (
                            <>
                                <div className={styles.allData}>
                                    <div className={styles.content}>
                                        {typeof data === "object" &&
                                            !Array.isArray(data) && (
                                                <DropdownMenusByLevel
                                                    obj={data}
                                                    filters={filters[topic]}
                                                    handleChildState={
                                                        updateFilters
                                                    }
                                                    // styles={styles}
                                                    topic={topic}
                                                />
                                            )}
                                        {Array.isArray(data) &&
                                            data.length > 0 && (
                                                <InputsSelector
                                                    arr={data.map((el) =>
                                                        el.name ? el.name : el
                                                    )}
                                                    filters={filters[topic]}
                                                    handleChildState={
                                                        updateFilters
                                                    }
                                                    styles={styles}
                                                    topic={topic}
                                                />
                                            )}
                                        {topic === "nationalities" && (
                                            <NationalitiesSelector
                                                filters={filters[topic]}
                                                handleChildState={updateFilters}
                                                styles={styles}
                                                topic={topic}
                                            />
                                        )}
                                        {/* {topic === "type" && (
                                        <DropdownMenusByLevel
                                            filters={filters[topic]}
                                            handleChildState={updateFilters}
                                            obj={obj}
                                            // styles={styles}
                                            topic={topic}
                                        />
                                    )} */}
                                    </div>
                                </div>

                                <div className={styles.selectedData}>
                                    <ActiveElements
                                        arr={filters[topic]}
                                        handleChildState={updateFilters}
                                        styles={styles}
                                        topic={topic}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className={styles.allData}>
                                <span>Loading...</span>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );

    /**
     * this is where to display the nav menu selected (dropdowns, etc...)
     * all navs have to be dynamic components
     */
};
