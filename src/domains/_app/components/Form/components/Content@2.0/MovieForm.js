import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import { useState } from "react";
import InputTextToArray from "@/src/domains/_app/components/Inputs/InputTextToArray/InputTextToArray";
import {
    selectFormState,
    selectFormStoreErrors,
    selectFormStoreSettings,
    selectFormPropsData,
    validateForm,
    selectFormIsLoadingResponse,
    updateFormState,
    openSideNav,
} from "@/src/application/redux/slices/formSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
    createObjectURL,
    revokeObjectURL,
} from "@/src/domains/_app/actions/useLocalImages";
import InputImage from "@/src/domains/_app/components/Inputs/InputImage/InputImage";
import InputText from "@/src/domains/_app/components/Inputs/InputText/InputText";
import InputFake from "@/src/domains/_app/components/Inputs/InputFake/InputFake";
import InputRating from "@/src/domains/_app/components/Inputs/InputRating/InputRating";
import InputDate from "@/src/domains/_app/components/Inputs/InputDate/InputDate";

export default function MovieForm({ confirmChanges }) {
    const formState = useSelector(selectFormState, shallowEqual);
    const propsData = useSelector(selectFormPropsData, shallowEqual);
    const form = useSelector(selectFormStoreSettings, shallowEqual);
    const errors = useSelector(selectFormStoreErrors, shallowEqual);
    const isLoadingResponse = useSelector(
        selectFormIsLoadingResponse,
        shallowEqual
    );

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
                <div className={styles["form-row"]}>
                    <InputImage
                        file={formState.pic}
                        onAddFile={(e) => handleNewImage(e)}
                        onDeleteFile={() =>
                            handleRemoveImage({
                                imgFile: newImage,
                            })
                        }
                    />
                </div>

                <div className={styles["form-row"]}>
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
                    />
                </div>

                <div className={styles["form-row"]}>
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
                    />
                </div>

                <div className={styles["form-row"]}>
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
                    />
                </div>

                <div className={styles["form-row"]}>
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
                    />
                </div>

                <div className={styles["form-row"]}>
                    <InputFake
                        name={"cast"}
                        id={"Cast"}
                        selected={formState.actors?.length || 0}
                        onClick={() => {
                            dispatch(openSideNav("actors"));
                        }}
                    />
                </div>

                <div className={styles["form-row"]}>
                    <InputFake
                        name={"categories"}
                        id={"Categories"}
                        selected={formState.categories?.length || 0}
                        onClick={() => {
                            dispatch(openSideNav("categories"));
                        }}
                    />
                </div>

                <div className={styles["form-row"]}>
                    <InputFake
                        name={"tags"}
                        id={"Tags"}
                        selected={formState.tags?.length || 0}
                        onClick={() => {
                            dispatch(openSideNav("tags"));
                        }}
                    />
                </div>

                <div className={styles["form-row"]}>
                    <InputFake
                        name={"production"}
                        id={"Production"}
                        selected={formState.studios?.length || 0}
                        onClick={() => {
                            dispatch(openSideNav("studios"));
                        }}
                    />
                </div>

                <div className={styles["form-row"]}>
                    <InputFake
                        name={"distribution"}
                        id={"Distribution"}
                        selected={formState.distributions?.length || 0}
                        onClick={() => {
                            dispatch(openSideNav("distributions"));
                        }}
                    />
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles["buttons-box"]}>
                    <button
                        type="submit"
                        disabled={isLoadingResponse}
                        className="button-standard"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </form>
    );
}
