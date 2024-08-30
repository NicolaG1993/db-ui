import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import { InputText, InputImage, InputFake, Button } from "zephyrus-components";

export default function StudioForm({
    formState,
    // formSettings,
    formErrors,
    // propsData,
    isLoading,
    // isLoadingResponse,
    isFinish,
    handleAddImage,
    handleRemoveImage,
    handleDrawer,
    onFormChange,
    onFormValidate,
}) {
    return (
        <>
            <div className={styles.body}>
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

                <div className={styles["form-row-full"]}>
                    <InputText
                        name="website"
                        id="Website"
                        label={true}
                        isMandatory={false}
                        value={formState.website}
                        onChange={(e) => onFormChange({ e })}
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
