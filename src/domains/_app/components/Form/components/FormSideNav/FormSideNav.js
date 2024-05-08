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

export default function FormSideNav({
    data,
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
    const [filteredData, setFilteredData] = useState(data);
    const [searchActive, setSearchActive] = useState(false);

    useEffect(() => {
        setFilteredData(data);
        // console.log("data: ", data);
        setSearchActive(false);
    }, [data]);

    const filterData = (str) => {
        if (str) {
            let arr = searchData(data, str);
            setFilteredData(arr);
            setSearchActive(true);
        } else {
            setFilteredData(data);
            setSearchActive(false);
        }
    };

    const closeSideNav = async (openSection) => {
        let res;

        // check possible tags updates from selected actors
        if (openSection === "actors") {
            res = await getActorsMissingTags(
                formState[openSection],
                formState.tags,
                originalFormState
            );
            console.log("getActorsMissingTags: ", res);
        } else if (openSection === "tags") {
            // check for related tags that could be missing
            res = await getTagsMissingTags(
                formState[openSection],
                appSettings.TAGS_REL
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
            res.push(value);
        }
        acceptMissingHints(res);
    };

    const handleSubmitRemovedHints = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        let res = [];
        for (const value of formData.values()) {
            res.push(value);
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
            {hints && (hints.missing?.length || hints.removed?.length) ? (
                <div>
                    {hints.missing?.length > 0 && (
                        <>
                            <p>
                                We have found some new tags for you, select
                                which one to add:
                            </p>
                            <form
                                id="missingHintsForm"
                                onSubmit={handleSubmitMissingHints}
                            >
                                {hints.missing.map((el) => (
                                    <div key={`hint missing ` + el.id}>
                                        <input
                                            type="checkbox"
                                            id={el.id}
                                            name={el.name}
                                            value={el}
                                            defaultChecked
                                        />
                                        <label htmlFor={el.name}>
                                            {el.name}
                                        </label>
                                    </div>
                                ))}
                                <div>
                                    <button
                                        title="Skip this step"
                                        onClick={() =>
                                            handleHintsModal([], hints.removed)
                                        }
                                        className="button-standard"
                                    >
                                        Skip
                                    </button>
                                    <button
                                        title="Confirm your choice"
                                        type="submit"
                                        form="missingHintsForm"
                                        className="button-standard"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {hints.removed?.length > 0 && (
                        <>
                            <p>
                                We have found some tags that could be removed,
                                select which one are obsolete:
                            </p>
                            <form
                                id="removedHintsForm"
                                onSubmit={handleSubmitMissingHints}
                            >
                                {hints.removed.map((el) => (
                                    <div key={`hint removed ` + el.id}>
                                        <input
                                            type="checkbox"
                                            id={el.id}
                                            name={el.name}
                                            value={el}
                                            // defaultChecked
                                        />
                                        <label htmlFor={el.name}>
                                            {el.name}
                                        </label>
                                    </div>
                                ))}
                                <div>
                                    <button
                                        title="Skip this step"
                                        onClick={() =>
                                            handleHintsModal(hints.missing, [])
                                        }
                                        className="button-standard"
                                    >
                                        Skip
                                    </button>
                                    <button
                                        title="Confirm your choice"
                                        type="submit"
                                        form="removedHintsForm"
                                        className="button-standard"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            ) : (
                <>
                    <div className={styles.nav}>
                        <p>
                            {openSection &&
                                openSection.charAt(0).toUpperCase() +
                                    openSection.slice(1)}
                        </p>
                        <span onClick={() => closeSideNav(openSection)}>X</span>
                    </div>

                    <div className={styles.sidewrapContent}>
                        <div className={styles.sidewrapHeader}>
                            <div className={styles.wrapper}>
                                <FormSideNavSearchBar
                                    openSection={openSection}
                                    data={data}
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
