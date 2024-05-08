import styles from "@/src/application/styles/AdminDashboard.module.css";
import ActiveFilters from "@/src/domains/all/components/Filters/ActiveFilters/ActiveFilters";
import DropdownMenusByLevel from "@/src/domains/all/components/Filters/DropdownMenusByLevel/DropdownMenusByLevel";
import InputsSelector from "@/src/domains/all/components/Filters/InputsSelector/InputsSelector";
import NationalitiesSelector from "@/src/domains/all/components/Filters/NationalitiesSelector/NationalitiesSelector";
import FormSideNavSearchBar from "@/src/domains/_app/components/Form/components/FormSideNav/components/FormSideNavSearchBar.js";
import { useEffect, useState } from "react";
import { searchData } from "@/src/domains/_app/utils/filterData.js";
import getActorsMissingTags from "@/src/domains/_app/components/Form/actions/getActorsMissingTags.js";
import getTagsMissingTags from "@/src/domains/_app/components/Form/actions/getTagsMissingTags.js";
import FormSideNavHints from "./components/FormSideNavHints";

export default function FormSideNav({
    data,
    parsedData,
    formState,
    originalFormState,
    updateFormState,
    openSection,
    setOpenSection,
    handleHintsModal,
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
        openSection,
        setOpenSection,
        handleHintsModal,
        hints,
        acceptMissingHints,
        acceptRemovedHints,
        appSettings,
    });
    const [sourceData, setSourceData] = useState(parsedData || data);
    const [filteredData, setFilteredData] = useState(sourceData);
    const [searchActive, setSearchActive] = useState(false);

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

    const closeSideNav = async (openSection, data) => {
        let res;

        // check possible tags updates from selected actors
        if (openSection === "actors") {
            // 🧠 i refactored getTagsMissingTags without API calls, maybe i can do it also here?
            res = await getActorsMissingTags(
                formState[openSection],
                formState.tags,
                originalFormState,
                data
            );
            console.log("getActorsMissingTags: ", res);
        } else if (openSection === "tags") {
            // check for related tags that could be missing
            res = getTagsMissingTags(
                formState[openSection],
                appSettings.TAGS_REL,
                data
            );
            console.log("getTagsMissingTags: ", res);
        } else {
            setOpenSection(false);
        }

        if (res && res.missingTags && res.removedTags) {
            handleHintsModal(res.missingTags, res.removedTags);
        } else {
            setOpenSection(false);
        }
    };

    const handleSubmitMissingHints = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        let res = [...formState.tags]; // ! important to use spread here !
        for (const value of formData.values()) {
            console.log("handleSubmitMissingHints: ", {
                target: e.target,
                formDataValue: JSON.parse(value),
            });
            res.push(JSON.parse(value));
        }
        acceptMissingHints(res);
    };

    const handleSubmitRemovedHints = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        let res = [];
        for (const value of formData.values()) {
            res.push(JSON.parse(value));
        }
        acceptRemovedHints(res);
    };

    return (
        <div
            className={styles.sidewrap}
            style={{
                transform: openSection ? "translateX(0)" : "translateX(498px)",
            }}
        >
            {/* 🧠 CREATE COMPONENT FOR THIS PART 🧠 */}
            {hints && (hints.missing?.length || hints.removed?.length) ? (
                <FormSideNavHints
                    hints={hints}
                    handleSubmitMissingHints={handleSubmitMissingHints}
                    handleHintsModal={handleHintsModal}
                />
            ) : (
                <>
                    <div className={styles.nav}>
                        <p>
                            {openSection &&
                                openSection.charAt(0).toUpperCase() +
                                    openSection.slice(1)}
                        </p>
                        <span onClick={() => closeSideNav(openSection, data)}>
                            X
                        </span>
                    </div>

                    <div className={styles.sidewrapContent}>
                        <div className={styles.sidewrapHeader}>
                            <div className={styles.wrapper}>
                                <FormSideNavSearchBar
                                    openSection={openSection}
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
                                            filters={formState[openSection]}
                                            handleChildState={updateFormState}
                                            topic={openSection}
                                        />
                                    )}
                                {filteredData && filteredData.length && (
                                    <InputsSelector
                                        arr={filteredData.map((el) =>
                                            el.id && el.name
                                                ? { id: el.id, name: el.name }
                                                : el
                                        )}
                                        filters={formState[openSection]}
                                        handleChildState={updateFormState}
                                        topic={openSection}
                                    />
                                )}

                                {openSection === "nationalities" && (
                                    <NationalitiesSelector
                                        filters={formState[openSection]}
                                        handleChildState={updateFormState}
                                        topic={openSection}
                                    />
                                    // <InputSelector
                                    //     topic={openSection}
                                    //     topicID={openSection}
                                    //     formState={formState}
                                    //     updateFormState={updateFormState}
                                    //     setOpenSection={setOpenSection}
                                    //     propsData={allNationalities}
                                    // />
                                )}
                            </div>

                            <div className={styles.wrapper}>
                                <ActiveFilters
                                    arr={formState[openSection]}
                                    handleChildState={updateFormState}
                                    // styles={styles}
                                    topic={openSection}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
