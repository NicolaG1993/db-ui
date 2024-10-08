import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import {
    Button,
    InputText,
    InputSelect,
    InputDate,
    InputFake,
    InputImage,
    InputRating,
    InputSocials,
} from "zephyrus-components";

export default function ActorForm({
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
    //         file: imgFile, // non-serializable data 🧠
    //     };

    //     /*
    //     🧠🧠🧠🧠🧠
    //     Potrei salvare le immagini nel component invece di redux store
    //     e poi passarle a confirmChanges on submit
    //     PS. inoltre va bene se non sono salvate in memorized state, no problem
    //     🧠🧠🧠🧠🧠
    //     BIG BRAIN

    //     Dobbiamo vedere in parent come gestire file nuovi o file da props
    //     il primo bisogna fare upload
    //     il secondo bisogna saltarlo
    //     -- mi sa che il primo é file obj, il secondo é solo str url

    //     ho aggiornato store, ora salva sempre e solo url di picture,
    //     cosí faccio render sempre di questo valore.
    //     Vedere quando il valore viene usato in Form
    //     prima poteva esserci un check (da qualche parte, forse) che ora sarebbe inutile, controllare

    //     Ultimo bug:
    //     • handleRemoveImage -> formState "not working" 🟢
    //     */

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
    console.log("ACtor formState: ", formState);

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
                        onChange={(e) => onFormChange({ e })}
                        onBlur={(e) => onFormValidate(e)}
                        placeholder="Type the name here..."
                        error={formErrors.name}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-fourth"]}>
                    <InputSelect
                        name={"genre"}
                        id={"Genre"}
                        label={true}
                        options={[
                            { value: "female", name: "F" },
                            { value: "male", name: "M" },
                            { value: "trans", name: "T" },
                        ]}
                        value={formState.genre}
                        onChange={(e) => onFormChange({ e })}
                        multipleSelection={false}
                        includeParents={false}
                        placeholder={""}
                        isMandatory={true}
                        error={formErrors.genre}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-half"]}>
                    <InputDate
                        name={"birthday"}
                        id={"Birthday"}
                        label={true}
                        onChange={(e) => onFormChange({ e })}
                        value={formState.birthday}
                        error={formErrors.birthday}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-half"]}>
                    <InputRating
                        name={"rating"}
                        id={"Rating"}
                        label={true}
                        step="0.01"
                        max="5"
                        onChange={(e) => onFormChange({ e })}
                        onBlur={(e) => onFormValidate(e)}
                        value={formState.rating}
                        placeholder="Type your rating (max 5.00)"
                        isMandatory={true}
                        error={formErrors.rating}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-row-full"]}>
                    <InputSocials
                        name={"socials"}
                        id={"Socials"}
                        label={true}
                        options={[
                            { name: "-", value: null },
                            { name: "Instagram", value: "instagram" },
                            { name: "X", value: "twitter" },
                        ]}
                        // selected={} // TODO: passare valore di selezionato?
                        formState={formState} // 🧠 sostituire con values={} - non passare tutto il form se vogliamo usare il component x library
                        // values={{ formState }} // 🧠🧠🧠🧠
                        // onChange={(val, topic) =>
                        //     dispatch(
                        //         updateFormState({
                        //             val,
                        //             topic,
                        //         })
                        //     )
                        // }
                        onChange={(e) => onFormChange({ e })} // qui non usiamo event! 🔴🔴🔴 FIX
                        // onBlur={(e) => onFormValidate(e)}
                        error={formErrors.socials}
                        placeholder={"Insert social link here..."}
                        // 🧠 anche per error dobbiamo creare un oggetto a parte, oppure avere formErrors.socials
                        // 🧠 FIX: NON ABBIAMO formErrors.socials 🧠
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles["form-subheading"]}>
                    <h5>• Relations</h5>
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
