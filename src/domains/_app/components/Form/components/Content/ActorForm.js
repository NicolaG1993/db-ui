import Image from "next/image";
import styles from "@/src/application/styles/AdminDashboard.module.css";
import InputSocials from "../../../Inputs/InputSocials/InputSocials";

export default function ActorForm({
    formState,
    updateFormState,
    validateData,
    confirmChanges,
    newImage,
    addLocalImages,
    deleteImage,
    setOpenSection,
    errors,
    isLoading,
}) {
    console.log("ActorForm: ", { formState });
    //================================================================================
    // Render UI
    //================================================================================
    return (
        <form onSubmit={(e) => confirmChanges(e)} className={styles.form}>
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
                                onClick={() => deleteImage(newImage)}
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
                                onClick={() => deleteImage("")} // testare 💛
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
                                onChange={(e) => addLocalImages(e)}
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
                        updateFormState(e.target.value, e.target.name)
                    }
                    onBlur={(e) => validateData(e)}
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
                        updateFormState(e.target.value, e.target.name)
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
                        updateFormState(e.target.value, e.target.name)
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
                            setOpenSection("nationalities");
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
                        updateFormState(
                            Number(parseFloat(e.target.value).toFixed(2)),
                            e.target.name
                        )
                    }
                    onBlur={(e) => validateData(e)}
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
                    <span>{formState.tags.length} selected</span>
                    <div
                        onClick={() => {
                            setOpenSection("tags");
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
                    setFormState={updateFormState}
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
