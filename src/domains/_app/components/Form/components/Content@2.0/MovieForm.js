import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
// import { useState } from "react";
// import {
//     selectFormState,
//     selectFormStoreErrors,
//     selectFormStoreSettings,
//     selectFormPropsData,
//     validateForm,
//     // selectFormIsLoadingResponse,
//     updateFormState,
//     openSideNav,
//     selectFormIsLoading,
//     selectFormIsFinish,
// } from "@/src/application/redux/slices/formSlice";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import {
//     createObjectURL,
//     revokeObjectURL,
// } from "@/src/domains/_app/actions/useLocalImages";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import {
    InputText,
    InputDate,
    InputFake,
    InputImage,
    InputRating,
    InputTextToArray,
    Button,
} from "zephyrus-components";

export default function MovieForm({
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
    // let isLoading = useSelector(selectFormIsLoading, shallowEqual);
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

    console.log("MovieForm: ", {
        formState,
    });

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <>
            <div className={styles.body}>
                <div className={styles["form-subheading"]}>
                    <h5>• Info</h5>
                </div>

                <div className={styles["form-row"]}>
                    <InputImage
                        file={formState.pic}
                        onAddFile={(e) => handleAddImage(e)}
                        onDeleteFile={handleRemoveImage}
                        height={200}
                        width={250}
                        error={formErrors.pic}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputText
                        name="title"
                        id="Title"
                        label={true}
                        isMandatory={true}
                        value={formState.title}
                        onChange={(e) => onFormChange(e)}
                        onBlur={(e) => onFormValidate(e)}
                        placeholder="Type the title here..."
                        error={formErrors.title}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputTextToArray
                        name={"urls"}
                        id={"Urls"}
                        label={true}
                        formState={formState}
                        onChange={(e) => onFormChange(e)}
                        placeholder="Type URL here...   "
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-half"]}>
                    <InputRating
                        name={"rating"}
                        id={"Rating"}
                        step="0.01"
                        max="5"
                        onChange={(e) => onFormChange(e)}
                        onBlur={(e) => onFormValidate(e)}
                        value={formState.rating}
                        placeholder="Type your rating (max 5.00)"
                        isMandatory={true}
                        error={formErrors.rating}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-half"]}>
                    <InputDate
                        name={"release"}
                        id={"Release"}
                        onChange={(e) => onFormChange(e)}
                        // onBlur={(e) => onFormValidate(e)}
                        value={formState.release ? formState.release : ""}
                        error={formErrors.birthday}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-subheading"]}>
                    <h5>• Relations</h5>
                </div>

                <div className={styles["form-row-full"]}>
                    <InputFake
                        name={"actors"}
                        id={"Actors"}
                        label={true}
                        selected={formState.actors?.length || 0}
                        onClick={() => {
                            handleDrawer("actors");
                        }}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputFake
                        name={"categories"}
                        id={"Categories"}
                        label={true}
                        selected={formState.categories?.length || 0}
                        onClick={() => {
                            handleDrawer("categories");
                        }}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputFake
                        name={"tags"}
                        id={"Tags"}
                        label={true}
                        selected={formState.tags?.length || 0}
                        onClick={() => {
                            handleDrawer("tags");
                        }}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputFake
                        name={"production"}
                        id={"Production"}
                        label={true}
                        selected={formState.studios?.length || 0}
                        onClick={() => {
                            handleDrawer("studios");
                        }}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputFake
                        name={"distribution"}
                        id={"Distribution"}
                        label={true}
                        selected={formState.distributions?.length || 0}
                        onClick={() => {
                            handleDrawer("distributions");
                        }}
                        customStyles={customStyles}
                    />
                </div>
            </div>

            {/* Si puo fare component di footer, é sempre uguale */}
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
