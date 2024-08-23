import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
// import {
//     selectFormPropsData,
//     selectFormState,
//     selectFormStoreSettings,
//     selectFormStoreErrors,
//     selectFormIsLoading,
//     validateForm,
//     updateFormState,
//     openSideNav,
//     selectFormIsLoadingResponse,
//     selectFormIsFinish,
// } from "@/src/application/redux/slices/formSlice";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import { InputText, InputImage, InputFake, Button } from "zephyrus-components";
// import {
//     createObjectURL,
//     revokeObjectURL,
// } from "@/src/domains/_app/actions/useLocalImages";

export default function StudioForm({
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
    // const formSettings = useSelector(selectFormStoreSettings, shallowEqual);
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
        <>
            <div className={styles.body}>
                <div className={styles["form-row"]}>
                    <InputImage
                        file={formState.pic}
                        onAddFile={(e) => handleAddImage(e)}
                        onDeleteFile={handleRemoveImage}
                        // onAddFile={(e) => handleNewImage(e)}
                        // onDeleteFile={() =>
                        //     handleRemoveImage({
                        //         imgFile: newImage,
                        //     })
                        // }
                        height={200}
                        width={250}
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
                        // onChange={(e) =>
                        //     dispatch(
                        //         updateFormState({
                        //             val: e.target.value,
                        //             topic: e.target.name,
                        //         })
                        //     )
                        // }
                        // onBlur={(e) =>
                        //     dispatch(
                        //         validateForm({
                        //             name: e.target.name,
                        //             value: e.target.value,
                        //             id: e.target.id,
                        //         })
                        //     )
                        // }
                        onChange={(e) => onFormChange(e)}
                        onBlur={(e) => onFormValidate(e)}
                        placeholder="Type the name here..."
                        error={formErrors.name}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputText
                        name="website"
                        id="Website"
                        label={true}
                        isMandatory={false}
                        value={formState.website}
                        onChange={(e) => onFormChange(e)}
                        onBlur={(e) => onFormValidate(e)}
                        placeholder="Type the website here..."
                        error={formErrors.website}
                        customStyles={customStyles}
                    />
                </div>

                {/* FIX: cant save nationalities here */}
                <div className={styles["form-row-full"]}>
                    <InputFake
                        name={"nationalities"}
                        id={"Nationalities"}
                        label={true}
                        selected={formState.nationalities?.length || 0}
                        onClick={() => {
                            handleDrawer("nationalities");
                        }}
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
