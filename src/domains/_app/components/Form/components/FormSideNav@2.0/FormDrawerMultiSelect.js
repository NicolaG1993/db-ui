import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import checkHints from "@/src/domains/_app/components/Form/actions/checkHints";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
    setupHints,
    searchNavData,
    selectFormPropsData,
    selectFormSideNavData,
    selectFormSideNavFilteredData,
    selectFormState,
    selectFormStoreUI,
    selectFormSideNavSourceData,
    openHintsNav,
    selectFormSideNavSelected,
    updateSideNavSelected,
    concludeDrawer,
    selectFormStoreLabel,
    selectFormSideNavFilters,
    selectFormSideNavRenderReady,
    selectFormSideDropdownsState,
    updateSideNavDropdownsState,
    // handleSideNavRenderReady,
    // hydrateSideNavDropdowns,
} from "@/src/application/redux/slices/formSlice";
import { useAppSelector } from "@/src/application/redux/lib/hooks";
import { selectAppSettings } from "@/src/application/redux/slices/appSettingsSlice";
import MultiSelectSearchBar from "@/src/domains/_app/components/Form/components/FormSideNav@2.0/components/MultiSelectSearchBar";
import extractAllTags from "../../utils/extractAllTags";
import {
    Button,
    InputItemsDropdown,
    InputItemsList,
} from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import createNewMenus from "@/src/domains/all/components/Filters/DropdownMenusByLevel/utils/createNewMenus";

