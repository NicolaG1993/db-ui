import Image from "next/image";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";

export default function CategoryForm({
    formState,
    updateFormState,
    validateData,
    confirmChanges,
    newImage,
    addLocalImages,
    deleteImage,
    closeSideNav,
    openSideNav,
    errors,
    isLoading,
}) {
    console.log({ formState, isLoading });
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
                                onClick={() => deleteImage("")}
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
                    name="name"
                    id="Name"
                    maxLength="50"
                    onChange={(e) => updateFormState(e.target.value, "name")}
                    onBlur={(e) => validateData(e)}
                    value={formState.name}
                />
                {errors.tag && <div className={"form-error"}>{errors.tag}</div>}
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Type</h4>
                </label>
            </div>
            <div className={styles["form-col-right"]}>
                <input
                    type="text"
                    name="type"
                    id="Type"
                    maxLength="50"
                    onChange={(e) => updateFormState(e.target.value, "type")}
                    onBlur={(e) => validateData(e)}
                    value={formState.type}
                />
                {errors.type && (
                    <div className={"form-error"}>{errors.type}</div>
                )}
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
