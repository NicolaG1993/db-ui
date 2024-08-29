import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import { Button, InputDate } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import { formatFormInputDate } from "@/src/application/utils/convertTimestamp";

export default function RecordForm({
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
            </div>

            <div className={styles.footer}>
                <div className={styles["buttons-box"]}>
                    <Button
                        size="medium"
                        type="submit"
                        disabled={isLoading || isFinish} // isLoadingResponse ?
                        label="Confirm"
                        customStyles={customStyles}
                    />
                </div>
            </div>
        </>
    );
}
