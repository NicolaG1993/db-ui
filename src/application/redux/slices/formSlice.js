import { createSlice, current } from "@reduxjs/toolkit";
// import dataStructureForms from "@/src/application/settings/dataStructureForms";
import getSavedState from "@/src/domains/_app/components/Form/utils/getSavedState";
import formHydrate from "@/src/domains/_app/utils/formHydrate";
import Cookies from "js-cookie";
import {
    decimalValidation,
    textValidation,
    nicknameValidation,
} from "@/src/application/utils/validateForms.js";
import {
    searchData,
    searchDataOnLevel,
} from "@/src/domains/_app/utils/filterData";
import getDropdownsState from "@/src/domains/all/components/Filters/DropdownMenusByLevel/actions/getDropdownsState";
import updatePrevSelected from "@/src/domains/all/components/Filters/DropdownMenusByLevel/actions/updatePrevSelected";
import { groupJsonByValue } from "@/src/application/utils/parsers";
import { parseTagsByType } from "@/src/domains/_app/utils/parsers";

// SPIKE: 🧠 I would like to store the different data i retrieve, for the first time
// then the user will see always those until he restarts the app or click on a "refresh list" button
// This will help to decrease the call to the db and avoiding multiple connections as much as possible
// i still dont know where to store this data, probably here somewhere...

const initialState = {
    formLabel: "",
    form: undefined, // "form" potrebber essere rinominato "formObj" o "formSettings"
    // FormComponent: undefined, // non posso salvare perche component é non-serializibe data
    formState: undefined,
    propsData: undefined,
    isLoading: true,
    isLoadingResponse: false,
    ui: {
        drawerIsOpen: false,
        sideNavTopic: false,
        hintsIsOpen: false,
    },
    errors: {},
    newImage: undefined,
    sideNavData: {
        // key: ..., // ui.sideNavTopic ✌️
        data: undefined,
        parsedData: undefined,
        filteredData: undefined,
        filters: { search: "" },
        error: undefined,
        renderReady: false,
        dropdownsState: {},
        selected: [],
        isLoading: false,
    },
    hints: {
        missing: [],
        removed: [],
        finalDecision: [],
        missingIsFinish: false,
        removedIsFinish: false,
    },
};

