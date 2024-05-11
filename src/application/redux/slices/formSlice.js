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
import { searchData } from "@/src/domains/_app/utils/filterData";
import getDropdownsState from "@/src/domains/all/components/Filters/DropdownMenusByLevel/actions/getDropdownsState";
import updatePrevSelected from "@/src/domains/all/components/Filters/DropdownMenusByLevel/actions/updatePrevSelected";

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
    },
    hints: { missing: [], removed: [] },
};

const formSlice = createSlice({
    name: "formStore",
    initialState,
    reducers: {
        loadNewActiveForm: (state, action) => {
            console.log("👾 loadNewActiveForm invoked: ", {
                state: current(state),
                payload: action.payload,
            });
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

            console.log("👾 loadNewActiveForm ended: ", {
                state: current(state),
                payload: action.payload,
            });

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

            console.log("👾 updateFormState invoked: ", {
                state: current(state),
                // currentFormState,
                payload: action.payload,
            });
            /*
            state.formState = action.payload;
            */

            const { val, topic } = action.payload;
            let newFormState;

            newFormState = { ...state.formState, [topic]: val };
            state.formState = newFormState;

            console.log("👾 updateFormState progress: ", {
                state: current(state),
                newFormState,
                propsData: state.propsData,
            });

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
        closeDrawer: (state) => {
            state.ui = initialState.ui;
        },
        concludeDrawer: (state) => {
            console.log("concludeDrawer: ", current(state));
            // assign sidenav.selected to formState[key]
            // ...
        },

        closeSideNav: (state) => {
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
            state.ui.sideNavTopic = initialState.ui.sideNavTopic;
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
                ...action.payload.data,
            };

            const currentState = { ...state };
            const key = currentState.ui.sideNavTopic;

            newState.selected = currentState.formState[key]; // UNDEFINED !

            console.log("initSideNavData: ", { currentState, key, newState });

            state.sideNavData = newState;
        },
        updateSideNavSelected: (state, action) => {
            const { value, userAction } = action.payload;
            console.log("updateSideNavSelected 0: ", {
                currentState: current(state),
                value,
                userAction,
            });

            ////

            const currentState = { ...state };
            const key = currentState.ui.sideNavTopic;

            // only for logging and testing 👇
            const currentFormStateSpread = { ...currentState.formState };
            const extractedFormState = [...currentFormStateSpread[key]];
            console.log("updateSideNavSelected 1: ", {
                currentState,
                key,
                value,
                userAction,
                currentFormStateLog: current(currentState.formState),
                currentFormState: currentState.formState,
                currentFormStateSpread,
                extractedFormState,
                // currentSelection: [...currentState.formState[key]],
                //"state.formState": current(state.formState),
                //"state.formState[key]": state.formState[key],
                // prevSelected: [...state.formState[key]],
                // currentFormState: [...state.formState[key].selected],
            });

            // FINISH 👇🔴🔴🔴 BROKEN -- seams ok now 🟢 but check
            let currentSelection = [...currentState.formState[key]];
            // const prevSelected = currentSelection;

            console.log("updateSideNavSelected 2: ", {
                prevSelected: currentSelection,
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
                selected: state.sideNavData.selected,
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

            console.log("updateSideNavSelected 3: ", {
                array,
            });

            state.sideNavData.selected = array;
        },
        updateSideNavData: (state, action) => {
            // non in uso?
            console.log("🔥 updateSideNavData: ", { paylod: action.payload });
            state.sideNavData = action.payload;
        },
        resetSideNavData: (state, action) => {
            state.sideNavData = initialState.sideNavData;
        },
        handleSideNavError: (state, action) => {
            state.sideNavData.error = action.payload.error;
        },
        // handleSideNavRenderReady: (state) => {
        //     state.sideNavData.renderReady = !state.sideNavData.renderReady;
        // },
        hydrateSideNavDropdowns: (state) => {
            let { res, error } = getDropdownsState({
                stateObj: {},
                propsObj: state.sideNavData.filteredData,
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

        updateHints: (state, action) => {
            const { hints } = action.payload;
            state.hints = hints;
            // if (hints.missing.length || hints.removed.length) {
            //     state.ui.hintsIsOpen = true;
            //     state.ui.drawerIsOpen = true;
            // }
        },
        acceptMissingHints: (state, action) => {
            const arr = action.payload;
            console.log("🔴 arr: ", arr);
            if (arr && arr.length) {
                state.formState.tags = arr; // 🔴 "tags" here should be flexible - not hardcoded
            }
            state.hints.missing = [];
        },
        acceptRemovedHints: (state, action) => {
            // 🧠 The non selected could stay stored in state (but for now i have no plans to use them)
            // 🔴 "tags" here should be flexible - not hardcoded
            const arr = action.payload;
            if (arr && arr.length) {
                let newTags = state.formState.tags.filter(
                    (el) => !arr.includes(el)
                );
                state.formState.tags = newTags;
            }
            state.hints.removed = [];
        },

        addNewImage: (state, action) => {
            // version for hosted App // old comment, delete?
            const { imgFile } = action.payload;
            const file = {
                location: createObjectURL(imgFile),
                key: imgFile.name,
                file: imgFile,
            };
            state.newImage = file;
        },
        removeImage: (state, action) => {
            // version for hosted App // old comment, delete?
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
            const str = action.payload;
            const sourceData = state.sideNavData.parsedData
                ? state.sideNavData.parsedData
                : state.sideNavData.data;

            if (str) {
                let arr = searchData(sourceData, str);
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
    closeSideNav,
    openSideNav,
    openHintsNav,
    closeHintsNav,
    initSideNavData,
    updateSideNavData,
    resetSideNavData,
    handleSideNavError,
    hydrateSideNavDropdowns,
    updateSideNavSelected,
    updateSideNavDropdownsState,
    updateHints,
    acceptMissingHints,
    acceptRemovedHints,
    addNewImage,
    removeImage,
    validateForm,
    handlePostSuccess,
    resetFormStore,
    searchNavData,
} = formSlice.actions;

// eliminare quelle che non useró 🧠
export const selectFormStore = (state) => state.formStore;
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

export default formSlice;
// we want to eventually store the data we fetch while the form is open
// we dont want to fetch it every time
// there will be a button to refresh the list, if the user want

// list not fetched are not going to be stored untill fetched
// the empty state keys will be generated from the settings file
