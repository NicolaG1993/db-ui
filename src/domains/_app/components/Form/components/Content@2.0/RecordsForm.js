import { selectFormIsFinish } from "@/src/application/redux/slices/formSlice";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import { shallowEqual, useSelector } from "react-redux";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

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
                <Button
                    size="medium"
                    type="submit"
                    disabled={isLoading || isFinish} // isLoadingResponse ?
                    label="Confirm"
                    customStyles={customStyles}
                />
                {/* <Button 
                    size="medium"
                    type="button"
                     label="Distribute all"
                     onClick={distribute()}
                     customStyles={customStyles}
                     />
                 */}
            </div>
        </form>
    );
}
