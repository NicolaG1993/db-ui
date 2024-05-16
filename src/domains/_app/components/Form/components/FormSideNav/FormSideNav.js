import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import ActiveElements from "@/src/domains/all/components/Filters/ActiveElements/ActiveElements";
import DropdownMenusByLevel from "@/src/domains/all/components/Filters/DropdownMenusByLevel/DropdownMenusByLevel";
import InputsSelector from "@/src/domains/all/components/Filters/InputsSelector/InputsSelector";
import NationalitiesSelector from "@/src/domains/all/components/Filters/NationalitiesSelector/NationalitiesSelector";
import FormSideNavSearchBar from "@/src/domains/_app/components/Form/components/FormSideNav/components/FormSideNavSearchBar.js";
import { useEffect, useState } from "react";
import { searchData } from "@/src/domains/_app/utils/filterData.js";
import checkMissingTags from "../../actions/checkHints";
// import FormSideNavHints from "@/src/domains/_app/components/Form/components/FormSideNav/components/FormSideNavHints";

export default function FormSideNav({
    data,
    parsedData,
    formState,
    originalFormState,
    updateFormState,
    topic, // check value after refactor 🧠
    // handleDrawer, // forse non serve - chiudo gia con closeSideNav
    handleHints,
    appSettings,
    closeSideNav,
}) {
    // console.log("🌹 FormSideNav: ", {
    //     data,
    //     parsedData,
    //     formState,
    //     originalFormState,
    //     topic,
    //     appSettings,
    // });
    const [sourceData, setSourceData] = useState(parsedData || data);
    const [filteredData, setFilteredData] = useState(sourceData);
    const [searchActive, setSearchActive] = useState(false); // ? 🧠 cosa fa ?

    useEffect(() => {
        const selected = parsedData ? parsedData : data;
        setSourceData(selected);
        setFilteredData(selected);
        // console.log("sourceData: ", selected);
        setSearchActive(false);
    }, [data, parsedData]);

    const filterData = (str) => {
        if (str) {
            let arr = searchData(sourceData, str);
            setFilteredData(arr);
            setSearchActive(true);
        } else {
            setFilteredData(sourceData);
            setSearchActive(false);
        }
    };

    const handleCloseSideNav = async ({
        topic,
        data,
        formState,
        originalFormState,
        appSettings,
    }) => {
        // TODO: error handling here 🧠
        const res = await checkMissingTags({
            topic,
            data,
            formState,
            originalFormState,
            appSettings,
        });
        if (res?.missingTags && res?.removedTags) {
            // we set the hints in the global state (parent state for now)
            handleHints(res.missingTags, res.removedTags);
        }

        // we want to close sidenav and open sidehints
        // if there are hints
        // else close drawer
        closeSideNav();
    };

    return (
        <>
            <div className={styles.nav}>
                <p>{topic && topic.charAt(0).toUpperCase() + topic.slice(1)}</p>
                <span
                    onClick={() =>
                        handleCloseSideNav({
                            topic,
                            data,
                            formState,
                            originalFormState,
                            appSettings,
                        })
                    }
                >
                    X
                </span>
            </div>

            <div className={styles.sidewrapContent}>
                <div className={styles.sidewrapHeader}>
                    <div className={styles.wrapper}>
                        <FormSideNavSearchBar
                            topic={topic}
                            data={sourceData}
                            handleSearch={filterData}
                        />
                    </div>
                </div>
                <div className={styles.sidewrapBody}>
                    <div className={styles.wrapper}>
                        {filteredData &&
                            typeof filteredData === "object" &&
                            !Array.isArray(filteredData) && (
                                <DropdownMenusByLevel
                                    menuStructure={filteredData}
                                    filters={formState[topic]}
                                    handleChildState={updateFormState}
                                    topic={topic}
                                />
                            )}
                        {filteredData && filteredData.length && (
                            <InputsSelector
                                arr={filteredData.map((el) =>
                                    el.id && el.name
                                        ? { id: el.id, name: el.name }
                                        : el
                                )}
                                filters={formState[topic]}
                                handleChildState={updateFormState}
                                topic={topic}
                            />
                        )}

                        {topic === "nationalities" && (
                            <NationalitiesSelector
                                filters={formState[topic]}
                                handleChildState={updateFormState}
                                topic={topic}
                            />
                            // <InputSelector
                            //     topic={topic}
                            //     topicID={topic}
                            //     formState={formState}
                            //     updateFormState={updateFormState}
                            //     handleDrawer={handleDrawer}
                            //     propsData={allNationalities}
                            // />
                        )}
                    </div>

                    <div className={styles.wrapper}>
                        <ActiveElements
                            arr={formState[topic]}
                            handleChildState={updateFormState}
                            // styles={styles}
                            topic={topic}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
