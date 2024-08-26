import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useErrorBoundary } from "react-error-boundary";
// import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
// import FormDrawer from "./FormDrawer@2.0/FormDrawer";
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
    selectFormIsFinish,
    updateFormState,
    handleDrawer,
    validateForm,
    hydrateSideNavDropdowns,
} from "@/src/application/redux/slices/formSlice";
import dataStructureForms from "@/src/application/settings/dataStructureForms";
import { fetchDataForSideNav } from "@/src/domains/_app/actions/formFetchers";
import submitForm from "@/src/domains/_app/components/Form/actions/submitForm";
import allNationalities from "@/src/application/settings/allNationalities";
import { getError } from "@/src/application/utils/error";
// import FormHeader from "./FormHeader@2.0/FormHeader";
import {
    activateLoadingItem,
    clearItem,
} from "@/src/application/redux/slices/itemSlice";
import { Form } from "zephyrus-components";
// import {
//     createObjectURL,
//     revokeObjectURL,
// } from "../../../actions/useLocalImages";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

// TODO 🧠🔴 Questo file potrebbe diventare AppForm.js (Wrapper per Form per contenere tutte le fn senza ripeterle - vedere prima se é necessario peró)

export default function FormWrap({
    formLabel,
    propsData,
    setOpenForm,
    // handleEditsInParent,
    // parentIsWaiting,
}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const appSettings = useSelector(selectAppSettings);
    const { showBoundary } = useErrorBoundary(); // not found ?!?! // solved ?

    // We get the settings trough the component + props
    // The rest will be setup and stored in store // also we cannot store formComponent in store
    // 🧠 I need to test this by switching form tabs and loading new form when one is alredy open

    const formSettings = useSelector(selectFormStoreSettings, shallowEqual);
    const uiState = useSelector(selectFormStoreUI, shallowEqual);
    const hints = useSelector(selectFormStoreHints, shallowEqual);
    const formState = useSelector(selectFormState, shallowEqual);
    // const newImage = useSelector(selectFormStoreNewImage, shallowEqual);
    const formErrors = useSelector(selectFormStoreErrors, shallowEqual);
    const isLoading = useSelector(selectFormIsLoading, shallowEqual);
    const isFinish = useSelector(selectFormIsFinish, shallowEqual);
    const sideNavData = useSelector(selectFormSideNavData, shallowEqual);
    const storedFormLabel = useSelector(selectFormStoreLabel, shallowEqual);
    const { sideNavTopic, hintsIsOpen } = uiState;

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
        console.log("uiState: ", uiState);
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
                        dispatch(initSideNavData({ data, parsedData }));
                        if (uiState.sideNavTopic === "tags") {
                            dispatch(hydrateSideNavDropdowns());
                        }
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
    const onSubmit = async ({
        e,
        formState,
        newImage,
        formSettings,
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
                formSettings,
                propsData,
            })
                .then(({ data }) => {
                    /*
                    if ((propsData || parentIsWaiting) && handleEditsInParent) {
                        handleEditsInParent(data); // we are not using these arguments anymore
                    }
                    */

                    dispatch(handlePostSuccess({ res: data?.data }));
                    setOpenForm && setOpenForm(false); // forse non necessario ? // trasformare in action? not sure

                    // Clear previous Item before routing
                    dispatch(clearItem());
                    dispatch(activateLoadingItem());

                    formLabel !== "record" &&
                        formLabel !== "records" &&
                        router.push(`/el/${formLabel}/${data.data.id}`);
                })
                .catch((error) => {
                    showBoundary({
                        code: error.response?.status,
                        message: getError(error),
                    });
                });
        }
    };

    /* NEW AFTER REFACTOR 👇 */
    let formTitle = "";
    if (propsData) {
        formTitle = `Edit: ${propsData.name || propsData.title}`;
    } else {
        formTitle = `Create ${
            formLabel.charAt(0).toUpperCase() + formLabel.slice(1)
        }`;
    }

    // TODO: we can use only updateFormState? 🧠🧠🧠 and bring back the pic logic inside the custom component
    // const [newImage, setNewImage] = useState();
    // const handleAddImage = (e) => {
    //     const imgFile = e.target.files["0"];
    //     const file = {
    //         location: createObjectURL(imgFile),
    //         key: imgFile.name,
    //         file: imgFile,
    //     };
    //     setNewImage(file);
    //     dispatch(updateFormState({ val: file.location, topic: "pic" }));
    // };
    // const handleRemoveImage = (imgFile) => {
    //     if (imgFile) {
    //         revokeObjectURL(imgFile);
    //         setNewImage();
    //     }
    //     if (formState.pic) {
    //         dispatch(updateFormState({ val: "", topic: "pic" }));
    //     }
    // };

    const onFormChange = ({ val, topic }) => {
        console.log("onFormChange fired 🔥🧑‍🏭🔥: ", { val, topic });
        dispatch(
            updateFormState({
                val,
                topic,
            })
        );
    };

    // // FIX: not finished 🔴👇
    // const onUrlDelete = ({ val, topic }) => {
    //     dispatch(
    //         updateFormState({
    //             val,
    //             topic,
    //         })
    //     );
    // };

    const onFormValidate = ({ name, value, id }) => {
        dispatch(
            validateForm({
                name,
                value,
                id,
            })
        );
    };

    const toggleDrawer = (val) => {
        // console.log("🔥 toggleDrawer: ", val);
        dispatch(handleDrawer(val ? val : false));
    };

    // console.log("FormWrap: ", {
    //     formState,
    //     uiState,
    // });

    return (
        <Form
            formSettings={formSettings}
            formState={{
                ...formState,
                pic:
                    formState?.pic && formState.pic !== "/no-image.png"
                        ? formState.pic
                        : null,
            }}
            formTitle={formTitle}
            formLabel={formLabel}
            formErrors={formErrors}
            FormComponent={FormComponent}
            FormDrawerContent={FormDrawerContent}
            propsData={propsData}
            isLoading={isLoading}
            isFinish={isFinish}
            drawerIsOpen={uiState.drawerIsOpen}
            onFormChange={onFormChange}
            onFormValidate={onFormValidate}
            onSubmit={onSubmit}
            handleDrawer={toggleDrawer}
            sideNavTopic={sideNavTopic}
            hintsIsOpen={hintsIsOpen}
            customStyles={customStyles}
        />
    );

    // return (
    //     <div className={styles.formWrapContainer}>
    //         <div className={styles.formWrap}>
    //             {/* 🧠 Header potrebbe essere uno :slot stile svelte - vedere se é possibile in next 🧠 */}
    //             <FormHeader formTitle={formTitle} />

    //             <div className={styles.formBox}>
    //                 {!isLoading &&
    //                 !isFinish &&
    //                 FormComponent &&
    //                 formLabel === formSettings.key ? (
    //                     <FormComponent onSubmit={onSubmit} />
    //                 ) : (
    //                     // 🧠 Fare loader migliore
    //                     <p>Loading form...</p>
    //                 )}
    //             </div>
    //         </div>

    //         <FormDrawer
    //             isOpen={drawerIsOpen}
    //             closeDrawer={() => handleDrawer(false)}
    //         >
    //             <FormDrawerContent />
    //         </FormDrawer>
    //     </div>
    // );
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
        8.1 🟢 Cleanup comments and console.logs

        BONUS: 🧠
        6.2 Extract action and selector from input components - pass them as props (forse fare quando creo library - annotare in ticket peró)
        9. On every SideNav fetch: store fetched data in another store by key
        9.1 Implement refresh data button inside SideNav
        9.2 Use this data in all API calls (only when it's safe to do so)
        9.2.1 When it's not safe store data
        9.3 For sure we gonna need some new conditions around the app to check if we already have stored fetched data
    */
