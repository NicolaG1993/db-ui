import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import {
    selectFormPropsData,
    selectFormState,
    selectFormStoreSettings,
    selectFormStoreErrors,
    selectFormIsLoading,
    validateForm,
    updateFormState,
    openSideNav,
    selectFormIsLoadingResponse,
} from "@/src/application/redux/slices/formSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import InputImage from "@/src/domains/_app/components/Inputs/InputImage/InputImage";
import InputText from "@/src/domains/_app/components/Inputs/InputText/InputText";
import InputFake from "@/src/domains/_app/components/Inputs/InputFake/InputFake";
import {
    createObjectURL,
    revokeObjectURL,
} from "@/src/domains/_app/actions/useLocalImages";

export default function StudioForm({ confirmChanges }) {
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

                <div className={styles["form-row-full"]}>
                    <InputText
                        name="name"
                        id="Name"
                        isMandatory={true}
                        value={formState.name}
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
                        placeholder="Type the name here..."
                        error={errors.name}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputText
                        name="website"
                        id="Website"
                        isMandatory={false}
                        value={formState.website}
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
                        placeholder="Type the website here..."
                        error={errors.website}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputFake
                        name={"nationalities"}
                        id={"Nationalities"}
                        selected={formState.nationalities?.length || 0}
                        onClick={() => {
                            dispatch(openSideNav("nationalities"));
                        }}
                    />
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles["buttons-box"]}>
                    <button
                        type="submit"
                        disabled={isLoading} // 🧠 isLoadingResponse ?? quale usare?? 🧠
                        className="button-standard"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </form>
    );
}
