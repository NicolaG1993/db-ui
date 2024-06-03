import Image from "next/image";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import {
    selectFormPropsData,
    selectFormState,
    selectFormStoreSettings,
    selectFormStoreErrors,
    selectFormIsLoading,
    validateForm,
    updateFormState,
    selectFormIsLoadingResponse,
} from "@/src/application/redux/slices/formSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import InputImage from "@/src/domains/_app/components/Inputs/InputImage/InputImage";
import InputText from "@/src/domains/_app/components/Inputs/InputText/InputText";

export default function CategoryForm({ confirmChanges }) {
    const formState = useSelector(selectFormState, shallowEqual);
    const propsData = useSelector(selectFormPropsData, shallowEqual);
    const form = useSelector(selectFormStoreSettings, shallowEqual);
    const errors = useSelector(selectFormStoreErrors, shallowEqual);
    const isLoading = useSelector(selectFormIsLoading, shallowEqual);
    const isLoadingResponse = useSelector(
        selectFormIsLoadingResponse,
        shallowEqual
    );

    const dispatch = useDispatch();

    const [newImage, setNewImage] = useState();

    const handleNewImage = (e) => {
        const imgFile = e.target.files["0"];
        const file = {
            location: createObjectURL(imgFile),
            key: imgFile.name,
            file: imgFile,
        };
        setNewImage(file);
        dispatch(updateFormState({ val: file.location, topic: "pic" }));
    };

    const handleRemoveImage = (imgFile) => {
        if (imgFile) {
            revokeObjectURL(imgFile);
            setNewImage();
        }
        if (formState.pic) {
            dispatch(updateFormState({ val: "", topic: "pic" }));
        }
    };

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
            <div className={styles.body}>
                <div className={styles["form-row"]}>
                    <InputImage
                        file={formState.pic}
                        onAddFile={(e) => handleNewImage(e)}
                        onDeleteFile={() =>
                            handleRemoveImage({
                                imgFile: newImage,
                            })
                        }
                    />
                </div>

                <div className={styles["form-row"]}>
                    <InputText
                        name="title"
                        id="Title"
                        isMandatory={true}
                        value={formState.title}
                        onChange={(e) =>
                            dispatch(
                                updateFormState({
                                    val: e.target.value,
                                    topic: e.target.name,
                                })
                            )
                        }
                        onBlur={(e) =>
                            dispatch(
                                validateForm({
                                    name: e.target.name,
                                    value: e.target.value,
                                    id: e.target.id,
                                })
                            )
                        }
                        placeholder="Type the title here..."
                        error={errors.title}
                    />
                </div>

                <div className={styles["form-row"]}>
                    <InputText
                        name="type"
                        id="Type"
                        // isMandatory={true}
                        value={formState.type}
                        onChange={(e) =>
                            dispatch(
                                updateFormState({
                                    val: e.target.value,
                                    topic: e.target.name,
                                })
                            )
                        }
                        onBlur={(e) =>
                            dispatch(
                                validateForm({
                                    name: e.target.name,
                                    value: e.target.value,
                                    id: e.target.id,
                                })
                            )
                        }
                        placeholder="Type the type name here..."
                        error={errors.type}
                    />
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles["buttons-box"]}>
                    <button
                        type="submit"
                        disabled={isLoading} // isLoadingResponse ?? quale usare?? 🧠
                        className="button-standard"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </form>
    );
}
