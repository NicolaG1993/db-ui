import { createSlice, current } from "@reduxjs/toolkit";
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

// 🧠 SPIKE: I would like to store the different data i retrieve, for the first time
// then the user will see always those until he restarts the app or click on a "refresh list" button
// This will help to decrease the call to the db and avoiding multiple connections as much as possible
// i still dont know where to store this data, probably here somewhere...

// 🧠 SPIKE: invece di usare propsData per determinare se siamo in edit mode o no,
// potremmo semplicemente avere una flag che viene settata, senza dover resettare stati mille volte
// inoltre sarebbe meglio avere due formState separati per edit e create, molto piú sicuro

const initialState = {
    isFormOpen: false,
    formLabel: "",
    singleFormLabel: "", // used to render multiple or single form
    form: undefined, // "form" potrebber essere rinominato "formObj" o "formSettings"
    // FormComponent: undefined, // non posso salvare perche component é non-serializibe data
    formState: undefined,
    propsData: undefined,
    isLoading: true,
    isLoadingResponse: false,
    isFinish: false,
    finalResponse: undefined,
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
        openForm: (state, action) => {
            console.log("openForm: ", action.payload);
            // Here we just open the form UI and set the initial values for it
            state.propsData = action.payload?.propsData || undefined;
            state.singleFormLabel = action.payload?.formLabel || "";
            state.isFormOpen = true;
        },
        closeForm: (state, action) => {
            // state.singleFormLabel = "";
            // state.propsData = undefined; // no needed cuz we should have reset action already
            state.isFormOpen = false;
        },
        loadNewActiveForm: (state, action) => {
            console.log("loadNewActiveForm invoked: ", action.payload);
            const { formLabel, form, propsData } = action.payload;

            state.isLoading = true;
            state.formLabel = formLabel;
            state.form = form;
            // We cannot store form.formComponent and FormComponent here!

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
                state.propsData = undefined;
                formState = getSavedState(formLabel, form.emptyState);
            }

            state.formState = formState;
            state.errors = {};
            state.isLoading = false;
        },
        updateFormState: (state, action) => {
            const { val, topic } = action.payload;
            let newFormState;

            newFormState = { ...state.formState, [topic]: val };
            state.formState = newFormState;

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
        },

        startLoading: (state) => {
            state.isLoading = true;
        },

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
        // -- HO GIÀ SISTEMATO QUESTO? ☝️🧠

        concludeDrawer: (state) => {
            // 🧠 Forse dovrei separare chiusura drawer e update "state.formState[key]"

            const newSelection = [...state.sideNavData.selected];
            const key = state.ui.sideNavTopic;
            state.formState[key] = newSelection;

            if (!state.propsData) {
                Cookies.set(
                    "formState",
                    JSON.stringify({
                        formLabel: state.formLabel,
                        formState: state.formState,
                    })
                );
            }

            state.ui = initialState.ui;
            state.sideNavData = initialState.sideNavData;
        },

        concludeDrawerAfterHints: (state) => {
            const sideNavTopic = state.ui.sideNavTopic;

            state.formState.tags = [...state.hints.finalDecision];

            // make "actors" flexible 🧠
            if (sideNavTopic === "actors") {
                state.formState[sideNavTopic] = state.sideNavData.selected;
            }

            state.hints = initialState.hints;
            state.ui = initialState.ui;
            state.sideNavData = initialState.sideNavData;

            if (!state.propsData) {
                Cookies.set(
                    "formState",
                    JSON.stringify({
                        formLabel: state.formLabel,
                        formState: state.formState,
                    })
                );
            }
        },

        setupHints: (state, action) => {
            const { hints } = action.payload;
            state.hints = { ...state.hints, ...hints };

            const keys = ["tags"]; // 🧠 we should import this and make this flexible (import) // altrimenti si puo fare condition piu semplice
            const key = keys.find((k) => state.ui.sideNavTopic === k);

            state.hints.finalDecision = key
                ? state.sideNavData.selected
                : state.formState.tags;
        },
        acceptMissingHints: (state, action) => {
            const { parsedForm } = action.payload;
            let result = [];

            const keys = ["tags"]; // 🧠 we should import this and make this flexible (import) // altrimenti si puo fare condition piu semplice
            const key = keys.find((k) => state.ui.sideNavTopic === k);

            //  state.hints.missing = []; // 🧠 SPIKE: we should store the not selected

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

                state.hints.finalDecision = newTags;
                state.hints.removedIsFinish = true;
            }
        },

        skipMissingHints: (state) => {
            state.hints.missingIsFinish = true;
        },
        skipRemovedHints: (state) => {
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
        },

        openHintsNav: (state) => {
            state.ui.hintsIsOpen = true;
            state.ui.drawerIsOpen = true;
        },
        closeHintsNav: (state) => {
            state.ui.hintsIsOpen = false;
            state.ui.drawerIsOpen = false;
        },

        initSideNavData: (state, action) => {
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

            state.sideNavData = newState;
        },

        updateSideNavSelected: (state, action) => {
            const { value, userAction } = action.payload;

            const currentState = { ...state };
            const key = currentState.ui.sideNavTopic;

            // we need to look for the current state of sidenav.selected, not formState[key] !!!
            let currentSelection = currentState.sideNavData.selected;

            let array = updatePrevSelected({
                value,
                userAction,
                // BUG: 🔴👇 should both be an array
                // prevSelected: state.formState[key], // OG selected 🔴🔴🔴🔴
                // selected: state.sideNavData.selected, // current selected 🔴🔴🔴🔴
                // -- MAYBE ALREADY FIXED? ☝️🧠
                prevSelected: currentSelection,
                selected: state.sideNavData.selected, // non é current selection la stessa cosa?! 🧠
                topic: state.ui.sideNavTopic,
            });

            state.sideNavData.selected = array;
        },

        resetSideNavData: (state) => {
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

        hydrateSideNavDropdowns: (state) => {
            // 🧨🧨🧨 AFTER REFACTOR: Dobbiamo essere sicuri di passare filteredData peró parsed! -> propsObj
            // non sono sicuro che lo stiamo facendo ora, forse passiamo data parsed, non filterdData
            // -- MAYBE ALREADY FIXED? ☝️🧠
            let { res, error } = getDropdownsState({
                stateObj: {}, // i dont need to pass this if i use it only here
                propsObj: state.sideNavData.parsedData,
                dropdownsState: state.sideNavData.dropdownsState,
            });
            if (error) {
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

            if (str) {
                if (str !== state.sideNavData.filters.search) {
                    state.sideNavData.filters.search = str;
                    // search from data (not parsed)
                    let result = searchData(state.sideNavData.data, str);

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

                    state.sideNavData.filteredData = result;
                }

                // 🧠🧠🧠 TODO: for Levels, we should update the menustructure after filtering
                // if a level has no result in its childs, we should close it and not render it
            } else {
                state.sideNavData.filters.search = "";
                state.sideNavData.filteredData = state.sideNavData.parsedData
                    ? state.sideNavData.parsedData
                    : state.sideNavData.data;
            }

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

        handlePostSuccess: (state, action) => {
            const res = action.payload?.res;
            Cookies.remove("formState");
            state.isFinish = true;
            state.isLoading = false;
            state.finalResponse = res;
        },
        resetFormStore: () => initialState,
    },
});