// i have some "loading" states around that are quite pointless, check them out 🧠
const formSlice = createSlice({
    name: "formStore",
    initialState,
    reducers: {
        loadNewActiveForm: (state, action) => {
            // console.log("👾 loadNewActiveForm invoked: ", {
            //     state: current(state),
            //     payload: action.payload,
            // });
            const { formLabel, form, propsData } = action.payload;
            // const form = dataStructureForms[formLabel]; // questo passaggio viene fatto da component

            state.isLoading = true;
            state.formLabel = formLabel;
            state.form = form;
            // We cannot store form.formComponent and FormComponent here!
            //  state.FormComponent = form.formComponent;

            let formState;
            if (propsData) {
                // hydrate form on "edit" mode;
                state.propsData = propsData;
                formState = formHydrate(
                    form.emptyState,
                    form.emptyState,
                    propsData
                );
            } else {
                // set "cookie-form" or empty form on "create new" mode
                formState = getSavedState(formLabel, form.emptyState);
            }

            state.formState = formState;
            state.errors = {};
            state.isLoading = false;

            // console.log("👾 loadNewActiveForm ended: ", {
            //     state: current(state),
            //     payload: action.payload,
            // });

            // Cookies.set(
            //     "formState",
            //     JSON.stringify({
            //         formLabel: formLabel,
            //         formState: formState,
            //     })
            // ); // usare solo dopo form edit! forse meglio ancora dopo validate
        },
        updateFormState: (state, action) => {
            // const currentState = { ...state };
            // const currentFormState = { ...state.formState };
            // const currentPropsData = { ...state.propsData };

            // console.log("👾 updateFormState invoked: ", {
            //     state: current(state),
            //     // currentFormState,
            //     payload: action.payload,
            // });
            /*
            state.formState = action.payload;
            */

            const { val, topic } = action.payload;
            let newFormState;

            newFormState = { ...state.formState, [topic]: val };
            state.formState = newFormState;

            // console.log("👾 updateFormState progress: ", {
            //     state: current(state),
            //     newFormState,
            //     propsData: state.propsData,
            // });

            if (!state.propsData) {
                //  🧠 forse é meglio ancora dopo validate data success
                //  🧠 veder come fare per special inputs e auto-hints
                Cookies.set(
                    "formState",
                    JSON.stringify({
                        formLabel: state.formLabel,
                        formState: newFormState,
                    })
                );
            }

            /*
            newFormState = { ...state.formState, [topic]: val };
            state.formState = newFormState;
            */
        },

        startLoading: (state) => {
            state.isLoading = true;
        },
        /*
        updateFormSettings: (state, action) => {
            state.formSettings = action.payload.formSettings;
        },
        */

        // can i make a single dynamic function for UI reducers? 🧠
        handleDrawer: (state, action) => {
            // mi serve veramente handleDrawer? non posso fare tutto gia con le altre? 🧠
            const { newVal } = action.payload;
            if (typeof newVal == "boolean" || typeof newVal == "string") {
                state.ui.sideNavTopic = newVal;
            } else {
                state.ui.sideNavTopic = !state.ui.sideNavTopic;
            }
        },

        // 🔴🔴🔴 QUESTA VERSIONE FUNZIONA MA NON DOPO ACEPTING MISSING HINTS
        // 🧠 PROBABILMENTE NEANCHE DOPO ACEPTING REMOVED HINTS
        // il problema é che noi abbiamo gia fatto update corretto di "state.formState[key]"
        // qui andiamo a modificarlo/romperlo inutilmente

        concludeDrawer: (state) => {
            // assign sidenav.selected to formState[key]
            console.log("concludeDrawer START: ", {
                state: current(state),
            });

            // 🧠 Forse dovrei separare chiusura drawer e update "state.formState[key]"

            const newSelection = [...state.sideNavData.selected];
            const key = state.ui.sideNavTopic;
            state.formState[key] = newSelection;

            console.log("concludeDrawer END: ", {
                state: current(state),
                key: state.ui.sideNavTopic,
                newSelection,
                key,
            });

            Cookies.set(
                "formState",
                JSON.stringify({
                    formLabel: state.formLabel,
                    formState: state.formState,
                })
            );

            state.ui = initialState.ui;
            state.sideNavData = initialState.sideNavData;
        },

        // 🔴🔴🔴🔴 ELIMINA TUTTI I TAG INSERITI IN PRECEDENZA 🔴🔴🔴🔴
        concludeDrawerAfterHints: (state, action) => {
            const newSelection = [...state.sideNavData.selected];
            const sideNavTopic = state.ui.sideNavTopic; // "tags" // forse serve per actors? 🧠

            console.log("concludeDrawerAfterHints: ", {
                newSelection,
                sideNavTopic,
            });

            // 🔴🔴🔴🔴 QUESTA È SEMPRE ARRAY VUOTA 🔴🔴🔴🔴
            // 🔴🔴🔴🔴 !!!!CONFLITTO!!! Stiamo dichiarando 2 volte "state.formState.tags" 🔴🔴🔴🔴

            //....

            // if (action.payload === "close nav") {
            //     /* Questa serve per non resettare tags on close nav */
            //     state.formState[sideNavTopic] = newSelection;
            // } else if (action.payload === "save hints") {
            //     /* Questa serve x salvare hints dentro form */
            //     state.formState.tags = [...state.hints.finalDecision];
            // }

            //....

            state.formState.tags = [...state.hints.finalDecision];

            // make "actors" flexible 🧠
            if (sideNavTopic === "actors") {
                // 🟡🟡🟡🟡 TESTARE 🟡🟡🟡🟡
                state.formState[sideNavTopic] = state.sideNavData.selected;
            }

            // state.hints.removed = [];
            // state.hints.finalDecision = [];
            state.hints = initialState.hints;
            state.ui = initialState.ui;
            state.sideNavData = initialState.sideNavData;
            // non credo di doverlo resettare completamente 🧠🧠🧠
            Cookies.set(
                "formState",
                JSON.stringify({
                    formLabel: state.formLabel,
                    formState: state.formState,
                })
            );
        },

        setupHints: (state, action) => {
            const { hints } = action.payload;
            state.hints = { ...state.hints, ...hints };
            // if (hints.missing.length || hints.removed.length) {
            //     state.ui.hintsIsOpen = true;
            //     state.ui.drawerIsOpen = true;
            // }

            console.log("🟡🟡🟡🟡 setupHints: ", {
                finalDecision: current(state.hints.finalDecision),
                selected: current(state.sideNavData.selected),
            });
            // 🟡🟡🟡🟡 TESTARE 🟡🟡🟡🟡
            const keys = ["tags"]; // 🧠 we should import this and make this flexible (import) // altrimenti si puo fare condition piu semplice
            const key = keys.find((k) => state.ui.sideNavTopic === k);

            // state.hints.finalDecision = !!state.hints.finalDecision.length
            //     ? state.hints.finalDecision
            //     : state.sideNavData.selected;

            state.hints.finalDecision = key
                ? state.sideNavData.selected
                : state.formState.tags;

            /*
                finalDecision:
                    con tags:
                        • se esiste giá (non puó giá esistere in setupHints)
                        • usare state.sideNavData.selected
                    con actors:
                        • state.formState.tags                 
                */
        },
        acceptMissingHints: (state, action) => {
            // con tags funziona
            // 🟢 con ex. actor passa actor obj insieme a tags objects

            const { parsedForm } = action.payload;
            let result = [];

            const keys = ["tags"]; // 🧠 we should import this and make this flexible (import) // altrimenti si puo fare condition piu semplice
            const key = keys.find((k) => state.ui.sideNavTopic === k);

            /*
            const source = key
                ? state.sideNavData.selected
                : !!state.hints.finalDecision.length &&
                  state.hints.removedIsFinish
                ? state.hints.finalDecision
                : state.formState.tags;
            result = [...source, ...parsedForm];
            // ! important to use spread here !

            if (result && result.length) {
                state.hints.finalDecision = result;
                state.hints.missingIsFinish = true;
            }

            //  state.hints.missing = []; // 🧠 SPIKE: we should keep the not selected
            */

            if (key) {
                /*
                con tags:
                    • unire state.hints.finalDecision con parsedForm
                */
            } else {
                /*
                con actors:
                    • unire sempre con finalDecision ??? 🧠 
                */
            }

            // 🟡 TESTARE
            state.hints.finalDecision = [
                ...state.hints.finalDecision,
                ...parsedForm,
            ];
            state.hints.missingIsFinish = true;
        },

        // not used for tags sidenav -> only for related (like actors)
        acceptRemovedHints: (state, action) => {
            // 🧠 The non selected could stay stored in state (but for now i have no plans to use them)
            // 🔴 "tags" here should be flexible - not hardcoded
            const arr = action.payload;
            const arrIDs = arr.map(({ id }) => id);
            if (arr && arr.length) {
                const source =
                    !!state.hints.finalDecision.length &&
                    state.hints.missingIsFinish
                        ? state.hints.finalDecision
                        : state.formState.tags;
                let newTags = source.filter(({ id }) => !arrIDs.includes(id)); //

                // state.formState.tags = newTags;
                state.hints.finalDecision = newTags;
                state.hints.removedIsFinish = true;

                console.log("acceptRemovedHints END: ", {
                    arr,
                    newTags,
                    "state.formState.tags": current(state.formState.tags),
                });
            }
            // state.hints.removed = [];
        },

        skipMissingHints: (state) => {
            /**
             dispatch(
            updateHints({
                hints: {
                    missingIsFinish: true,
                    // missing: [], // do we want to store them?
                    // removed: hints.removed,
                },
            })
        );
             */
            state.hints.missingIsFinish = true;
        },
        skipRemovedHints: (state) => {
            /*
            dispatch(
            updateHints({
                hints: {
                    removedIsFinish: true,
                    // missing: hints.missing,
                    // removed: [],
                },
            })
        );
            */
            state.hints.removedIsFinish = true;
        },

        closeSideNav: (state) => {
            // not used anymore ? 🧠
            state.ui.sideNavTopic = false;
        },
        openSideNav: (state, action) => {
            state.ui.hintsIsOpen = false;
            if (action.payload) {
                state.ui.drawerIsOpen = true;
                state.ui.sideNavTopic = action.payload;
            }
            // state.sideNavData.isLoading = true;
        },

        openHintsNav: (state) => {
            // state.ui.sideNavTopic = initialState.ui.sideNavTopic;
            state.ui.hintsIsOpen = true;
            state.ui.drawerIsOpen = true;
        },
        closeHintsNav: (state) => {
            state.ui.hintsIsOpen = false;
            state.ui.drawerIsOpen = false;
        },

        initSideNavData: (state, action) => {
            // We want actors DB data with tags 🟢

            let newState = {
                ...initialState.sideNavData,
                data: action.payload.data,
                parsedData: action.payload.parsedData,
            };

            const key = state.ui.sideNavTopic;

            // 🧠 we probably need this only for edit mode? (check, if not delete - its useless on create mode)
            newState.selected = state.formState[key];

            newState.filteredData = newState.parsedData
                ? newState.parsedData
                : newState.data;

            console.log("initSideNavData: ", {
                currentState: state,
                key,
                newState,
            });

            state.sideNavData = newState;
            // state.sideNavData.isLoading = false;
        },

        updateSideNavSelected: (state, action) => {
            const { value, userAction } = action.payload;
            // console.log("updateSideNavSelected 0: ", {
            //     currentState: current(state),
            //     value,
            //     userAction,
            // });

            ////

            const currentState = { ...state };
            const key = currentState.ui.sideNavTopic;

            // only for logging and testing 👇
            const currentFormStateSpread = { ...currentState.formState };
            // const extractedFormState = [...currentFormStateSpread[key]];
            // console.log("updateSideNavSelected 1: ", {
            //     currentState,
            //     state: current(state),
            //     key,
            //     value,
            //     userAction,
            //     currentFormStateLog: current(currentState.formState),
            //     currentFormState: currentState.formState,
            //     currentFormStateSpread,
            //     extractedFormState,
            //     // currentSelection: [...currentState.formState[key]],
            //     //"state.formState": current(state.formState),
            //     //"state.formState[key]": state.formState[key],
            //     // prevSelected: [...state.formState[key]],
            //     // currentFormState: [...state.formState[key].selected],
            // });

            // FINISH 👇🔴🔴🔴 BROKEN -- seams ok now 🟢 but check
            // we need to look for the current state of sidenav.selected, not formState[key] !!!
            let currentSelection = currentState.sideNavData.selected;
            let currentSelectionSpread = [...currentSelection];
            // let currentSelection = currentState.formState[key];
            // let currentSelectionSpread = [...currentState.formState[key]];
            // let currentSelection = [...currentState.formState[key]];
            // const prevSelected = currentSelection;

            console.log("updateSideNavSelected 2: ", {
                prevSelected: currentSelection,
                prevSelectedSpread: [...currentSelection],
                currentSelectionSpread,
                currentSelection,
                currentSelectionParsed: current(currentState.formState[key]),
            });

            ////
            let array = updatePrevSelected({
                value,
                userAction,
                // BUG: 🔴👇 should both be an array
                // prevSelected: state.formState[key], // OG selected 🔴🔴🔴🔴
                // selected: state.sideNavData.selected, // current selected 🔴🔴🔴🔴
                // dropdownsState: { ...state.sideNavData.dropdownsState },
                prevSelected: currentSelection,
                selected: state.sideNavData.selected, // non é current selection la stessa cosa?! 🧠
                topic: state.ui.sideNavTopic,
            });
            /*
            let array = updatePrevFilters(
                val,
                action,
                props, // prevSelected = formState[topic]
                filters, // selected = state.sideNavData.selected || formState[topic] || []
                dropdownsState
            );
            setFilters(array);
            */

            // console.log("updateSideNavSelected 3: ", {
            //     array,
            // });

            state.sideNavData.selected = array;
        },
        updateSideNavData: (state, action) => {
            // non in uso
            // console.log("🔥 updateSideNavData: ", { paylod: action.payload });
            state.sideNavData = action.payload;
        },
        resetSideNavData: (state, action) => {
            state.sideNavData = initialState.sideNavData;
        },
        handleSideNavError: (state, action) => {
            state.sideNavData.error = action.payload.error;
        },
        handleSideNavRenderReady: (state, action) => {
            const val = action.payload;
            state.sideNavData.renderReady = val
                ? val
                : !state.sideNavData.renderReady;
        },
        // hydrateSideNavSelector: (state) => {
        //     // TODO ....
        //     state.sideNavData.renderReady = true;
        // },
        hydrateSideNavDropdowns: (state) => {
            console.log("🧠 hydrateSideNavDropdowns: ", {
                stateObj: {},
                filteredData: current(state.sideNavData.filteredData),
                dropdownsState: current(state.sideNavData.dropdownsState),
                data: current(state.sideNavData.data),
                parsedData: current(state.sideNavData.parsedData),
            });

            // 🧨🧨🧨 AFTER REFACTOR: Dobbiamo essere sicuri di passare filteredData peró parsed! -> propsObj
            // non sono sicuro che lo stiamo facendo ora, forse passiamo data parsed, non filterdData
            let { res, error } = getDropdownsState({
                stateObj: {}, // i dont need to pass this if i use it only here
                propsObj: state.sideNavData.parsedData,
                dropdownsState: state.sideNavData.dropdownsState,
            });
            if (error) {
                console.log("ERROR - hydrateSideNavDropdowns");
                // 🧠 handle Error correctly - now we are just storing it 🧠
                state.sideNavData.error = error;
            } else if (res) {
                state.sideNavData.dropdownsState = res;
                state.sideNavData.renderReady = true;
            }
        },

        updateSideNavDropdownsState: (state, action) => {
            const { newState } = action.payload;
            state.sideNavData.dropdownsState = newState;
        },

        addNewImage: (state, action) => {
            // version for hosted App // <-- old comment, delete?
            const { imgFile } = action.payload;
            const file = {
                location: createObjectURL(imgFile),
                key: imgFile.name,
                file: imgFile,
            };
            state.newImage = file;
        },
        removeImage: (state, action) => {
            // version for hosted App // <-- old comment, delete?
            if (action.payload?.imgFile) {
                revokeObjectURL(imgFile);
            }

            state.newImage = undefined;
            if (state.formState.pic) {
                state.formState.pic = "";
                Cookies.set(
                    "formState",
                    JSON.stringify({
                        formLabel: state.formLabel,
                        formState: state.formState,
                    })
                );
            }
        },

        // questa é una utils ?
        validateForm: (state, action) => {
            const { id, name, value } = action.payload;
            const { errors } = state;

            let newErrObj = { ...errors };

            //validate values
            if (id === "Name") {
                const resp = nicknameValidation(id, value);
                if (resp) {
                    state.errors = { ...errors, [name]: resp };
                } else {
                    delete newErrObj[name];
                    state.errors = newErrObj;
                }
            }
            if (id === "Title") {
                const resp = textValidation(value);
                if (resp) {
                    state.errors = { ...errors, [name]: resp };
                } else {
                    delete newErrObj[name];
                    state.errors = newErrObj;
                }
            }
            if (id === "Rating") {
                const resp = decimalValidation(id, value);
                if (resp) {
                    state.errors = { ...errors, [name]: resp };
                } else {
                    delete newErrObj[name];
                    state.errors = newErrObj;
                }
            }
            // forse qualcosa bisogna acora aggiungere da altri forms? 💛
        },

        searchNavData: (state, action) => {
            const { str, TAGS_OBJ } = action.payload;

            console.log("👽🔥 searchNavData: ", {
                str,
                TAGS_OBJ,
                searchbar: state.sideNavData.filters.search,
            });

            if (str) {
                if (str !== state.sideNavData.filters.search) {
                    state.sideNavData.filters.search = str;
                    // search from data (not parsed)
                    let result = searchData(state.sideNavData.data, str);
                    console.log("👽🔥 searchNavData MID: ", {
                        searchData: result,
                    });

                    // parse search result (if necessary: ex. tags) // if tags use parseTagsByType(result)
                    if (state.ui.sideNavTopic === "tags") {
                        // we need an util that convert rawData [arr of objects with types] to parsedData {object of objects and arrays}
                        // parseTagsByType converts and {object of arrays} to parsedData
                        // so: or we turn "result" into {object of arrays}
                        // // or we search directly parsedData
                        result = parseTagsByType(
                            groupJsonByValue(result, "type"),
                            TAGS_OBJ
                        ); // obj expected!?

                        // result = searchDataOnLevel(); // PLAN B 🟡
                        /*
                    obj = {
                        roles: [{id, name, type}, ...],
                        age: [{id, name, type}, ...],
                        ...
                    }
                    */
                    } else if (state.ui.sideNavTopic === "nationalities") {
                        // TODO... 🧠
                    }

                    console.log("👽🔥 searchNavData END: ", {
                        filteredData: result,
                    });

                    state.sideNavData.filteredData = result;
                }

                // 🧠🧠🧠 TODO: for Levels, we should update the menustructure after filtering
                // if a level has no result in its childs, we should close it and not render it
            } else {
                state.sideNavData.filteredData = state.sideNavData.parsedData
                    ? state.sideNavData.parsedData
                    : state.sideNavData.data;
            }

            //////////
            /*
            // console.log("searchNavData: ", {
            //     sideNavData: current(state.sideNavData),
            //     payload: action.payload,
            // });
            // const sourceData = state.sideNavData.parsedData
            //     ? state.sideNavData.parsedData
            //     : state.sideNavData.data;
            const sourceData = state.sideNavData.data;
            if (str) {
                let arr = searchData(sourceData, str);
                state.sideNavData.filteredData = arr;
                // if tags use parseTagsByType(arr)
                // filteredData has to be already parsed
            } else {
                state.sideNavData.filteredData = sourceData;
            }
 */
            ////////
            // We are displaying data from "menuStructure" in the left side
            // menuStructure: <=  state.formStore.sideNavData.filteredData
            // filteredData has to be an array when searching, so we can render the result only with DropdownMenusList
            // i believe seriously that before we were switching component completely with <InputsSelector on search
        },

        // NOT IN USE
        // BUT THE CODE IS NOT WORTLESS 🧠
        searchNavDataOnLevel: (state, action) => {
            // we need this different search for tags
            // we want to always have an object there as filteredData (no changes to array, etc..)

            // ancora meglio, posso filtrare "state.sideNavData.data"
            // ed usarlo per fare parse -> groupJsonByValue -> parseTagsByType
            // il risultato é il nuovo filteredData

            const { str, TAGS_OBJ } = action.payload;
            const sourceData = state.sideNavData.data;
            // const sourceData = state.sideNavData.parsedData
            //     ? state.sideNavData.parsedData
            //     : state.sideNavData.data;

            if (str) {
                /*
                TODO:
                🟡 vedi parser usato per creare "state.sideNavData.parsedData" - potrebbe essere molto utile qui
                ✖️ finire di scrivere "searchDataOnLevel()"
                ---🧨vedi perché non funziona piú hydrateSideNavDropdowns action 🧨
                🔴 fix autotags bugs
                🔴 vedere se funzionano meglio le condizioni per sidenav via label or filteredData type
                🔴 risolvere: formState non salvato completamente in cookies (es. tags nn funziona)
                */
                let arr = searchDataOnLevel(sourceData, str, TAGS_OBJ);
                state.sideNavData.filteredData = arr;
            } else {
                state.sideNavData.filteredData = sourceData;
            }
        },

        /*
        postForm: (state, action) => {
            const { formState, newImage, form, propsData } = action.payload;
            // ??? sarebbe async
        },
        */
        handlePostSuccess: (state) => {
            Cookies.remove("formState");
            state.isLoading = false;
        },

        resetFormStore: (state) => {
            state = initialState;
        },
    },
});

