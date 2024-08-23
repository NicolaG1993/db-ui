// import {
//     selectFormIsFinish,
//     selectFormIsLoading,
//     selectFormPropsData,
//     selectFormState,
//     selectFormStoreErrors,
//     selectFormStoreSettings,
// } from "@/src/application/redux/slices/formSlice";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
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
    console.log("RecordForm: ", { formState, formErrors, isLoading, isFinish });
    // let formState = useSelector(selectFormState, shallowEqual);
    // let propsData = useSelector(selectFormPropsData, shallowEqual);
    // let form = useSelector(selectFormStoreSettings, shallowEqual);
    // let errors = useSelector(selectFormStoreErrors, shallowEqual);
    // let isLoading = useSelector(selectFormIsLoading, shallowEqual);
    // const isFinish = useSelector(selectFormIsFinish, shallowEqual);

    // const dispatch = useDispatch();

    // <form
    //     onSubmit={(e) =>
    //         confirmChanges({
    //             e,
    //             formState,
    //             newImage,
    //             form,
    //             propsData,
    //             formLabel: form.key,
    //         })
    //     }
    //     className={styles.form}
    // >
    return (
        <>
            <div className={styles.body}>
                {/* <div className={styles["form-col-left"]}>
                    <h5>Date</h5>
                </div> */}

                <div className={styles["form-row-full"]}>
                    <InputDate
                        name={"created_at"}
                        id={"CreatedAt"}
                        label={true} // "Date" ?
                        onChange={(e) => onFormChange(e)}
                        onBlur={(e) => validateData(e)}
                        value={formatFormInputDate(formState.created_at)}
                        error={formErrors.created_at}
                        customStyles={customStyles}
                    />
                    {/* <input
                    type="date"
                    name="created_at"
                    id="CreatedAt"
                    onChange={(e) =>
                        dispatch(
                            updateFormState({
                                val: e.target.value,
                                topic: e.target.name,
                                log: "date",
                            })
                        )
                    }
                    onBlur={(e) => validateData(e)}
                    value={formState.date}
                />
                {errors.date && (
                    <div className={"form-error"}>{errors.date}</div>
                )} */}
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