// cercare ed eliminare quelle che non uso 🧠
export const {
    openForm,
    closeForm,
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
    hydrateSideNavDropdowns,
    updateSideNavSelected,
    updateSideNavDropdownsState,
    setupHints,
    acceptMissingHints,
    acceptRemovedHints,
    skipMissingHints,
    skipRemovedHints,
    validateForm,
    handlePostSuccess,
    resetFormStore,
    searchNavData,
    searchNavDataOnLevel,
} = formSlice.actions;

// eliminare quelle che non uso 🧠
export const selectFormStore = (state) => state.formStore;
export const selectFormStoreLabel = (state) => state.formStore.formLabel;
export const selectFormStoreSettings = (state) => state.formStore.form;
export const selectFormPropsData = (state) => state.formStore.propsData;
export const selectFormStoreNewImage = (state) => state.formStore.newImage;
export const selectFormStoreErrors = (state) => state.formStore.errors;
export const selectFormIsLoading = (state) => state.formStore.isLoading;
export const selectFormIsLoadingResponse = (state) =>
    state.formStore.isLoadingResponse;
export const selectFormIsFinish = (state) => state.formStore.isFinish;

export const selectFormStoreUI = (state) => state.formStore.ui;
export const selectFormSideNavTopic = (state) =>
    state.formStore.ui.sideNavTopic;

export const selectFormState = (state) => state.formStore.formState;
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

export const selectIsFormOpen = (state) => state.formStore.isFormOpen;
export const selectIsFormSingle = (state) => state.formStore.singleFormLabel;

export const selectFormResponse = (state) => state.formStore.finalResponse;

export default formSlice;
// we want to eventually store the data we fetch while the form is open
// we dont want to fetch it every time
// there will be a button to refresh the list, if the user want

// list not fetched are not going to be stored untill fetched
// the empty state keys will be generated from the settings file
