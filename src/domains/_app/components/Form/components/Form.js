import { useEffect } from "react";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useErrorBoundary } from "react-error-boundary";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import FormDrawer from "./FormDrawer@2.0/FormDrawer";
import FormDrawerContent from "./FormDrawer@2.0/FormDrawerContent";
import { selectAppSettings } from "@/src/application/redux/slices/appSettingsSlice";
import {
    loadNewActiveForm,
    selectFormState,
    selectFormStoreErrors,
    selectFormStoreHints,
    selectFormStoreNewImage,
    selectFormStoreSettings,
    selectFormStoreUI,
    startLoading,
    handlePostSuccess,
    openHintsNav,
    selectFormIsLoading,
    resetSideNavData,
    initSideNavData,
    selectFormSideNavData,
    selectFormStoreLabel,
} from "@/src/application/redux/slices/formSlice";
import dataStructureForms from "@/src/application/settings/dataStructureForms";
import { fetchDataForSideNav } from "@/src/domains/_app/actions/formFetchers";
import submitForm from "@/src/domains/_app/components/Form/actions/submitForm";
import allNationalities from "@/src/application/settings/allNationalities";
import { getError } from "@/src/application/utils/error";

export default function Form({
    formLabel,
    propsData,
    setOpenForm,
    handleEditsInParent,
    parentIsWaiting,
}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const appSettings = useSelector(selectAppSettings);
    const { showBoundary } = useErrorBoundary(); // not found ?!?! // solved ?

    // We get the settings trough the component + props
    // The rest will be setup and stored in store // also we cannot store formComponent in store
    // 🧠 I need to test this by switching form tabs and loading new form when one is alredy open

    const form = useSelector(selectFormStoreSettings, shallowEqual);
    const uiState = useSelector(selectFormStoreUI, shallowEqual);
    const hints = useSelector(selectFormStoreHints, shallowEqual);
    const formState = useSelector(selectFormState, shallowEqual);
    const newImage = useSelector(selectFormStoreNewImage, shallowEqual);
    const formErrors = useSelector(selectFormStoreErrors, shallowEqual);
    const isLoading = useSelector(selectFormIsLoading, shallowEqual);
    const sideNavData = useSelector(selectFormSideNavData, shallowEqual);
    const storedFormLabel = useSelector(selectFormStoreLabel, shallowEqual);

    const formObj = dataStructureForms[formLabel];
    const FormComponent = dataStructureForms[formLabel]?.formComponent;

    useEffect(() => {
        if (formLabel && formLabel !== storedFormLabel) {
            let { formComponent, ...rest } = formObj;
            let payload = {
                formLabel,
                form: rest,
                propsData,
            };
            dispatch(loadNewActiveForm(payload));
        }
    }, [formLabel, storedFormLabel, formObj, propsData, dispatch]);

    // FETCH DATA FOR DRAWER
    useEffect(() => {
        // 🧠🧠🧠 can i move this into drawer? or FormSideNav 🧠🧠🧠
        if (!uiState.hintsIsOpen) {
            if (uiState?.sideNavTopic) {
                if (uiState.sideNavTopic === "nationalities") {
                    dispatch(initSideNavData({ data: allNationalities }));
                    /*
                🧠🧠🧠
                  fare sideNavData setup in store
                  dobbiamo gestire i filtri per forza in store,
                   quindi dobbiamo passargli tutte le nationalities
                🧠🧠🧠
                    */
                } else {
                    fetchDataForSideNav(
                        uiState.sideNavTopic,
                        appSettings.TAGS_OBJ
                    ).then(({ data, parsedData }) => {
                        console.log("fetchDataForSideNav res: ", {
                            data,
                            parsedData,
                        });
                        dispatch(initSideNavData({ data, parsedData }));
                    });
                }
            } else if (sideNavData) {
                dispatch(resetSideNavData());
            } // TODO: error handling? 🧠
        }
    }, [uiState]);

    /* 🧠 MOVE INSIDE DRAWER ? */
    useEffect(() => {
        if (hints?.missing?.length || hints?.removed?.length) {
            openHintsNav();
        }
    }, [hints]);

    // 🧠 There must be a way to transform this into a store action
    const confirmChanges = async ({
        e,
        formState,
        newImage,
        form,
        propsData,
        formLabel,
    }) => {
        e.preventDefault();
        // 🧠 Handle API errors properly!
        // API Errors to handle: image upload (TODO) + item edit (TODO) + form validation (DONE)

        if (Object.keys(formErrors).length === 0) {
            dispatch(startLoading());

            submitForm({
                formState,
                newImage,
                form,
                propsData,
            })
                .then(({ data }) => {
                    console.log("submitForm success: ", {
                        data,
                        formState,
                        newImage,
                        form,
                        propsData,
                    });
                    if ((propsData || parentIsWaiting) && handleEditsInParent) {
                        handleEditsInParent(data);
                    }

                    dispatch(handlePostSuccess());
                    setOpenForm && setOpenForm(false); // forse non necessario ? // trasformare in action? not sure

                    formLabel !== "record" &&
                        formLabel !== "records" &&
                        router.push(`/el/${formLabel}/${data.data.id}`);
                })
                .catch((error) => {
                    console.log(error);
                    showBoundary({
                        code: error.response?.status,
                        message: getError(error),
                    });
                });
        }
    };

    return (
        <div className={styles.formWrapContainer}>
            <div className={styles.formWrap}>
                {/* 🧠 Header dovrebbe essere uno :slot stile svelte 🧠 */}
                <div>
                    <h2>{formLabel}</h2>
                </div>

                <div className={styles.formBox}>
                    {!isLoading && FormComponent && formLabel === form.key ? (
                        <FormComponent confirmChanges={confirmChanges} />
                    ) : (
                        // 🧠 Fare loader migliore
                        <p>Loading form...</p>
                    )}
                </div>
            </div>

            <FormDrawer
                isOpen={uiState.drawerIsOpen}
                closeDrawer={() => handleDrawer(false)}
            >
                <FormDrawerContent />
            </FormDrawer>
        </div>
    );
}

