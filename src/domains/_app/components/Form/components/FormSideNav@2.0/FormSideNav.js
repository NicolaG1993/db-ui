import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import ActiveFilters from "@/src/domains/all/components/Filters/ActiveFilters/ActiveFilters";
import DropdownMenusByLevel from "@/src/domains/all/components/Filters/DropdownMenusByLevel/DropdownMenusByLevel";
import InputsSelector from "@/src/domains/all/components/Filters/InputsSelector/InputsSelector";
import NationalitiesSelector from "@/src/domains/all/components/Filters/NationalitiesSelector/NationalitiesSelector";
import FormSideNavSearchBar from "@/src/domains/_app/components/Form/components/FormSideNav/components/FormSideNavSearchBar.js";
import { useEffect, useState } from "react";
import { searchData } from "@/src/domains/_app/utils/filterData.js";
import checkMissingTags from "@/src/domains/_app/components/Form/actions/checkMissingTags";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
    updateHints,
    searchNavData,
    selectFormPropsData,
    selectFormSideNavData,
    selectFormSideNavFilteredData,
    selectFormState,
    selectFormStoreUI,
    updateFormState,
    selectFormSideNavSourceData,
    closeSideNav,
    closeDrawer,
    openHintsNav,
} from "@/src/application/redux/slices/formSlice";
import { useAppSelector } from "@/src/application/redux/lib/hooks";
import { selectAppSettings } from "@/src/application/redux/slices/appSettingsSlice";
// import FormSideNavHints from "@/src/domains/_app/components/Form/components/FormSideNav/components/FormSideNavHints";

export default function FormSideNav(
    {
        //  data,
        //  parsedData,
        //  formState,
        // originalFormState,
        //  updateFormState,
        // handleHints,
        // appSettings,
        // closeSideNav,
        // topic, // check value after refactor 🧠
        // handleDrawer, // forse non serve - chiudo gia con closeSideNav
    }
) {
    const dispatch = useDispatch();

    const appSettings = useSelector(selectAppSettings);
    const uiState = useAppSelector(selectFormStoreUI, shallowEqual);
    const formState = useSelector(selectFormState, shallowEqual);
    const propsData = useSelector(selectFormPropsData, shallowEqual);
    const sourceData = useAppSelector(selectFormSideNavSourceData);
    const sideNavRawData = useAppSelector(selectFormSideNavData);
    const filteredData = useAppSelector(
        selectFormSideNavFilteredData,
        shallowEqual
    );

    const originalFormState = propsData || formState; // TODO: 🧠🧠🧠 we can handle this in one action: res = propsData || formState // this way we delete all conditions in components

    const handleCloseSideNav = async ({
        appSettings,
        data,
        formState,
        originalFormState,
        topic,
    }) => {
        /*
        🔴🔴🔴 FIX: 
        1. tag auto-hints not working
        2. can't delete prevState tags from left list
        3. can't delete tags from research from left list
        4. can't close level
        */
        console.log("handleCloseSideNav: ", {
            appSettings,
            data,
            formState,
            originalFormState,
            topic,
        });
        // TODO: error handling here 🧠
        const res = await checkMissingTags({
            appSettings,
            data,
            formState,
            originalFormState,
            topic,
        });

        console.log("🧠 res: ", res);
        // no condition needed, we want also undefined values
        dispatch(
            updateHints({
                hints: {
                    missing: res?.missingTags,
                    removed: res?.removedTags,
                },
            })
        );

        if (res?.missingTags?.length || res?.removedTags?.length) {
            dispatch(openHintsNav());
        } else {
            dispatch(closeDrawer());
        }
    };

    return (
        <>
            <div className={styles.nav}>
                <p>
                    {uiState.sideNavTopic &&
                        uiState.sideNavTopic.charAt(0).toUpperCase() +
                            uiState.sideNavTopic.slice(1)}
                </p>
                <span
                    onClick={() =>
                        handleCloseSideNav({
                            topic: uiState.sideNavTopic,
                            data: sideNavRawData,
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
                            topic={uiState.sideNavTopic}
                            data={sourceData}
                            onChange={(str) => dispatch(searchNavData(str))}
                        />
                    </div>
                </div>
                <div className={styles.sidewrapBody}>
                    <div className={styles.wrapper}>
                        {filteredData &&
                            typeof filteredData === "object" &&
                            !Array.isArray(filteredData) && (
                                <DropdownMenusByLevel
                                    // menuStructure={filteredData}
                                    // filters={formState[uiState.sideNavTopic]}
                                    // handleChildState={updateFormState}
                                    onChange={({ val, topic }) =>
                                        dispatch(
                                            updateFormState({
                                                val,
                                                topic,
                                            })
                                        )
                                    }
                                    // topic={uiState.sideNavTopic}
                                    userStyles={styles}
                                />
                            )}
                        {filteredData && filteredData.length && (
                            <InputsSelector
                                arr={filteredData.map((el) =>
                                    el.id && el.name
                                        ? { id: el.id, name: el.name }
                                        : el
                                )}
                                filters={formState[uiState.sideNavTopic]}
                                // handleChildState={updateFormState}
                                onChange={({ val, topic }) =>
                                    dispatch(
                                        updateFormState({
                                            val,
                                            topic,
                                        })
                                    )
                                }
                                topic={uiState.sideNavTopic}
                            />
                        )}

                        {uiState.sideNavTopic === "nationalities" && (
                            <NationalitiesSelector
                                filters={formState[uiState.sideNavTopic]}
                                // handleChildState={updateFormState}
                                onChange={({ val, topic }) =>
                                    dispatch(
                                        updateFormState({
                                            val,
                                            topic,
                                        })
                                    )
                                }
                                topic={uiState.sideNavTopic}
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
                            arr={formState[uiState.sideNavTopic]}
                            // handleChildState={updateFormState}
                            onChange={({ val, topic }) =>
                                dispatch(
                                    updateFormState({
                                        val,
                                        topic,
                                    })
                                )
                            }
                            // styles={styles}
                            topic={uiState.sideNavTopic}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
