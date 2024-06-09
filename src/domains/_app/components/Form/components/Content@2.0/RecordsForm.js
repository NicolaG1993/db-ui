import { selectFormIsFinish } from "@/src/application/redux/slices/formSlice";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import { shallowEqual, useSelector } from "react-redux";

export default function RecordsForm({
    formState,
    updateFormState,
    validateData,
    confirmChanges,
    errors,
    isLoading,
    setOpenForm,
}) {
    //================================================================================
    // Render UI
    //================================================================================
    const isFinish = useSelector(selectFormIsFinish, shallowEqual);

    return (
        <form
            onSubmit={(e) =>
                confirmChanges({
                    e,
                    formState,
                    newImage,
                    form,
                    propsData,
                    formLabel,
                    setOpenForm,
                })
            }
            className={styles.form}
        >
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
                    disabled={isLoading || isFinish}
                    className="button-standard"
                >
                    Confirm
                </button>
                {/* <button onClick={distribute()}>Distribute all</button> */}
            </div>
        </form>
    );
}
