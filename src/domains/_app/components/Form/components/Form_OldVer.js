"use client";

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
import dataStructureForms from "@/src/application/settings/dataStructureForms";
import formHydrate from "@/src/domains/_app/utils/formHydrate";
import { fetchDataForSideNav } from "@/src/domains/_app/actions/formFetchers";
import { selectAppSettings } from "@/src/application/redux/slices/appSettingsSlice";
import submitForm from "@/src/domains/_app/components/Form/actions/submitForm";
import { getError } from "@/src/application/utils/error";
import getSavedState from "@/src/domains/_app/components/Form/utils/getSavedState"; // 🧠 do i really need to call it so many times ? 🧠
import FormDrawer from "./FormDrawer/FormDrawer";
import FormDrawerContent from "./FormDrawer/FormDrawerContent";

export default function Form({
    formLabel,
    propsData,
    setOpenForm,
    handleEditsInParent,
    parentIsWaiting,
}) {
    // console.log("✅ Form propsData: ", {
    //     formLabel,
    //     propsData,
    //     setOpenForm,
    //     handleEditsInParent,
    //     parentIsWaiting,
    // });

    //================================================================================
    // Component State
    //================================================================================
    const router = useRouter();
    const appSettings = useSelector(selectAppSettings);
    const { showBoundary } = useErrorBoundary();

    // SISTEMARE STATES (SONO SICURO QUALCUNO PUO ESSERE SPOSTATO) 🧠
    const [form, setForm] = useState(dataStructureForms[formLabel]);
    const FormComponent = form.formComponent;
    const [formState, setFormState] = useState(
        getSavedState(formLabel, form.emptyState)
    );
    const [newImage, setNewImage] = useState();
    const [errors, setErrors] = useState({});
    const [sideNavData, setSideNavData] = useState({
        data: undefined,
        parsedData: undefined,
    });
    const [isLoading, setIsLoading] = useState(true); // im not using isLoading very well .. 🧠🔴

    const emptyHints = { missing: [], removed: [] };
    const [hints, setHints] = useState(emptyHints);

    // used to determine if the hints modal is open or not
    // we also need to store the value somehow - string
    // const [activeForm, setActiveForm] = useState(formLabel); // delete? 🔴 // the selected form (actor, movie, etc..)
    const [drawerIsOpen, setDrawerIsOpen] = useState(false); // the drawer state: true/false
    const [sideNavTopic, setSideNavTopic] = useState(false); // the selected site nav tab: false/string
    const [hintsIsOpen, setHintsIsOpen] = useState(false); // the hints tab: true/false

    //================================================================================
    // UseEffects
    //================================================================================

    // SET NEW ACTIVE FORM
    useEffect(() => {
        loadNewActiveForm(formLabel);
    }, [formLabel]);

    const loadNewActiveForm = (formLabel) => {
        setIsLoading(true);
        setForm(dataStructureForms[formLabel]);
        setFormState(
            getSavedState(formLabel, dataStructureForms[formLabel].emptyState)
        ); // 🧠 non posso usare direttamente form.emptyState ? 🧠
        setErrors({});
    };

    // RESET STATE ON FORM CHANGE
    useEffect(() => {
        setFormState(getSavedState(formLabel, form.emptyState));
        setIsLoading(false);
        // setActiveForm(formLabel); // senza questo il form cambia prima che nuovo emptyState venga selezionato
    }, [form]);

    //PARSE PROPSDATA
    useEffect(() => {
        if (propsData) {
            let newState = formHydrate(formState, form.emptyState, propsData); // hydrate form on modify
            setFormState(newState);
        } else {
            setFormState(getSavedState(formLabel, form.emptyState)); // set empty form on add new
        }
        // setIsLoading(false);
    }, [propsData]);

    // FETCH DATA FOR DRAWER
    useEffect(() => {
        if (sideNavTopic && sideNavTopic !== "nationalities") {
            fetchDataForSideNav(sideNavTopic, appSettings.TAGS_OBJ).then(
                (res) => {
                    // console.log("RESSSS: ", res);
                    setSideNavData(res);
                }
            );
        } else {
            setSideNavData({
                data: undefined,
                parsedData: undefined,
            });
        }
    }, [sideNavTopic]);

    useEffect(() => {
        // console.log("HINTS CHANGED: ", hints);
        if (!hints?.missing?.length && !hints?.removed?.length) {
            // handleDrawer(false);
            closeSideNav();
            // 🧠 I think i can refactor this, we should not closing the tab this way
            // just run setSideNavTopic(false) in the right position of the code 🧠 maybe ?
        } else {
            openHintsNav();
        }
    }, [hints]);

    //================================================================================
    // Handle Form Data
    //================================================================================
    const addLocalImages = (e) => {
        /* version for hosted App */
        const file = {
            location: createObjectURL([...e.target.files][0]),
            key: [...e.target.files][0].name,
            file: [...e.target.files][0],
        }; // use the spread syntax to get it as an array
        setNewImage(file);
    };

    const deleteImage = (img) => {
        /* version for hosted App */
        revokeObjectURL(img.file);
        setNewImage();
        if (formState.pic) {
            setFormState((prev) => ({
                ...prev,
                pic: "",
            }));

            Cookies.set("formState", JSON.stringify({ formLabel, formState }));
        }
    };

    const updateFormState = (val, topic) => {
        setFormState((prev) => ({
            ...prev,
            [topic]: val,
        }));

        // console.log("🌶️ formState: ", { formState, formLabel }); // 🧠 why there is a loose boolean inside formState ??? remove pls
        if (!propsData) {
            Cookies.set("formState", JSON.stringify({ formLabel, formState }));
        }
    };

    const validateData = async (e) => {
        const { id, name, value } = e.target;
        let newErrObj = { ...errors };

        //validate values
        if (id === "Name") {
            const resp = nicknameValidation(id, value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (id === "Title") {
            const resp = textValidation(value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (id === "Rating") {
            const resp = decimalValidation(id, value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
    }; // forse qualcosa bisogna acora aggiungere da altri forms? 💛

    const confirmChanges = async (e) => {
        e.preventDefault();
        /////////////////////////
        // Handle errors properly!
        // 🔥 image upload (TODO) + item edit (TODO) + form validation (DONE)

        if (Object.keys(errors).length === 0) {
            !isLoading && setIsLoading(true);

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
                    Cookies.remove("formState");
                    setOpenForm && setOpenForm(false);
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

            setIsLoading(false);
        }
    };

    //================================================================================
    // Handle Hints
    //================================================================================
    const handleHints = (arrMissing, arrRemoved) => {
        if (arrMissing?.length || arrRemoved?.length) {
            setHints({ missing: arrMissing, removed: arrRemoved });
        } else {
            setHints(emptyHints);
        }
    };

    const acceptMissingHints = (newArr) => {
        // console.log("💦acceptMissingHints: ", { newArr });
        if (newArr && newArr.length) {
            setFormState((prev) => ({
                ...prev,
                tags: newArr, // 🔴 "tags" should be flexible - not hardcoded
            }));
        }
        setHints((prev) => ({ ...prev, missing: [] }));
    };

    const acceptRemovedHints = (arr) => {
        // 🧠 The non selected shuold stay stored in state!!!
        if (arr && arr.length) {
            let newTags = formState.tags.filter((el) => !arr.includes(el));
            setFormState((prev) => ({
                ...prev,
                tags: newTags, // 🔴 "tags" should be flexible - not hardcoded
            }));
        }
        setHints((prev) => ({ ...prev, removed: [] }));
    };

    //================================================================================
    // Handle Drawer and Tabs
    //================================================================================
    // isnt "closeSideNav" enough ??? 🧠🧠🧠 it already closes the drawer
    // check if its fine for childrens components 🧠🧠🧠
    const handleDrawer = (newVal) => {
        if (typeof newVal == "boolean" || typeof newVal == "string") {
            setSideNavTopic(newVal);
        } else {
            setSideNavTopic((prev) => !prev);
        }
    };

    /*
    const handleDrawerTab = (newVal) => {
        // 🧠🧠🧠 GET ADMITTED FORM LABELS FROM SETTINGS ?
        if (newVal === "nav") {
            if (FormComponent && formLabel === form.key) {
                setSideNavTopic(newVal);
                setDrawerIsOpen(true);
            } else {
                setDrawerIsOpen(false);
            }
        } else if (newVal === "hints") {
            if (hints?.missing?.length || hints?.removed?.length) {
                setSideNavTopic(newVal);
                setDrawerIsOpen(true);
            } else {
                setDrawerIsOpen(false);
            }
        } else {
            setDrawerIsOpen(false);
        }
    };
    */

    // useEffect(() => {
    //     if (!drawerIsOpen)
    // }, [hints, drawerIsOpen]);

    // used to open/close side nav + drawer
    /*
    const closeSideNav = (hints) => {
        if (hints) {
            openHintsNav(hints);
        } else {
            setSideNavTopic(false);
            setDrawerIsOpen(false);
        }
    };
    */
    const closeSideNav = () => {
        setSideNavTopic(false);
        setDrawerIsOpen(false);
    }; // 🔴🔴🔴 BUG: BREAKS WHEN THERE ARE NO HINTS - OR ON REMOVE TAGS?!
    const openSideNav = (val) => {
        setHintsIsOpen(false);
        if (val) {
            setDrawerIsOpen(true);
            setSideNavTopic(val);
        }
    };

    const openHintsNav = () => {
        setDrawerIsOpen(true);
        setHintsIsOpen(true);
    };
    const closeHintsNav = () => {
        setHintsIsOpen(false);
        setDrawerIsOpen(false);
    };

    // TO BE CONTINUED ... 💡

    // 🔴🔴🔴 NEED TO FIX CONDITION FOR RENDERING DRAWER + CONDITIONS FOR TABS 🔴🔴🔴

    // store value for selected "form" ✅ no need, value gets set from parent "formLabel"

    // store value for "drawer" state
    // store value for "side nav" state
    // store value for "hints nav" state

    //================================================================================
    // Render UI
    //================================================================================
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
}

// 🧠 SPIKE: I should have all these props in a dedicated store 🧠
// formState, propsData, etc...
