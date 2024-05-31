import Image from "next/image";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import InputSocials from "@/src/domains/_app/components/Inputs/InputSocials/InputSocials";
import {
    addNewImage,
    selectFormIsLoadingResponse,
    selectFormPropsData,
    selectFormState,
    selectFormStoreSettings,
    selectFormStoreUI,
    selectFormStoreHints,
    selectFormStoreNewImage,
    selectFormStoreErrors,
    selectFormIsLoading,
    removeImage,
    validateForm,
    updateFormState,
    openSideNav,
} from "@/src/application/redux/slices/formSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export default function ActorForm({
    confirmChanges,
    // formState,
    // updateFormState,
    // validateData,
    // newImage,
    // addLocalImages,
    // deleteImage,
    // closeSideNav,
    // openSideNav,
    // errors,
    // isLoading,
    // setOpenForm,
}) {
    let formState = useSelector(selectFormState, shallowEqual);
    let propsData = useSelector(selectFormPropsData, shallowEqual);
    let form = useSelector(selectFormStoreSettings, shallowEqual);
    let uiState = useSelector(selectFormStoreUI, shallowEqual);
    let hints = useSelector(selectFormStoreHints, shallowEqual);
    let newImage = useSelector(selectFormStoreNewImage, shallowEqual);
    let errors = useSelector(selectFormStoreErrors, shallowEqual);
    let isLoading = useSelector(selectFormIsLoading, shallowEqual);
    let isLoadingResponse = useSelector(
        selectFormIsLoadingResponse,
        shallowEqual
    );

    const dispatch = useDispatch();
    //================================================================================
    // Render UI
    //================================================================================
    console.log("♟️ ActorForm: ", { formState });

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
                                // src={`/local_pics/actors/${newImage}`}
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
                                log: "name",
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
                />
                {errors.name && (
                    <div className={"form-error"}>{errors.name}</div>
                )}
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Genre</h4>
                </label>
            </div>

            <div className={styles["form-col-right"]}>
                <select
                    name="genre"
                    id="Genre"
                    value={formState.genre}
                    onChange={(e) =>
                        dispatch(
                            updateFormState({
                                val: e.target.value,
                                topic: e.target.name,
                                log: "genre",
                            })
                        )
                    }
                >
                    <option value="female">F</option>
                    <option value="male">M</option>
                    <option value="trans">T</option>
                </select>
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Birthday</h4>
                </label>
            </div>

            <div className={styles["form-col-right"]}>
                <input
                    type="date"
                    name="birthday"
                    id="Birthday"
                    onChange={(e) =>
                        dispatch(
                            updateFormState({
                                val: e.target.value,
                                topic: e.target.name,
                                log: "date",
                            })
                        )
                    }
                    value={formState.birthday}
                />
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
                                log: "number",
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
                    <h4>Socials</h4>
                </label>
            </div>

            <div className={styles["form-col-right"]}>
                <InputSocials
                    formState={formState}
                    setFormState={(val, topic) =>
                        dispatch(
                            updateFormState({
                                val,
                                topic,
                                // dobbiamo ricevere 2 args
                            })
                        )
                    }
                    // setFormState={updateFormState} // in questo caso passiamo fn perché diventerá esternal component - ma dovremmo gestirla prima lo stesso -.-
                />
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
