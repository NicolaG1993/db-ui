import Image from "next/image";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import InputSocials from "@/src/domains/_app/components/Inputs/InputSocials/InputSocials";
import {
    selectFormPropsData,
    selectFormState,
    selectFormStoreSettings,
    selectFormStoreErrors,
    selectFormIsLoading,
    validateForm,
    updateFormState,
    openSideNav,
} from "@/src/application/redux/slices/formSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
    createObjectURL,
    revokeObjectURL,
} from "@/src/domains/_app/actions/useLocalImages";
import { useState } from "react";

export default function ActorForm({ confirmChanges }) {
    let formState = useSelector(selectFormState, shallowEqual);
    let propsData = useSelector(selectFormPropsData, shallowEqual);
    let form = useSelector(selectFormStoreSettings, shallowEqual);
    let errors = useSelector(selectFormStoreErrors, shallowEqual);
    let isLoading = useSelector(selectFormIsLoading, shallowEqual);

    const dispatch = useDispatch();

    const [newImage, setNewImage] = useState();

    const handleNewImage = (e) => {
        const imgFile = e.target.files["0"];
        const file = {
            location: createObjectURL(imgFile),
            key: imgFile.name,
            file: imgFile, // non-serializable data 🧠
        };

        /*
        🧠🧠🧠🧠🧠
        Potrei salvare le immagini nel component invece di redux store
        e poi passarle a confirmChanges on submit
        PS. inoltre va bene se non sono salvate in memorized state, no problem
        🧠🧠🧠🧠🧠
        BIG BRAIN

        Dobbiamo vedere in parent come gestire file nuovi o file da props 
        il primo bisogna fare upload
        il secondo bisogna saltarlo
        -- mi sa che il primo é file obj, il secondo é solo str url

        ho aggiornato store, ora salva sempre e solo url di picture, 
        cosí faccio render sempre di questo valore.
        Vedere quando il valore viene usato in Form
        prima poteva esserci un check (da qualche parte, forse) che ora sarebbe inutile, controllare
       
        Ultimo bug:
        • handleRemoveImage -> formState "not working" 🟢
        */

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
                        <div className={styles["user-image-input"]}>
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
