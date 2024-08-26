// import { selectFormIsFinish } from "@/src/application/redux/slices/formSlice";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
// import { shallowEqual, useSelector } from "react-redux";
import { Button, InputDate } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import { formatFormInputDate } from "@/src/application/utils/convertTimestamp";

export default function RecordsForm({
    formState,
    // formSettings,
    formErrors,
    // propsData,
    isLoading,
    // isLoadingResponse,
    isFinish,
    // handleAddImage,
    // handleRemoveImage,
    // handleDrawer,
    onFormChange,
    // onFormValidate,
    // onSubmit,
}) {
    return (
        <>
            <div className={styles.body}>
                <div className={styles["form-row-full"]}>
                    <InputDate
                        name={"created_at"}
                        id={"CreatedAt"}
                        label={true} // "Date" ?
                        onChange={(e) => onFormChange({ e })}
                        onBlur={(e) => validateData(e)}
                        value={formatFormInputDate(formState.created_at)}
                        error={formErrors.created_at}
                        customStyles={customStyles}
                    />
                </div>
                {/* <div className={styles["form-col-left"]}>
                    <label>
                        <h4>Date</h4>
                    </label>
                </div>
                <div className={styles["form-col-right"]}>
                    <input
                        type="date"
                        name="created_at"
                        id="CreatedAt"
                        onChange={(e) =>
                            updateFormState(e.target.value, "date")
                        }
                        onBlur={(e) => validateData(e)}
                        value={formState.date}
                    />
                    {errors.date && (
                        <div className={"form-error"}>{errors.date}</div>
                    )}
                </div>
           */}
            </div>

            <div className={styles.footer}>
                <div
                    // className={`${styles["form-col-left"]} ${styles["buttons-box"]}`}
                    className={styles["buttons-box"]}
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
            </div>
        </>
    );
}