export const {
    loadNewActiveForm,
    updateFormState,
    startLoading,
    handleDrawer,
    closeDrawer,
    concludeDrawer,
    concludeDrawerAfterHints,
    closeSideNav,
    openSideNav,
    openHintsNav,
    closeHintsNav,
    initSideNavData,
    updateSideNavData,
    resetSideNavData,
    handleSideNavError,
    handleSideNavRenderReady,
    // hydrateSideNavSelector,
    hydrateSideNavDropdowns,
    updateSideNavSelected,
    updateSideNavDropdownsState,
    setupHints,
    acceptMissingHints,
    acceptRemovedHints,
    skipMissingHints,
    skipRemovedHints,
    addNewImage,
    removeImage,
    validateForm,
    handlePostSuccess,
    resetFormStore,
    searchNavData,
    searchNavDataOnLevel,
} = formSlice.actions;

// eliminare quelle che non useró 🧠
export const selectFormStore = (state) => state.formStore;
export const selectFormStoreLabel = (state) => state.formStore.formLabel;
export const selectFormStoreSettings = (state) => state.formStore.form;
// export const selectFormComponent = (state) => state.formStore.FormComponent; // could i return this? -> dataStructureForms[state.formStore.formLabel].formComponent
export const selectFormPropsData = (state) => state.formStore.propsData;
export const selectFormStoreNewImage = (state) => state.formStore.newImage;
export const selectFormStoreErrors = (state) => state.formStore.errors;
export const selectFormIsLoading = (state) => state.formStore.isLoading;
export const selectFormIsLoadingResponse = (state) =>
    state.formStore.isLoadingResponse;

