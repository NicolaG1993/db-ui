import Image from "next/image";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import { useState } from "react";
import InputToArray from "@/src/domains/all/components/Filters/InputToArray/InputToArray";
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
            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Pic</h4>
                </label>
            </div>

            <div
                className={`${styles["form-col-right"]} ${styles["admin-new-image"]}`}
            >
                <div>
                    {formState.pic ? (
                        <div className={styles["form-new-image"]}>
                            <Image
                                src={formState.pic}
                                alt={`Picture`}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                            <span
                                className={styles["form-delete-image"]}
                                onClick={() =>
                                    handleRemoveImage({
                                        imgFile: newImage,
                                    })
                                }
                            >
                                X
                            </span>
                        </div>
                    ) : (
                        <div className={styles["form-col-right"]}>
                            <input
                                id="FileID"
                                type="file"
                                name="filename"
                                accept="image/png, image/jpeg, image/webp"
                                onChange={(e) => handleNewImage(e)}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Title</h4>
                </label>
            </div>

            <div className={styles["form-col-right"]}>
                <input
                    type="text"
                    name="title"
                    id="Title"
                    maxLength="244"
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
                    value={formState.title}
                    className={errors.title && "input-error"}
                />
                {errors.title && (
                    <div className={"form-error"}>{errors.title}</div>
                )}
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Links</h4>
                </label>
            </div>
            <div className={styles["form-col-right"]}>
                <InputToArray
                    topic={"urls"}
                    topicID={"Urls"}
                    formState={formState}
                    onChange={(val, topic) =>
                        dispatch(
                            updateFormState({
                                val,
                                topic,
                            })
                        )
                    }
                    // onChange={updateFormState} // in questo caso passiamo fn perché diventerá esternal component - ma dovremmo gestirla prima lo stesso -.-
                />
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Cast</h4>
                </label>
            </div>
            <div className={styles["form-col-right"]}>
                <div className={styles["form-selector-interaction-box"]}>
                    <span>{formState.actors?.length} selected</span>
                    <div
                        onClick={() => {
                            dispatch(openSideNav("actors"));
                        }}
                    >
                        Select
                    </div>
                </div>
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Production</h4>
                </label>
            </div>
            <div className={styles["form-col-right"]}>
                <div className={styles["form-selector-interaction-box"]}>
                    <span>{formState.studios?.length} selected</span>
                    <div
                        onClick={() => {
                            dispatch(openSideNav("studios"));
                        }}
                    >
                        Select
                    </div>
                </div>
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Distribution</h4>
                </label>
            </div>
            <div className={styles["form-col-right"]}>
                <div className={styles["form-selector-interaction-box"]}>
                    <span>{formState.distributions?.length} selected</span>
                    <div
                        onClick={() => {
                            dispatch(openSideNav("distributions"));
                        }}
                    >
                        Select
                    </div>
                </div>
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Rating</h4>
                </label>
            </div>
            <div className={styles["form-col-right"]}>
                <input
                    type="number"
                    name="rating"
                    id="Rating"
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
                />
                {errors.rating && (
                    <div className={"form-error"}>{errors.rating}</div>
                )}
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Categories</h4>
                </label>
            </div>
            <div className={styles["form-col-right"]}>
                <div className={styles["form-selector-interaction-box"]}>
                    <span>{formState.categories?.length} selected</span>
                    <div
                        onClick={() => {
                            dispatch(openSideNav("categories"));
                        }}
                    >
                        Select
                    </div>
                </div>
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Tags</h4>
                </label>
            </div>
            <div className={styles["form-col-right"]}>
                <div className={styles["form-selector-interaction-box"]}>
                    <span>{formState.tags?.length} selected</span>
                    <div
                        onClick={() => {
                            dispatch(openSideNav("tags"));
                        }}
                    >
                        Select
                    </div>
                </div>
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Release Date</h4>
                </label>
            </div>
            <div className={styles["form-col-right"]}>
                <input
                    type="date"
                    name="release"
                    id="Release"
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

            <div
                className={`${styles["form-col-left"]} ${styles["buttons-box"]}`}
            >
                <button
                    type="submit"
                    disabled={isLoadingResponse}
                    className="button-standard"
                >
                    Confirm
                </button>
            </div>
        </form>
    );
}
