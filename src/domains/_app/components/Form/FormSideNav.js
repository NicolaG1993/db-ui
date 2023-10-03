import styles from "@/styles/AdminDashboard.module.css";
import ActiveFilters from "../../../all/components/Filters/ActiveFilters/ActiveFilters";
import DropdownMenusByCategory from "../../../all/components/Filters/DropdownMenusByCategory/DropdownMenusByCategory";
import InputsSelector from "../../../all/components/Filters/InputsSelector/InputsSelector";
import NationalitiesSelector from "../../../all/components/Filters/NationalitiesSelector/NationalitiesSelector";

export default function FormSideNav({
    data,
    form,
    formState,
    updateFormState,
    openSection,
    setOpenSection,
}) {
    return (
        <div
            className={styles.sidewrap}
            style={{
                transform: openSection ? "translateX(0)" : "translateX(498px)",
            }}
        >
            <div className={styles.nav}>
                <span onClick={() => setOpenSection(false)}>X</span>
            </div>

            <div className={styles.sidewrapContent}>
                {data &&
                    typeof data === "object" &&
                    !Array.isArray(data) &&
                    openSection === "tags" && (
                        <DropdownMenusByCategory
                            obj={data}
                            filters={formState[openSection]}
                            handleChildState={updateFormState}
                            // styles={styles}
                            topic={openSection}
                        />
                    )}
                {data &&
                    data.length &&
                    (openSection === "actors" ||
                        openSection === "studios" ||
                        openSection === "distributions" ||
                        openSection === "categories") && (
                        <InputsSelector
                            arr={data.map((el) => (el.name ? el.name : el))}
                            filters={formState[openSection]}
                            handleChildState={updateFormState}
                            // styles={styles}
                            topic={openSection}
                        />
                    )}

                {openSection === "nationalities" && (
                    <NationalitiesSelector
                        filters={formState[openSection]}
                        handleChildState={updateFormState}
                        // styles={styles}
                        topic={openSection}
                    />
                    // <InputSelector
                    //     topic={openSection}
                    //     topicID={openSection}
                    //     formState={formState}
                    //     updateFormState={updateFormState}
                    //     setOpenSection={setOpenSection}
                    //     propsData={allNationalities}
                    // />
                )}

                <ActiveFilters
                    arr={formState[openSection]}
                    handleChildState={updateFormState}
                    // styles={styles}
                    topic={openSection}
                />
            </div>
        </div>
    );
}
