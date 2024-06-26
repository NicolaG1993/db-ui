import {
    selectFormIsFinish,
    selectFormIsLoading,
    selectFormPropsData,
    selectFormState,
    selectFormStoreErrors,
    selectFormStoreSettings,
} from "@/src/application/redux/slices/formSlice";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export default function RecordForm({ confirmChanges }) {
    let formState = useSelector(selectFormState, shallowEqual);
    let propsData = useSelector(selectFormPropsData, shallowEqual);
    let form = useSelector(selectFormStoreSettings, shallowEqual);
    let errors = useSelector(selectFormStoreErrors, shallowEqual);
    let isLoading = useSelector(selectFormIsLoading, shallowEqual);
    const isFinish = useSelector(selectFormIsFinish, shallowEqual);

    const dispatch = useDispatch();

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <form
            onSubmit={(e) =>
                confirmChanges({
                    e,
                    formState,
                    newImage,
                    form,
                    propsData,
                    formLabel: form.key,
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
            </div>
        </form>
    );
}
