// DELETE THIS FILE (OR THE OTHER) WHEN DONE TESTING STUFF 🧠
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useErrorBoundary } from "react-error-boundary";
import Cookies from "js-cookie";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import {
    createObjectURL,
    revokeObjectURL,
} from "@/src/domains/_app/actions/useLocalImages";
import {
    decimalValidation,
    textValidation,
    nicknameValidation,
} from "@/src/application/utils/validateForms.js";
import FormDrawer from "./FormDrawer/FormDrawer";
import FormDrawerContent from "./FormDrawer/FormDrawerContent";
import { selectAppSettings } from "@/src/application/redux/slices/appSettingsSlice";
import {
    loadNewActiveForm,
    selectFormComponent,
    selectFormState,
    selectFormStoreErrors,
    selectFormStoreHints,
    selectFormStoreNewImage,
    selectFormStoreSettings,
    selectFormStoreUI,
    selectFormSideNavTopic,
    updateSideNavData,
    addNewImage,
    removeImage,
    validateForm,
    startLoading,
    handlePostSuccess,
    closeSideNav,
    openHintsNav,
    selectFormIsLoading,
    selectFormStore,
} from "@/src/application/redux/slices/formSlice";
import dataStructureForms from "@/src/application/settings/dataStructureForms";

export default function Form({
    formLabel,
    propsData,
    setOpenForm,
    handleEditsInParent,
    parentIsWaiting,
}) {
    ////////////////////////////////
    ////////// TESTING /////////////
    ////////////////////////////////
    const dispatch = useDispatch();
    const router = useRouter();
    const appSettings = useSelector(selectAppSettings);
    const { showBoundary } = useErrorBoundary(); // not found ?!?! // solved ?

    // We get the settings trough the component + props
    // The rest will be setup and stored in store // also we cannot store formComponent in store
    // 🧠 I need to test this by switching form tabs and loading new form when one is alredy open

    // let formStore = useSelector(selectFormStore, shallowEqual);
    let form = useSelector(selectFormStoreSettings, shallowEqual);
    let uiState = useSelector(selectFormStoreUI, shallowEqual);
    let hints = useSelector(selectFormStoreHints, shallowEqual);
    let formState = useSelector(selectFormState, shallowEqual);
    let newImage = useSelector(selectFormStoreNewImage, shallowEqual);
    let formErrors = useSelector(selectFormStoreErrors, shallowEqual);
    let isLoading = useSelector(selectFormIsLoading, shallowEqual);
    // let FormComponent = useSelector(selectFormComponent, shallowEqual); // 🧠 components non salvabili in redux
    // const FormComponent = dataStructureForms[formLabel].formComponent; // non ho trovato altra soluzione che rimuovere FormComponent da formSlice
    // const [FormComponent, SetFormComponent] = useState();

    const formObj = dataStructureForms[formLabel];
    const FormComponent = dataStructureForms[formLabel]?.formComponent;

    useEffect(() => {
        if (formLabel && formObj) {
            // console.log("dipatchNewForm: ", { formLabel, formObj, propsData });
            let { formComponent, ...rest } = formObj;
            let payload = {
                formLabel,
                form: rest,
                propsData,
            };
            dispatch(loadNewActiveForm(payload));
        }
    }, [formLabel, formObj, propsData, dispatch]);

    /*
    1. 🟢 setup form store - we want all these states to be stored there
    2. 🟢 Create actions to interact with store
    3a.🟡 Double check store initial values (not breaking app)
    3b.🟡 Also remember cookie for previous formState
    4. 🟡 Move as much code as possible outside the components (action, reducers, utils, ...)
    */

    // FETCH DATA FOR DRAWER
    useEffect(() => {
        if (uiState?.sideNavTopic && uiState.sideNavTopic !== "nationalities") {
            fetchDataForSideNav(
                uiState.sideNavTopic,
                appSettings.TAGS_OBJ
            ).then((res) => {
                dispatch(updateSideNavData(res));
            });
        } else {
            dispatch(
                updateSideNavData({
                    data: undefined,
                    parsedData: undefined,
                })
            );
        } // TODO: error handling? 🧠
    }, [uiState]);

    useEffect(() => {
        if (!hints?.missing?.length && !hints?.removed?.length) {
            // handleDrawer(false);
            closeSideNav();
            // 🧠 I think i can refactor this, we should not closing the tab this way
            // just run setSideNavTopic(false) in the right position of the code 🧠 maybe ?
        } else {
            openHintsNav();
        }
    }, [hints]);

    /* NO NEEDED
    const addLocalImages = (e) => {
        // version for hosted App
        const file = {
            location: createObjectURL([...e.target.files][0]),
            key: [...e.target.files][0].name,
            file: [...e.target.files][0],
        }; // use the spread syntax to get it as an array
        dispatch(addNewImage(file));
    };

    const deleteImage = (img) => {
        // version for hosted App 
        revokeObjectURL(img.file);
        dispatch(removeImage(file));
    };


    const validateData = async (e) => {
        const { id, name, value } = e.target;
        dispatch(validateForm({ id, name, value }));
    };
    */

    // 🧠 There must be a way to transform this into a store action
    const confirmChanges = async ({
        e,
        formState,
        newImage,
        form,
        propsData,
        formLabel,
        setOpenForm,
    }) => {
        e.preventDefault();
        // 🧠 Handle API errors properly!
        // API Errors to handle: image upload (TODO) + item edit (TODO) + form validation (DONE)

        if (Object.keys(formErrors).length === 0) {
            dispatch(startLoading());
            // dispatch(postForm({ formState, newImage, form, propsData }));

            submitForm({
                formState,
                newImage,
                form,
                propsData,
            })
                .then(({ data }) => {
                    if ((propsData || parentIsWaiting) && handleEditsInParent) {
                        handleEditsInParent(data);
                    }

                    dispatch(handlePostSuccess());
                    setOpenForm && setOpenForm(false); // forse non necessario ?

                    formLabel !== "record" &&
                        formLabel !== "records" &&
                        router.push(`/el/${formLabel}/${data.id}`);
                })
                .catch((error) => {
                    showBoundary({
                        code: error.response.status,
                        message: getError(error),
                    });
                });
        }
    };

    console.log("RENDERING FORM COMPONENT: ", {
        isLoading,
        // isLoading: formStore.isLoading,
        FormComponent,
    });

    ////////////////////////////////
    ////////////////////////////////
    ////////////////////////////////
    return (
        <div className={styles.formWrapContainer}>
            <div className={styles.formWrap}>
                {/* 🧠 Header dovrebbe essere uno :slot stile svelte 🧠 */}
                <div>
                    <h2>{formLabel}</h2>
                </div>

                {!isLoading && FormComponent ? (
                    <FormComponent confirmChanges={confirmChanges} />
                ) : (
                    // 🧠 Fare loader migliore
                    <p>Loading form...</p>
                )}
            </div>
        </div>
    );
    /* TODO!!!
    return (
        <div className={styles.formWrapContainer}>
            <div className={styles.formWrap}>
                <div>
                    <h2>{formLabel}</h2>
                </div>

                {FormComponent && formLabel === form.key ? (
                    <FormComponent
                        propsData={propsData}
                        formState={formState}
                        newImage={newImage}
                        errors={errors}
                        isLoading={isLoading}
                        updateFormState={updateFormState}
                        confirmChanges={confirmChanges}
                        validateData={validateData}
                        closeSideNav={closeSideNav}
                        openSideNav={openSideNav}
                        addLocalImages={addLocalImages}
                        deleteImage={deleteImage}
                        setOpenForm={setOpenForm}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            <FormDrawer
                isOpen={drawerIsOpen}
                closeDrawer={() => handleDrawer(false)}
            >
                <FormDrawerContent
                    drawerIsOpen={drawerIsOpen}
                    sideNavIsOpen={sideNavTopic}
                    hintsIsOpen={hintsIsOpen}
                    topic={sideNavTopic}
                    data={sideNavData.data}
                    parsedData={sideNavData.parsedData}
                    propsData={propsData}
                    formState={formState}
                    hints={hints}
                    appSettings={appSettings}
                    updateFormState={updateFormState}
                    handleDrawer={handleDrawer}
                    closeSideNav={closeSideNav}
                    openSideNav={openSideNav}
                    handleHints={handleHints} // DO I NEED THIS? i think is deletable somehow - maybe not 🧠
                    closeHintsNav={closeHintsNav}
                    acceptMissingHints={acceptMissingHints}
                    acceptRemovedHints={acceptRemovedHints}
                />
            </FormDrawer>
        </div>
    );
    */
}
