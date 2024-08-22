import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
// import {
//     selectFormPropsData,
//     selectFormState,
//     selectFormStoreSettings,
//     selectFormStoreErrors,
//     selectFormIsLoading,
//     validateForm,
//     updateFormState,
//     selectFormIsLoadingResponse,
//     selectFormIsFinish,
// } from "@/src/application/redux/slices/formSlice";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
import { InputText, InputImage, Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
// import {
//     createObjectURL,
//     revokeObjectURL,
// } from "@/src/domains/_app/actions/useLocalImages";

export default function CategoryForm({
    formState,
    formSettings,
    formErrors,
    propsData,
    isLoading,
    // isLoadingResponse,
    isFinish,
    handleAddImage,
    handleRemoveImage,
    handleDrawer,
    onFormChange,
    onFormValidate,
    onSubmit,
}) {
    // const formState = useSelector(selectFormState, shallowEqual);
    // const propsData = useSelector(selectFormPropsData, shallowEqual);
    // const form = useSelector(selectFormStoreSettings, shallowEqual);
    // const errors = useSelector(selectFormStoreErrors, shallowEqual);
    // const isLoading = useSelector(selectFormIsLoading, shallowEqual);
    // const isLoadingResponse = useSelector(
    //     selectFormIsLoadingResponse,
    //     shallowEqual
    // );
    // const isFinish = useSelector(selectFormIsFinish, shallowEqual);

    // const dispatch = useDispatch();

    // const [newImage, setNewImage] = useState();

    // const handleNewImage = (e) => {
    //     const imgFile = e.target.files["0"];
    //     const file = {
    //         location: createObjectURL(imgFile),
    //         key: imgFile.name,
    //         file: imgFile,
    //     };
    //     setNewImage(file);
    //     dispatch(updateFormState({ val: file.location, topic: "pic" }));
    // };

    // const handleRemoveImage = (imgFile) => {
    //     if (imgFile) {
    //         revokeObjectURL(imgFile);
    //         setNewImage();
    //     }
    //     if (formState.pic) {
    //         dispatch(updateFormState({ val: "", topic: "pic" }));
    //     }
    // };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <form
            onSubmit={(e) =>
                onSubmit({
                    e,
                    formState,
                    newImage,
                    formSettings,
                    propsData,
                    formLabel: formSettings.key,
                })
            }
            className={styles.form}
        >
            <div className={styles.body}>
                <div className={styles["form-row"]}>
                    <InputImage
                        file={formState.pic}
                        onAddFile={(e) => handleAddImage(e)}
                        onDeleteFile={handleRemoveImage}
                        // height={200}
                        // width={250}
                        error={formErrors.pic}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputText
                        name="name"
                        id="Name"
                        label={true}
                        isMandatory={true}
                        value={formState.name}
                        onChange={(e) => onFormChange(e)}
                        onBlur={(e) => onFormValidate(e)}
                        placeholder="Type the name here..."
                        error={formErrors.name}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputText
                        name="type"
                        id="Type"
                        label={true}
                        // isMandatory={true}
                        value={formState.type}
                        onChange={(e) => onFormChange(e)}
                        onBlur={(e) => onFormValidate(e)}
                        placeholder="Type the type name here..."
                        error={formErrors.type}
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
        </form>
    );
}