export default function FormDrawerMultiSelect() {
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
    const currentSelection = useAppSelector(selectFormSideNavSelected);
    const formLabel = useAppSelector(selectFormStoreLabel);
    const filters = useAppSelector(selectFormSideNavFilters, shallowEqual);

    const originalFormState = propsData || formState; // TODO: 🧠🧠🧠 we can handle this in one action: res = propsData || formState // this way we delete all conditions in components

    const handleCloseSideNav = ({
        appSettings,
        data,
        formState,
        originalFormState,
        topic,
        currentSelection,
    }) => {
        console.log("handleCloseSideNav: ", {
            appSettings,
            data,
            formState,
            originalFormState,
            topic,
            uiState,
            currentSelection,
        });

        // ----!IGNORE!---- // currentSelection per tags va bene // 🔴🔴🔴 ma per actor abbiamo array di actors

        // TODO: error handling here 🧠
        const res = checkHints({
            appSettings,
            data,
            formState,
            originalFormState,
            topic,
            currentSelection,
        });
        // 🟢 checkRemovedTags()
        // 🧠 fare checkHints() + checkRemovedTags() in una async fn?

        console.log("🧠 res: ", res);
        // no condition needed, we want also undefined values
        dispatch(
            setupHints({
                hints: {
                    missing: res?.missingTags,
                    removed: res?.removedTags,
                },
            })
        );

        if (res?.missingTags?.length || res?.removedTags?.length) {
            dispatch(openHintsNav());
        } else {
            dispatch(concludeDrawer());
        }
    };

    const handleSearch = (str, searchBar) => {
        // str !== searchBar && setSearchBar(str);
        // we have a field in store for saving this 🧠🧠🧠
        // sideNavData.filters.search

        /**
          🧠🧠🧠
         * we could set filter.search in a dedicated action
         * * then call the search action from component with useEffect
         * or we could set filter.search inside searchNavData() action
         * * and run search only if it's different from prev value
         * * * in this case i think we can restore MultiSelectSearchBar
         */

        if (sideNavRawData && filteredData) {
            // console.log("💚 filteredData: ", filteredData);
            dispatch(
                searchNavData({
                    str,
                    TAGS_OBJ: appSettings.TAGS_OBJ,
                })
            );
        }
    };

    // clean searchBar on openSection change 🧠

    /*
                  Drawer
        ___________________________
        |   Left    |    Right    |

             1*            2*
        |___________|_____________|

        1*: formStore.sideNavData.filteredData 
                :type Object (tags non filtered) | Array (filtered tags and other data)
        2*: formStore.sideNavData.selected || []
                :type Array (always)

     */

    /* NEW AFTER REFACTOR 👇👇 */
    const renderReady = useAppSelector(
        selectFormSideNavRenderReady,
        shallowEqual
    );
    const menuStructure = useAppSelector(
        selectFormSideNavFilteredData,
        shallowEqual
    );
    const dropdownsState = useSelector(
        selectFormSideDropdownsState,
        shallowEqual
    );

    const handleClickEl = ({ it, userAction }) => {
        dispatch(
            updateSideNavSelected({
                value: it,
                userAction,
                // userAction: isSelected ? "remove" : "add",
                // log: "Element",
            })
        );
    };

    const handleDropdowns = ({ dropdownsState, index, groupKey }) => {
        // this process may differ for other components, that's why we handle this part here and not in action
        // change if we see it doesn't change 🧠👇
        const newState = createNewMenus({ dropdownsState, index, groupKey });
        dispatch(
            updateSideNavDropdownsState({
                newState,
            })
        );
    };

    return (
        <div id={styles.FormSideNav} className={styles.formDrawerWrap}>
            <div className={styles.formDrawerTopBar}>
                <div className={styles.sideNavHeading}>
                    <p>
                        {`${
                            formLabel.charAt(0).toUpperCase() +
                            formLabel.slice(1)
                        } > ${
                            uiState.sideNavTopic &&
                            uiState.sideNavTopic.charAt(0).toUpperCase() +
                                uiState.sideNavTopic.slice(1)
                        }`}
                    </p>
                    <p>Select the {uiState.sideNavTopic} that you need</p>
                </div>
                <Button
                    size="medium"
                    type="button"
                    onClick={() =>
                        handleCloseSideNav({
                            appSettings,
                            data: sideNavRawData,
                            formState,
                            originalFormState,
                            topic: uiState.sideNavTopic,
                            currentSelection,
                        })
                    }
                    label="Confirm √"
                    customStyles={customStyles}
                />
            </div>

            <div className={styles.sidewrapContent}>
                <div className={styles.sidewrapHeader}>
                    <div className={styles.wrapper}>
                        {/* ???: Create component? 🧠👇 */}
                        <MultiSelectSearchBar
                            topic={uiState.sideNavTopic}
                            data={sourceData}
                            value={filters.search}
                            onChange={(str) => handleSearch(str)}
                        />
                    </div>
                </div>
                <div className={styles.sidewrapBody}>
                    <div className={styles.wrapper}>
                        {!sideNavRawData ? (
                            <p>Loading filters data...</p>
                        ) : (
                            filteredData &&
                            (uiState.sideNavTopic === "tags" ? (
                                filters.search ? (
                                    // <InputsSelector
                                    <InputItemsList
                                        // data={filteredData.map((el) => el)}
                                        data={extractAllTags(filteredData)}
                                        topic={uiState.sideNavTopic}
                                        onClick={handleClickEl}
                                        isLoaded={renderReady}
                                        currentSelection={currentSelection}
                                        customStyles={customStyles}
                                    />
                                ) : (
                                    <InputItemsDropdown
                                        // data={extractAllTags(filteredData)}
                                        topic={uiState.sideNavTopic}
                                        onClick={handleClickEl}
                                        isLoaded={renderReady}
                                        currentSelection={currentSelection}
                                        dropdownsState={dropdownsState}
                                        handleDropdowns={handleDropdowns}
                                        menuStructure={menuStructure}
                                        customStyles={customStyles}
                                    />
                                )
                            ) : filteredData.length &&
                              uiState.sideNavTopic !== "nationalities" ? (
                                <InputItemsList
                                    data={filteredData.map((el) => el)}
                                    topic={uiState.sideNavTopic}
                                    onClick={handleClickEl}
                                    isLoaded={renderReady}
                                    currentSelection={currentSelection}
                                    customStyles={customStyles}
                                />
                            ) : (
                                uiState.sideNavTopic === "nationalities" && (
                                    <InputItemsList
                                        // data={filteredData.map((el) => el)}
                                        data={filteredData.map(
                                            ({ name }) => name
                                        )}
                                        currentSelection={
                                            formState[uiState.sideNavTopic]
                                        }
                                        // currentSelection={currentSelection}
                                        topic={uiState.sideNavTopic}
                                        onClick={handleClickEl}
                                        isLoaded={renderReady}
                                        customStyles={customStyles}
                                    />
                                )
                            ))
                        )}
                    </div>

                    {/* 🔴🔴🔴🔴 FIX!!! 
                    🔴 We should update only sideNavData.selected while here
                    🔴 We will check the auto-tags when closing the whole drawer
                    🔴 And only after that we can updateFormState()
                    🔴🔴 Probably we need a new action only for that, check "updateSideNavSelected()" first
                    🔴 Inside here (and childs) we use formState only as ref 
                    */}
                    <div className={styles.wrapper}>
                        {/* 🧠👇🧠👇 Use InputItemsList.tsx ??? 🧠👇🧠👇 */}
                        {/* <ActiveElements */}
                        <InputItemsList
                            data={currentSelection}
                            topic={uiState.sideNavTopic}
                            onClick={handleClickEl}
                            isLoaded={renderReady}
                            isOnlyActives={true}
                            // onClick={({ val, userAction }) =>
                            //     dispatch(
                            //         updateSideNavSelected({
                            //             value: val,
                            //             userAction,
                            //             log: "ActiveElements",
                            //         })
                            //     )
                            // }
                            customStyles={customStyles}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
