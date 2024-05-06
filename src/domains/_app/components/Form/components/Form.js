"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { shallowEqual, useSelector } from "react-redux";
import { useErrorBoundary } from "react-error-boundary";
import Cookies from "js-cookie";
import styles from "@/src/application/styles/AdminDashboard.module.css";
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
import FormSideNav from "@/src/domains/_app/components/Form/components/FormSideNav/FormSideNav.js";
import formHydrate from "@/src/domains/_app/utils/formHydrate";
import { fetchDataForSideNav } from "@/src/domains/_app/actions/formFetchers";
import { selectAppSettings } from "@/src/application/redux/slices/appSettingsSlice";
import submitForm from "@/src/domains/_app/components/Form/actions/submitForm";
import { getError } from "@/src/application/utils/error";
import getSavedState from "@/src/domains/_app/components/Form/utils/getSavedState"; // 🧠 do i really need to call it so many times ? 🧠

export default function Form({
    topicLabel,
    propsData,
    setOpenForm,
    handleEditsInParent,
    parentIsWaiting,
}) {
    // console.log("Form propsData: ", propsData);
    //================================================================================
    // Component State
    //================================================================================
    const router = useRouter();
    const appSettings = useSelector(selectAppSettings);
    const { showBoundary } = useErrorBoundary(); // not found ?!?!

    const [form, setForm] = useState(dataStructureForms[topicLabel]);
    const FormComponent = form.formComponent;
    const [formState, setFormState] = useState(
        getSavedState(topicLabel, form.emptyState)
    );
    const [activeForm, setActiveForm] = useState(topicLabel); // delete?
    const [newImage, setNewImage] = useState();
    const [errors, setErrors] = useState({});
    const [openSection, setOpenSection] = useState(false);
    const [sideNavData, setSideNavData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const emptyHints = { missing: [], removed: [] };
    const [hints, setHints] = useState(emptyHints);

    //================================================================================
    // UseEffects
    //================================================================================

    // SET NEW ACTIVE FORM
    useEffect(() => {
        loadNewActiveForm(topicLabel);
    }, [topicLabel]);

    const loadNewActiveForm = (topicLabel) => {
        setIsLoading(true);
        setActiveForm(topicLabel); // senza questo il form cambia prima che nuovo emptyState venga selezionato
        setForm(dataStructureForms[topicLabel]);
        setFormState(
            getSavedState(topicLabel, dataStructureForms[topicLabel].emptyState)
        ); // 🧠 non posso usare direttamente form.emptyState ? 🧠
        setErrors({});
    };

    // RESET STATE ON FORM CHANGE
    useEffect(() => {
        setFormState(getSavedState(topicLabel, form.emptyState));
        setIsLoading(false);
    }, [form]);

    //PARSE PROPSDATA
    useEffect(() => {
        if (propsData) {
            let newState = formHydrate(formState, form.emptyState, propsData); // hydrate form on modify
            setFormState(newState);
        } else {
            setFormState(getSavedState(topicLabel, form.emptyState)); // set empty form on add new
        }
        // setIsLoading(false);
    }, [propsData]);

    // FETCH DATA FOR SIDENAV
    useEffect(() => {
        if (openSection && openSection !== "nationalities") {
            fetchDataForSideNav(openSection, appSettings.TAGS_OBJ).then((res) =>
                setSideNavData(res)
            );
        } else {
            setSideNavData();
        }
    }, [openSection]);

    useEffect(() => {
        if (!hints?.missing?.length && !hints?.removed?.length) {
            setOpenSection(false);
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

            Cookies.set(
                "formState",
                JSON.stringify({ formLabel: topicLabel, formState })
            );
        }
    };

    const updateFormState = (val, topic) => {
        setFormState((prev) => ({
            ...prev,
            [topic]: val,
        }));

        // console.log("🌶️ formState: ", { formState, topicLabel }); // 🧠 why there is a loose boolean inside formState ??? remove pls
        if (!propsData) {
            Cookies.set(
                "formState",
                JSON.stringify({ formLabel: topicLabel, formState })
            );
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
                    topicLabel !== "record" &&
                        topicLabel !== "records" &&
                        router.push(`/el/${topicLabel}/${data.id}`);
                })
                .catch((error) => {
                    // save form state in cookie or state 🔴
                    // ...
                    showBoundary({
                        code: error.response.status,
                        message: getError(error),
                    });
                });

            setIsLoading(false);
        }
    };

    const handleHintsModal = (arrMissing, arrRemoved) => {
        if (arrMissing?.length || arrRemoved?.length) {
            setHints({ missing: arrMissing, removed: arrRemoved });
        } else {
            setHints(emptyHints);
            setOpenSection(false);
        }
    };

    const acceptMissingHints = (arr) => {
        if (arr && arr.length) {
            setFormState((prev) => ({
                ...prev,
                tags: arr,
            }));
        }
        setHints((prev) => ({ ...prev, missing: [] }));
    };

    const acceptRemovedHints = (arr) => {
        if (arr && arr.length) {
            let newTags = formState.tags.filter((el) => !arr.includes(el));
            setFormState((prev) => ({
                ...prev,
                tags: newTags,
            }));
        }
        setHints((prev) => ({ ...prev, removed: [] }));
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <div className={styles.formWrapContainer}>
            <div className={styles.formWrap}>
                <div>
                    <h2>{topicLabel}</h2>
                </div>

                {FormComponent && topicLabel === form.key ? (
                    <FormComponent
                        formState={formState}
                        propsData={propsData}
                        updateFormState={updateFormState}
                        validateData={validateData}
                        confirmChanges={confirmChanges}
                        newImage={newImage}
                        addLocalImages={addLocalImages}
                        deleteImage={deleteImage}
                        setOpenSection={setOpenSection}
                        errors={errors}
                        isLoading={isLoading}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            {FormComponent && topicLabel === form.key ? (
                <FormSideNav
                    data={sideNavData}
                    formState={formState}
                    originalFormState={propsData || formState}
                    updateFormState={updateFormState}
                    openSection={openSection}
                    setOpenSection={setOpenSection}
                    handleHintsModal={handleHintsModal}
                    hints={hints}
                    acceptMissingHints={acceptMissingHints}
                    acceptRemovedHints={acceptRemovedHints}
                    appSettings={appSettings}
                />
            ) : (
                <></>
            )}
        </div>
    );
}

// 🧠 SPIKE: I should have all these props in a dedicated store 🧠
// formState, propsData, etc...
