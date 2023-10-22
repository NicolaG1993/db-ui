import styles from "@/src/application/styles/AdminDashboard.module.css";
import ActiveFilters from "@/src/domains/all/components/Filters/ActiveFilters/ActiveFilters";
import DropdownMenusByCategory from "@/src/domains/all/components/Filters/DropdownMenusByCategory/DropdownMenusByCategory";
import InputsSelector from "@/src/domains/all/components/Filters/InputsSelector/InputsSelector";
import NationalitiesSelector from "@/src/domains/all/components/Filters/NationalitiesSelector/NationalitiesSelector";
import FormSideNavSearchBar from "@/src/domains/_app/components/Form/components/FormSideNav/components/FormSideNavSearchBar.js";
import { useEffect, useState } from "react";
import { searchData } from "@/src/domains/_app/utils/filterData.js";
import getActorsMissingTags from "@/src/domains/_app/components/Form/actions/getActorsMissingTags.js";

export default function FormSideNav({
    data,
    form,
    formState,
    updateFormState,
    openSection,
    setOpenSection,
    handleHintsModal,
    hints,
    acceptHints,
}) {
    const [filteredData, setFilteredData] = useState(data);
    const [searchActive, setSearchActive] = useState(false);

    useEffect(() => {
        setFilteredData(data);
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

    // check possible tags updates from selected actors
    const closeSideNav = async (openSection) => {
        if (openSection === "actors") {
            const missingTags = await getActorsMissingTags(
                formState[openSection],
                formState.tags
            );

            if (missingTags) {
                handleHintsModal(missingTags);
            } else {
                setOpenSection(false);
            }
        } else {
            setOpenSection(false);
        }
    };

    const handleSubmitTags = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        let res = formState.tags;
        for (const value of formData.values()) {
            res.push(value);
        }
        acceptHints(res);
    };

    return (
        <div
            className={styles.sidewrap}
            style={{
                transform: openSection ? "translateX(0)" : "translateX(498px)",
            }}
        >
            {hints.length ? (
                <div>
                    <p>
                        We have found some new tags for you, select which one to
                        add:
                    </p>
                    <form id="hintsForm" onSubmit={(e) => handleSubmitTags(e)}>
                        {hints.map((el) => (
                            <div key={`hint ` + el}>
                                <input
                                    type="checkbox"
                                    id={el}
                                    name={el}
                                    value={el}
                                    defaultChecked
                                />
                                <label htmlFor={el}>{el}</label>
                            </div>
                        ))}
                        <div>
                            <button
                                title="Skip this step"
                                onClick={() => {
                                    handleHintsModal([]);
                                    setOpenSection(false);
                                }}
                            >
                                Skip
                            </button>
                            <button
                                title="Confirm your choice"
                                type="submit"
                                form="hintsForm"
                            >
                                Confirm
                            </button>
                        </div>
                    </form>
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
                                        <DropdownMenusByCategory
                                            obj={filteredData}
                                            filters={formState[openSection]}
                                            handleChildState={updateFormState}
                                            topic={openSection}
                                        />
                                    )}
                                {filteredData && filteredData.length && (
                                    <InputsSelector
                                        arr={filteredData.map((el) =>
                                            el.name ? el.name : el
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
