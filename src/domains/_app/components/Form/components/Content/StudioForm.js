import Image from "next/image";
import styles from "@/src/application/styles/AdminDashboard.module.css";
import { useEffect, useState } from "react";

export default function StudioForm({
    formState,
    updateFormState,
    validateData,
    confirmChanges,
    newImage,
    addLocalImages,
    deleteImage,
    setOpenSection,
    errors,
}) {
    console.log("*formState* ", formState);
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
                    onChange={(e) => updateFormState(e.target.value, "name")}
                    onBlur={(e) => validateData(e)}
                    value={formState.name}
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
                    onChange={(e) => updateFormState(e.target.value, "website")}
                    onBlur={(e) => validateData(e)}
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
                            setOpenSection("nationalities");
                        }}
                    >
                        Select
                    </div>
                </div>
            </div>

            <div
                className={`${styles["form-col-left"]} ${styles["buttons-box"]}`}
            >
                <button type="submit" className="button-standard">
                    Confirm
                </button>
            </div>
        </form>
    );
}
