import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import { useState } from "react";
import {
    selectFormState,
    selectFormStoreErrors,
    selectFormStoreSettings,
    selectFormPropsData,
    validateForm,
    // selectFormIsLoadingResponse,
    updateFormState,
    openSideNav,
    selectFormIsLoading,
    selectFormIsFinish,
} from "@/src/application/redux/slices/formSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
    createObjectURL,
    revokeObjectURL,
} from "@/src/domains/_app/actions/useLocalImages";
import customStyles from "@/src/domains/_app/components/Inputs/InputsCustomStyles.module.css";
import {
    InputText,
    InputDate,
    InputFake,
    InputImage,
    InputRating,
    InputTextToArray,
} from "zephyrus-components";

export default function MovieForm({ confirmChanges }) {
    const formState = useSelector(selectFormState, shallowEqual);
    const propsData = useSelector(selectFormPropsData, shallowEqual);
    const form = useSelector(selectFormStoreSettings, shallowEqual);
    const errors = useSelector(selectFormStoreErrors, shallowEqual);
    let isLoading = useSelector(selectFormIsLoading, shallowEqual);
    // const isLoadingResponse = useSelector(
    //     selectFormIsLoadingResponse,
    //     shallowEqual
    // );
    const isFinish = useSelector(selectFormIsFinish, shallowEqual);

    const dispatch = useDispatch();

    const [newImage, setNewImage] = useState();

    const handleNewImage = (e) => {
        const imgFile = e.target.files["0"];
        const file = {
            location: createObjectURL(imgFile),
            key: imgFile.name,
            file: imgFile,
        };
        setNewImage(file);
        dispatch(updateFormState({ val: file.location, topic: "pic" }));
    };

    const handleRemoveImage = (imgFile) => {
        if (imgFile) {
            revokeObjectURL(imgFile);
            setNewImage();
        }
        if (formState.pic) {
            dispatch(updateFormState({ val: "", topic: "pic" }));
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <form
            onSubmit={(e) =>
                confirmChanges({
                    e,
                    formState,
                    newImage,
                    form,
                    propsData,
                    formLabel: form.key,
                })
            }
            className={styles.form}
        >
            <div className={styles.body}>
                <div className={styles["form-subheading"]}>
                    <h5>• Info</h5>
                </div>

                <div className={styles["form-row"]}>
                    <InputImage
                        file={formState.pic}
                        onAddFile={(e) => handleNewImage(e)}
                        onDeleteFile={() =>
                            handleRemoveImage({
                                imgFile: newImage,
                            })
                        }
                        height={200}
                        width={250}
                        error={errors.pic}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputText
                        name="title"
                        id="Title"
                        isMandatory={true}
                        value={formState.title}
                        onChange={(e) =>
                            dispatch(
                                updateFormState({
                                    val: e.target.value,
                                    topic: e.target.name,
                                })
                            )
                        }
                        onBlur={(e) =>
                            dispatch(
                                validateForm({
                                    name: e.target.name,
                                    value: e.target.value,
                                    id: e.target.id,
                                })
                            )
                        }
                        placeholder="Type the title here..."
                        error={errors.title}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputTextToArray
                        name={"urls"}
                        id={"Urls"}
                        formState={formState}
                        onChange={(val, topic) =>
                            dispatch(
                                updateFormState({
                                    val,
                                    topic,
                                })
                            )
                        }
                        placeholder="Type URL here...   "
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-half"]}>
                    <InputRating
                        name={"rating"}
                        id={"Rating"}
                        step="0.01"
                        max="5"
                        onChange={(e) =>
                            dispatch(
                                updateFormState({
                                    val: Number(
                                        parseFloat(e.target.value).toFixed(2)
                                    ),
                                    topic: e.target.name,
                                })
                            )
                        }
                        onBlur={(e) =>
                            dispatch(
                                validateForm({
                                    name: e.target.name,
                                    value: e.target.value,
                                    id: e.target.id,
                                })
                            )
                        }
                        value={formState.rating}
                        placeholder="Type your rating (max 5.00)"
                        isMandatory={true}
                        error={errors.rating}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-half"]}>
                    <InputDate
                        name={"release"}
                        id={"Release"}
                        onChange={(e) =>
                            dispatch(
                                updateFormState({
                                    val: e.target.value,
                                    topic: e.target.name,
                                })
                            )
                        }
                        value={formState.release ? formState.release : ""}
                        error={errors.birthday}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-subheading"]}>
                    <h5>• Relations</h5>
                </div>

                <div className={styles["form-row-full"]}>
                    <InputFake
                        name={"actors"}
                        id={"Actors"}
                        selected={formState.actors?.length || 0}
                        onClick={() => {
                            dispatch(openSideNav("actors"));
                        }}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputFake
                        name={"categories"}
                        id={"Categories"}
                        selected={formState.categories?.length || 0}
                        onClick={() => {
                            dispatch(openSideNav("categories"));
                        }}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputFake
                        name={"tags"}
                        id={"Tags"}
                        selected={formState.tags?.length || 0}
                        onClick={() => {
                            dispatch(openSideNav("tags"));
                        }}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputFake
                        name={"production"}
                        id={"Production"}
                        selected={formState.studios?.length || 0}
                        onClick={() => {
                            dispatch(openSideNav("studios"));
                        }}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputFake
                        name={"distribution"}
                        id={"Distribution"}
                        selected={formState.distributions?.length || 0}
                        onClick={() => {
                            dispatch(openSideNav("distributions"));
                        }}
                        customStyles={customStyles}
                    />
                </div>
            </div>

            {/* Si puo fare component di footer, é sempre uguale */}
            <div className={styles.footer}>
                <div className={styles["buttons-box"]}>
                    <button
                        type="submit"
                        disabled={isLoading || isFinish} //  🧠 isLoading o isLoadingResponse meglio?
                        className="button-standard"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </form>
    );
}
