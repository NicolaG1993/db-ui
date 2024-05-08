import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import ActiveFilters from "@/src/domains/all/components/Filters/ActiveFilters/ActiveFilters";
import DropdownMenusByLevel from "@/src/domains/all/components/Filters/DropdownMenusByLevel/DropdownMenusByLevel";
import InputsSelector from "@/src/domains/all/components/Filters/InputsSelector/InputsSelector";
import NationalitiesSelector from "@/src/domains/all/components/Filters/NationalitiesSelector/NationalitiesSelector";
import FormSideNavSearchBar from "@/src/domains/_app/components/Form/components/FormSideNav/components/FormSideNavSearchBar.js";
import { useEffect, useState } from "react";
import { searchData } from "@/src/domains/_app/utils/filterData.js";
import getActorsMissingTags from "@/src/domains/_app/components/Form/actions/getActorsMissingTags.js";
import extractMissingTags from "@/src/domains/_app/components/Form/actions/extractMissingTags.js";
// import FormSideNavHints from "@/src/domains/_app/components/Form/components/FormSideNav/components/FormSideNavHints";

export default function FormSideNav({
    data,
    parsedData,
    formState,
    originalFormState,
    updateFormState,
    topic, // check value after refactor 🧠
    handleDrawer,
    handleHints,
    hints,
    acceptMissingHints,
    acceptRemovedHints,
    appSettings,
}) {
    console.log("🌹 FormSideNav: ", {
        data,
        parsedData,
        formState,
        originalFormState,
        updateFormState,
        topic,
        handleDrawer,
        handleHints,
        hints,
        acceptMissingHints,
        acceptRemovedHints,
        appSettings,
    });
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

    const closeSideNav = async (topic, data) => {
        let res;

        // check possible tags updates from selected actors
        if (topic === "actors") {
            // 🧠 i refactored extractMissingTags without API calls, maybe i can do it also here?
            res = await getActorsMissingTags(
                formState[topic],
                formState.tags,
                originalFormState,
                data
            );
            console.log("getActorsMissingTags: ", res);
        } else if (topic === "tags") {
            // check for related tags that could be missing
            res = extractMissingTags(
                formState[topic],
                appSettings.TAGS_REL,
                data
            );
            console.log("extractMissingTags: ", res);
        } else {
            handleSideNav(false);
        }

        if (res?.missingTags && res?.removedTags) {
            handleHints(res.missingTags, res.removedTags);
        } else {
            handleSideNav(false);
        }
    }; // TO BE CONTINUED ... 💡💡💡

    return (
        <>
            <div className={styles.nav}>
                <p>{topic && topic.charAt(0).toUpperCase() + topic.slice(1)}</p>
                <span onClick={() => closeSideNav(topic, data)}>X</span>
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
                        <ActiveFilters
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
