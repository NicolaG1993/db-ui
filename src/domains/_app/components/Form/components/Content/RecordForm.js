import styles from "@/src/application/styles/AdminDashboard.module.css";

export default function RecordForm({
    formState,
    updateFormState,
    validateData,
    confirmChanges,
    errors,
    isLoading,
}) {
    //================================================================================
    // Render UI
    //================================================================================
    return (
        <form onSubmit={(e) => confirmChanges(e)} className={styles.form}>
            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Date</h4>
                </label>
            </div>
            <div className={styles["form-col-right"]}>
                <input
                    type="date"
                    name="created_at"
                    id="CreatedAt"
                    onChange={(e) => updateFormState(e.target.value, "date")}
                    onBlur={(e) => validateData(e)}
                    value={formState.date}
                />
                {errors.date && (
                    <div className={"form-error"}>{errors.date}</div>
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
