import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import styles from "@/styles/AdminDashboard.module.css";
import { createObjectURL, revokeObjectURL } from "@/utils/useLocalImages";
import {
    decimalValidation,
    textValidation,
    titleValidation,
    nameValidation,
} from "@/utils/validateForms";
import dataStructureForms from "@/utils/custom/dataStructureForms";
import { fetchDataForFilter } from "@/utils/custom/customFetches";
import {
    parseFormProps,
    parseFormRelationsEdit,
    parseFormRelationsPromise,
} from "@/utils/custom/customParsers";

import FormSideNav from "./FormSideNav";

export default function Form({
    topicLabel,
    propsData,
    setOpenForm,
    handleEditsInParent,
}) {
    //================================================================================
    // Component State
    //================================================================================
    // console.log("propsData: ", propsData);
    const router = useRouter();

    let form = dataStructureForms[topicLabel];
    let Component = form.formComponent;

    const [formState, setFormState] = useState(form.emptyState);
    const [activeForm, setActiveForm] = useState(topicLabel);
    const [newImage, setNewImage] = useState();
    const [errors, setErrors] = useState({});
    const [openSection, setOpenSection] = useState(false);
    const [sideNavData, setSideNavData] = useState(undefined);

    //================================================================================
    // UseEffects
    //================================================================================
    // SET NEW ACTIVE FORM
    useEffect(() => {
        setActiveForm(topicLabel); // senza questo il form cambia prima che nuovo emptyState venga selezionato
        setFormState(form.emptyState);
        setErrors({});
    }, [topicLabel]);

    // RESET STATE ON FORM CHANGE
    useEffect(() => {
        form.emptyState && setFormState(form.emptyState);
    }, [form]);

    //PARSE PROPSDATA
    useEffect(() => {
        if (propsData) {
            let obj = {};
            Object.entries(propsData).map(([key, value], i) => {
                if (value) {
                    let parsedValue = parseFormProps(key, value);
                    obj[key] = parsedValue;
                }
            });
            setFormState({ ...formState, ...obj });
        } else {
            setFormState(form.emptyState);
        }
    }, [propsData]);

    // FETCH AND FILTER DATA FROM DB -> FOR UI SELECTORS
    useEffect(() => {
        if (openSection && openSection !== "nationalities") {
            async function invokeFetch() {
                let res = await fetchDataForFilter("", openSection);
                setSideNavData(res);
            }
            invokeFetch();
        } else {
            setSideNavData();
        }
    }, [openSection]);

    //================================================================================
    // Handle Form Data
    //================================================================================
    const addLocalImages = (e) => {
        /* version for hosted App */
        console.log("e.target.files: ", e.target.files); // use the spread syntax to get it as an array
        const file = {
            location: createObjectURL([...e.target.files][0]),
            key: [...e.target.files][0].name,
            file: [...e.target.files][0],
        };
        setNewImage(file);
    };

    const deleteImage = (img) => {
        /* version for hosted App */
        revokeObjectURL(img.file);
        setNewImage();
        if (formState.pic) {
            setFormState({
                ...formState,
                pic: "",
            });
        }
    };

    const updateFormState = (val, topic) => {
        setFormState({
            ...formState,
            [topic]: val,
        });
    };

    const validateData = async (e) => {
        const { id, name, value } = e.target;
        let newErrObj = { ...errors };

        //validate values
        if (id === "Name") {
            const resp = nameValidation(id, value);
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

    //// 💛💛💛 TESTING BETA
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
                uploadImage(newImage.file)
                    .then((imgRes) => {
                        console.log("💚💚💚 imgRes!", imgRes.data);
                        let finalState = {
                            ...formState,
                            pic: imgRes.data[0].Location,
                        };
                        createItem(finalState).then(({ data }) => {
                            console.log("res!", data);
                            propsData && handleEditsInParent(); // this run only in modify form
                            setOpenForm && setOpenForm(false);
                            router.push(`/el/${topicLabel}/${data.id}`);
                        });
                    })
                    .catch((err) => console.log("🧡🧡🧡 ERR: ", err));
            } else {
                // user doesnt want to use any image or nothing changed
                createItem(formState)
                    .then(({ data }) => {
                        console.log("res!", data);
                        propsData && handleEditsInParent();
                        setOpenForm && setOpenForm(false);
                        topicLabel !== "record" &&
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
    //// 💛💛💛

    //================================================================================
    // API
    //================================================================================
    const uploadImage = (obj) => {
        let formData = new FormData();
        formData.append("image", obj);
        formData.append("folder", form.group);
        return axios.post("/api/pic/single-upload", formData, {
            headers: {
                "content-type": "multipart/form-data",
                // authorization: `Bearer ${userInfo.token}`, // 🧠
            },
        });
    };

    // BETA 💛
    const createItem = async (obj) => {
        let relatedData;
        if (form.relations) {
            relatedData = await parseFormRelationsPromise(
                form.relations,
                formState
            );
        }
        console.log("💛💛💛 obj", obj);
        if (propsData) {
            /* parse relations for db */
            const relationsObj = parseFormRelationsEdit(relatedData, propsData);
            return axios.put(`/api/${topicLabel}/modify`, {
                ...obj,
                ...relationsObj,
            });
        } else {
            /* parse data for db */
            Object.entries(relatedData).map(([key, arr], i) => {
                if (key === "nationalities") {
                    relatedData[key] = formState.nationalities;
                } else {
                    let parsedArr = relatedData[key].map((el) => el.id);
                    relatedData[key] = parsedArr;
                }
            });
            return axios.post(`/api/${topicLabel}/new`, {
                ...obj,
                ...relatedData,
            });
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <div className={styles.formWrapContainer}>
            <div className={styles.formWrap}>
                <div>
                    <h2>{topicLabel}</h2>
                    {/* <span onClick={() => setOpenForm(false)}>X</span> */}
                </div>

                {Component && topicLabel === activeForm ? (
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

            <FormSideNav
                data={sideNavData}
                form={form}
                formState={formState}
                updateFormState={updateFormState}
                openSection={openSection}
                setOpenSection={setOpenSection}
            />
        </div>
    );
}