/*
    1. 🟢 setup form store - we want all these states to be stored there
    2. 🟢 Create actions to interact with store
    3a.🟢 Double check store initial values (not breaking app)
    3b.🟢 Also remember cookie for previous formState
    4. 🟢 Move as much code as possible outside the components (action, reducers, utils, ...)
    
    TODO:
        1. 🟢 Fix sidenav data bugs
        2. 🟢 make work correctly DropdownMenusByLevel and move it to redux store
        2.1 🟢 Activate auto-hint for tags
        3. 🟢 make work correctly InputsSelector and move it to redux store
        3.1 🟢 Activate auto-hint for actors
        4. 🟢 make work correctly NationalitiesSelector and move it to redux store
        5. 🟢 Make it work with propsData (edit mode)
        5.1 🟢 tags get deleted in edit mode, after interacting with them and refusing new hints
        6. 🟢 QA Form (Create and Edit)
        6.1 🟢 fix QA bugs
        6.1.1 🟢 SideNav.selected got deleted after doing a research
        7. 🟢 Deploy
        7.1 🟢 PROD Testing
        8. 🟢 Eliminare old Form 1.0 version + components
        8.1 🟡 Cleanup comments and console.logs

        BONUS:
        6.2 Extract action and selector from input components - pass them as props (forse fare quando creo library - annotare in ticket peró)
        9. On every SideNav fetch: store fetched data in another store by key
        9.1 Implement refresh data button inside SideNav
        9.2 Use this data in all API calls (only when it's safe to do so)
        9.2.1 When it's not safe store data
        9.3 For sure we gonna need some new conditions around the app to check if we already have stored fetched data
    */
