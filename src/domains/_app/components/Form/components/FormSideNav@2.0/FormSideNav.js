import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import ActiveElements from "@/src/domains/all/components/Filters/ActiveElements/ActiveElements";
import DropdownMenusByLevel from "@/src/domains/all/components/Filters/DropdownMenusByLevel/DropdownMenusByLevel";
import InputsSelector from "@/src/domains/all/components/Filters/InputsSelector/InputsSelector";
import NationalitiesSelector from "@/src/domains/all/components/Filters/NationalitiesSelector/NationalitiesSelector";
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
} from "@/src/application/redux/slices/formSlice";
import { useAppSelector } from "@/src/application/redux/lib/hooks";
import { selectAppSettings } from "@/src/application/redux/slices/appSettingsSlice";
import FormSideNavSearchBar from "@/src/domains/_app/components/Form/components/FormSideNav@2.0/components/FormSideNavSearchBar";

export default function FormSideNav() {
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
         * * * in this case i think we can restore FormSideNavSearchBar
         */

        if (sideNavRawData && filteredData) {
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

    return (
        <div id={styles.FormSideNav} className={styles.sidewrap}>
            <div className={styles.nav}>
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
                <button
                    className={styles.closeDrawerBtn}
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
                >
                    Confirm √
                </button>
            </div>

            <div className={styles.sidewrapContent}>
                <div className={styles.sidewrapHeader}>
                    <div className={styles.wrapper}>
                        <FormSideNavSearchBar
                            topic={uiState.sideNavTopic}
                            data={sourceData}
                            value={filters.search}
                            onChange={(str) => handleSearch(str)}
                        />
                    </div>
                </div>
                <div className={styles.sidewrapBody}>
                    <div className={styles.wrapper}>
                        {/* 🔴 sistemare condition, questa é in conflitto con la precedente - perché puó trasformare filteredData in array 
                        magari aggiungere label match
                        */}
                        {/* {filteredData && filteredData.length && (
                            <InputsSelector
                                arr={filteredData.map((el) =>
                                    el.id && el.name
                                        ? { id: el.id, name: el.name }
                                        : el
                                )}
                                filters={formState[uiState.sideNavTopic]}
                                topic={uiState.sideNavTopic}
                            />
                        )} */}

                        {/* 🧠 TESTARE NUOVE CONDITIONS 🧠 
                        
                        for loading we could have an overlay, on top of all components - not priority

                        🧠🧠🧠
                        I believe this components should not call action by themself,
                        instead the parent should pass as much props as possible
                        🧠🧠🧠
                        */}

                        {!sideNavRawData ? (
                            <p>Loading filters data...</p>
                        ) : (
                            filteredData &&
                            (uiState.sideNavTopic === "tags" ? (
                                <DropdownMenusByLevel
                                    topic={uiState.sideNavTopic}
                                    userStyles={styles}
                                />
                            ) : filteredData.length &&
                              uiState.sideNavTopic !== "nationalities" ? (
                                <InputsSelector
                                    data={filteredData.map((el) => el)}
                                    topic={uiState.sideNavTopic}
                                />
                            ) : (
                                uiState.sideNavTopic === "nationalities" && (
                                    <NationalitiesSelector
                                        data={filteredData.map(
                                            ({ name }) => name
                                        )}
                                        filters={
                                            formState[uiState.sideNavTopic]
                                        }
                                        topic={uiState.sideNavTopic}
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
                        <ActiveElements
                            topic={uiState.sideNavTopic}
                            selected={currentSelection}
                            onChange={({ val, userAction }) =>
                                dispatch(
                                    updateSideNavSelected({
                                        value: val,
                                        userAction,
                                        log: "ActiveElements",
                                    })
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
