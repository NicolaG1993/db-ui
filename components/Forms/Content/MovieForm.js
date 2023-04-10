import Image from "next/image";
import styles from "@/styles/AdminDashboard.module.css";
import { useEffect, useState } from "react";
import InputToArray from "@/components/Filters/InputToArray/InputToArray";

export default function MovieForm({
    formState,
    updateFormState,
    validateData,
    confirmChanges,
    newImage,
    addLocalImages,
    deleteImage,
    setOpenSection,
    errors,
    topicLabel,
}) {
    // console.log("FORMSTATE: ", formState);
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
                    <h4>Title</h4>
                </label>
            </div>

            <div className={styles["form-col-right"]}>
                <input
                    type="text"
                    name="title"
                    id="Title"
                    maxLength="50"
                    onChange={(e) => updateFormState(e.target.value, "title")}
                    onBlur={(e) => validateData(e)}
                    value={formState.title}
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
                    setFormState={updateFormState}
                />
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Cast</h4>
                </label>
            </div>
            <div className={styles["form-col-right"]}>
                <div className={styles["form-selector-interaction-box"]}>
                    <span>{formState.actors.length} selected</span>
                    <div
                        onClick={() => {
                            setOpenSection("actors");
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
                    <span>{formState.studios.length} selected</span>
                    <div
                        onClick={() => {
                            setOpenSection("studios");
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
                    <span>{formState.distributions.length} selected</span>
                    <div
                        onClick={() => {
                            setOpenSection("distributions");
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
                            "rating"
                        )
                    }
                    onBlur={(e) => validateData(e)}
                    value={formState.rating}
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
                    <span>{formState.categories.length} selected</span>
                    <div
                        onClick={() => {
                            setOpenSection("categories");
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
                    <h4>Release Date</h4>
                </label>
            </div>
            <div className={styles["form-col-right"]}>
                <input
                    type="date"
                    name="release"
                    id="Release"
                    onChange={(e) => updateFormState(e.target.value, "release")}
                    value={formState.release}
                />
            </div>

            <div
                className={`${styles["form-col-left"]} ${styles["buttons-box"]}`}
            >
                <button type="submit">Confirm</button>
            </div>
        </form>
    );
}
