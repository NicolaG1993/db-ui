import styles from "@/src/application/styles/AdminDashboard.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
import uploadImage from "@/src/domains/_app/actions/uploadImage";
import createItem from "@/src/domains/_app/actions/createItem";
import { shallowEqual, useSelector } from "react-redux";
import { selectAppSettings } from "@/src/application/redux/slices/appSettingsSlice";

export default function Form({
    topicLabel,
    propsData,
    setOpenForm,
    handleEditsInParent,
}) {
    //================================================================================
    // Component State
    //================================================================================
    const router = useRouter();
    const appSettings = useSelector(selectAppSettings);

    const [form, setForm] = useState(dataStructureForms[topicLabel]);
    const Component = form.formComponent;
    const [formState, setFormState] = useState(form.emptyState);
    const [activeForm, setActiveForm] = useState(topicLabel);
    const [newImage, setNewImage] = useState();
    const [errors, setErrors] = useState({});
    const [openSection, setOpenSection] = useState(false);
    const [sideNavData, setSideNavData] = useState(undefined);

    const emptyHints = { missing: [], removed: [] };
    const [hints, setHints] = useState(emptyHints);

    //================================================================================
    // UseEffects
    //================================================================================
    // SET NEW ACTIVE FORM
    useEffect(() => {
        setActiveForm(topicLabel); // senza questo il form cambia prima che nuovo emptyState venga selezionato
        setForm(dataStructureForms[topicLabel]);
        setFormState(dataStructureForms[topicLabel].emptyState);
        setErrors({});
    }, [topicLabel]);

    // RESET STATE ON FORM CHANGE
    useEffect(() => {
        setFormState(form.emptyState);
    }, [form]);

    //PARSE PROPSDATA
    useEffect(() => {
        if (propsData) {
            let newState = formHydrate(formState, form.emptyState, propsData); // hydrate form on modify
            setFormState(newState);
        } else {
            setFormState(form.emptyState); // set empty form on add new
        }
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
        }
    };

    const updateFormState = (val, topic) => {
        setFormState((prev) => ({
            ...prev,
            [topic]: val,
        }));
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

        if (formState.birthday === "") {
            formState.birthday = null;
        }

        if (Object.keys(errors).length === 0) {
            //questa parte é cosí perché utilizzo archivio locale su pc per questo progetto
            //qui se no dovrei fare upload img su db e salvare quel link
            if (newImage) {
                // user added a new image
                uploadImage(newImage.file, form.group)
                    .then((imgRes) => {
                        let finalState = {
                            ...formState,
                            pic: imgRes.data[0].Location,
                        };
                        createItem(finalState, form, formState, propsData).then(
                            ({ data }) => {
                                propsData && handleEditsInParent(); // this run only in modify form
                                setOpenForm && setOpenForm(false);
                                router.push(`/el/${topicLabel}/${data.id}`);
                            }
                        );
                    })
                    .catch((err) => console.log("🧡🧡🧡 ERR: ", err));
            } else {
                // user doesnt want to use any image or nothing changed
                createItem(formState, form, formState, propsData)
                    .then(({ data }) => {
                        propsData && handleEditsInParent();
                        setOpenForm && setOpenForm(false);
                        topicLabel !== "record" &&
                            topicLabel !== "records" &&
                            router.push(`/el/${topicLabel}/${data.id}`); // forse fare Form Component separato per "record" page, in caso si volessero fare cose diverse al suo interno
                    })
                    .catch((err) => console.log("ERROR: ", err));
            }
        } else {
            console.log("INVALID INPUTS", errors);
            // Object.values(errors).map((err) =>
            //     enqueueSnackbar(err, {
            //         variant: "error",
            //     })
            // );
            return;
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

                {Component && topicLabel === form.key ? (
                    <Component
                        formState={formState}
                        updateFormState={updateFormState}
                        validateData={validateData}
                        confirmChanges={confirmChanges}
                        newImage={newImage}
                        addLocalImages={addLocalImages}
                        deleteImage={deleteImage}
                        setOpenSection={setOpenSection}
                        errors={errors}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            {Component && topicLabel === form.key ? (
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
