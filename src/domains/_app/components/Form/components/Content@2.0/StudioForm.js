import Image from "next/image";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
// import { useEffect, useState } from "react";
import {
    addNewImage,
    selectFormPropsData,
    selectFormState,
    selectFormStoreSettings,
    selectFormStoreNewImage,
    selectFormStoreErrors,
    selectFormIsLoading,
    removeImage,
    validateForm,
    updateFormState,
    openSideNav,
} from "@/src/application/redux/slices/formSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export default function StudioForm({
    confirmChanges,
    /*
    formState,
    newImage,
    errors,
    isLoading,
    validateData,
    addLocalImages,
    deleteImage,
    closeSideNav,
    setOpenForm,
    openSideNav,
    updateFormState,
    */
}) {
    const formState = useSelector(selectFormState, shallowEqual);
    const propsData = useSelector(selectFormPropsData, shallowEqual);
    const form = useSelector(selectFormStoreSettings, shallowEqual);
    const newImage = useSelector(selectFormStoreNewImage, shallowEqual);
    const errors = useSelector(selectFormStoreErrors, shallowEqual);
    const isLoading = useSelector(selectFormIsLoading, shallowEqual);

    const dispatch = useDispatch();
    // console.log("♟️ StudioForm: ", { formState });

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
                    // setOpenForm,
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
                    {newImage ? (
                        <div className={styles["form-new-image"]}>
                            <Image
                                src={newImage.location}
                                alt={`Picture`}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                            <span
                                className={styles["form-delete-image"]}
                                onClick={() =>
                                    dispatch(
                                        removeImage({
                                            imgFile: newImage,
                                        })
                                    )
                                }
                            >
                                X
                            </span>
                        </div>
                    ) : formState.pic ? (
                        <div className={styles["form-new-image"]}>
                            <Image
                                src={formState.pic}
                                alt={`Picture`}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                            <span
                                className={styles["form-delete-image"]}
                                onClick={() => dispatch(removeImage())} // testare 💛
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
                                onChange={(e) =>
                                    dispatch(
                                        addNewImage({
                                            imgFile: [...e.target.files[0]], // use the spread syntax to get it as an array
                                        })
                                    )
                                }
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Name</h4>
                </label>
            </div>

            <div className={styles["form-col-right"]}>
                <input
                    type="text"
                    name="name"
                    id="Name"
                    maxLength="50"
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
                    value={formState.name}
                    className={errors.name && "input-error"}
                />
                {errors.name && (
                    <div className={"form-error"}>{errors.name}</div>
                )}
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Website</h4>
                </label>
            </div>

            <div className={styles["form-col-right"]}>
                <input
                    type="text"
                    name="website"
                    id="Website"
                    maxLength="50"
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
                    value={formState.website}
                />
                {errors.website && (
                    <div className={"form-error"}>{errors.website}</div>
                )}
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Nationality</h4>
                </label>
            </div>

            <div className={styles["form-col-right"]}>
                <div className={styles["form-selector-interaction-box"]}>
                    <span>{formState.nationalities.length} selected</span>
                    <div
                        onClick={() => {
                            dispatch(openSideNav("nationalities"));
                        }}
                    >
                        Select
                    </div>
                </div>
            </div>

            <div
                className={`${styles["form-col-left"]} ${styles["buttons-box"]}`}
            >
                <button
                    type="submit"
                    disabled={isLoading}
                    className="button-standard"
                >
                    Confirm
                </button>
            </div>
        </form>
    );
}
