import styles from "@/src/application/styles/AdminDashboard.module.css";
import {
    formatFormInputDate,
    getCurrentTime,
} from "@/src/application/utils/convertTimestamp";

export default function RecordForm({
    formState,
    updateFormState,
    validateData,
    confirmChanges,
    errors,
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
                <button type="submit">Confirm</button>
            </div>
        </form>
    );
}