export const selectFormStoreUI = (state) => state.formStore.ui;
export const selectFormSideNavTopic = (state) =>
    state.formStore.ui.sideNavTopic;

export const selectFormState = (state) => state.formStore.formState;
// export const selectFormStateSelected = (state) =>
//     state.formStore.formState.selected || [];

// export const selectFormSideNav = (state) => {
//     state.formStore.sideNavData;
// };
export const selectFormSideNavData = (state) =>
    state.formStore.sideNavData.data;
export const selectFormSideNavSourceData = (state) =>
    state.formStore.sideNavData.parsedData
        ? state.formStore.sideNavData.parsedData
        : state.formStore.sideNavData.data;
export const selectFormSideNavFilteredData = (state) =>
    state.formStore.sideNavData.filteredData;
export const selectFormSideNavFilters = (state) =>
    state.formStore.sideNavData.filters;

// 🧠👇 una volta reso dropdownmenus funzionante, riportare il piu possibile dentro ai suoi components
export const selectFormSideNavError = (state) =>
    state.formStore.sideNavData.error;
export const selectFormSideNavRenderReady = (state) =>
    state.formStore.sideNavData.renderReady;

export const selectFormSideNavSelected = (state) =>
    state.formStore.sideNavData.selected || [];
export const selectFormSideDropdownsState = (state) =>
    state.formStore.sideNavData.dropdownsState;

export const selectFormStoreHints = (state) => state.formStore.hints;
export const selectMissingIsFinish = (state) =>
    state.formStore.hints.missingIsFinish;
export const selectRemovedIsFinish = (state) =>
    state.formStore.hints.removedIsFinish;

export default formSlice;
// we want to eventually store the data we fetch while the form is open
// we dont want to fetch it every time
// there will be a button to refresh the list, if the user want

// list not fetched are not going to be stored untill fetched
// the empty state keys will be generated from the settings file
