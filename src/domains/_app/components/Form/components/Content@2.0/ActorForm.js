import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import InputSocials from "@/src/domains/_app/components/Inputs/InputSocials/InputSocials";
import {
    selectFormPropsData,
    selectFormState,
    selectFormStoreSettings,
    selectFormStoreErrors,
    selectFormIsLoading,
    selectFormIsFinish,
    validateForm,
    updateFormState,
    openSideNav,
    // selectFormIsLoadingResponse,
} from "@/src/application/redux/slices/formSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
    createObjectURL,
    revokeObjectURL,
} from "@/src/domains/_app/actions/useLocalImages";
import { useState } from "react";
import customStyles from "@/src/domains/_app/components/Inputs/InputsCustomStyles.module.css";
import {
    InputText,
    InputSelect,
    InputDate,
    InputFake,
    InputImage,
    InputRating,
} from "zephyrus-components";

export default function ActorForm({ confirmChanges }) {
    const formState = useSelector(selectFormState, shallowEqual);
    const propsData = useSelector(selectFormPropsData, shallowEqual);
    const form = useSelector(selectFormStoreSettings, shallowEqual);
    const errors = useSelector(selectFormStoreErrors, shallowEqual);
    const isLoading = useSelector(selectFormIsLoading, shallowEqual);
    // const isLoadingResponse = useSelector(
    //     selectFormIsLoadingResponse,
    //     shallowEqual
    // );
    const isFinish = useSelector(selectFormIsFinish, shallowEqual);

    const dispatch = useDispatch();

    const [newImage, setNewImage] = useState();

    const handleNewImage = (e) => {
        const imgFile = e.target.files["0"];
        const file = {
            location: createObjectURL(imgFile),
            key: imgFile.name,
            file: imgFile, // non-serializable data 🧠
        };

        /*
        🧠🧠🧠🧠🧠
        Potrei salvare le immagini nel component invece di redux store
        e poi passarle a confirmChanges on submit
        PS. inoltre va bene se non sono salvate in memorized state, no problem
        🧠🧠🧠🧠🧠
        BIG BRAIN

        Dobbiamo vedere in parent come gestire file nuovi o file da props 
        il primo bisogna fare upload
        il secondo bisogna saltarlo
        -- mi sa che il primo é file obj, il secondo é solo str url

        ho aggiornato store, ora salva sempre e solo url di picture, 
        cosí faccio render sempre di questo valore.
        Vedere quando il valore viene usato in Form
        prima poteva esserci un check (da qualche parte, forse) che ora sarebbe inutile, controllare
       
        Ultimo bug:
        • handleRemoveImage -> formState "not working" 🟢
        */

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
                <div className={styles["form-subheading"]}>
                    <h5>• Info</h5>
                </div>

                <div className={styles["form-row"]}>
                    <InputImage
                        file={formState.pic}
                        onAddFile={(e) => handleNewImage(e)}
                        onDeleteFile={() =>
                            handleRemoveImage({
                                imgFile: newImage,
                            })
                        }
                        // height={200}
                        // width={250}
                        error={errors.pic}
                        customStyles={customStyles}
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
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-fourth"]}>
                    <InputSelect
                        name={"genre"}
                        id={"Genre"}
                        options={[
                            { value: "female", name: "F" },
                            { value: "male", name: "M" },
                            { value: "trans", name: "T" },
                        ]}
                        value={formState.genre}
                        onChange={(e) =>
                            dispatch(
                                updateFormState({
                                    val: e.target.value,
                                    topic: e.target.name,
                                    log: "genre",
                                })
                            )
                        }
                        multipleSelection={false}
                        includeParents={false}
                        placeholder={""}
                        isMandatory={true}
                        error={errors.genre}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-half"]}>
                    <InputDate
                        name={"birthday"}
                        id={"Birthday"}
                        onChange={(e) =>
                            dispatch(
                                updateFormState({
                                    val: e.target.value,
                                    topic: e.target.name,
                                })
                            )
                        }
                        value={formState.birthday}
                        error={errors.birthday}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-half"]}>
                    <InputRating
                        name={"rating"}
                        id={"Rating"}
                        step="0.01"
                        max="5"
                        onChange={(e) =>
                            dispatch(
                                updateFormState({
                                    val: Number(
                                        parseFloat(e.target.value).toFixed(2)
                                    ),
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
                        value={formState.rating}
                        placeholder="Type your rating (max 5.00)"
                        isMandatory={true}
                        error={errors.rating}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputSocials
                        name={"socials"}
                        id={"Socials"}
                        options={[
                            { name: "-", value: null },
                            { name: "Instagram", value: "instagram" },
                            { name: "X", value: "twitter" },
                        ]}
                        // selected={} // TODO: passare valore di selezionato?
                        formState={formState} // 🧠 sostituire con values={} - non passare tutto il form se vogliamo usare il component x library
                        // values={{ formState }} // 🧠🧠🧠🧠
                        onChange={(val, topic) =>
                            dispatch(
                                updateFormState({
                                    val,
                                    topic,
                                })
                            )
                        }
                        error={errors.socials}
                        placeholder={"Insert social link here..."}
                        // 🧠 anche per error dobbiamo creare un oggetto a parte, oppure avere errors.socials
                        // 🧠 FIX: NON ABBIAMO errors.socials 🧠
                    />
                </div>

                <div className={styles["form-subheading"]}>
                    <h5>• Relations</h5>
                </div>

                <div className={styles["form-row-full"]}>
                    <InputFake
                        name={"tags"}
                        id={"Tags"}
                        selected={formState.tags?.length || 0}
                        onClick={() => {
                            dispatch(openSideNav("tags"));
                        }}
                        customStyles={customStyles}
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
                        customStyles={customStyles}
                    />
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles["buttons-box"]}>
                    <button
                        type="submit"
                        disabled={isLoading || isFinish} // isLoadingResponse ?
                        className="button-standard"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </form>
    );
}
