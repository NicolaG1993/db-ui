import styles from "@/src/application/styles/AdminDashboard.module.css";
import ActiveFilters from "@/src/domains/all/components/Filters/ActiveFilters/ActiveFilters";
import DropdownMenusByCategory from "@/src/domains/all/components/Filters/DropdownMenusByCategory/DropdownMenusByCategory";
import InputsSelector from "@/src/domains/all/components/Filters/InputsSelector/InputsSelector";
import NationalitiesSelector from "@/src/domains/all/components/Filters/NationalitiesSelector/NationalitiesSelector";
import FormSideNavSearchBar from "./components/FormSideNavSearchBar";
import { useEffect, useState } from "react";
import { searchData } from "../../../utils/filterData";

export default function FormSideNav({
    data,
    form,
    formState,
    updateFormState,
    openSection,
    setOpenSection,
}) {
    const [filteredData, setFilteredData] = useState(data);
    const [searchActive, setSearchActive] = useState(false);

    const filterData = (str) => {
        if (str) {
            let arr = searchData(data, str);
            setFilteredData(arr);
            setSearchActive(true);
        } else {
            setFilteredData(data);
            setSearchActive(false);
        }
    };

    useEffect(() => {
        setFilteredData(data);
        setSearchActive(false);
    }, [data]);

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
                <div className={styles.sidewrapHeader}>
                    <div className={styles.wrapper}>
                        <FormSideNavSearchBar
                            openSection={openSection}
                            data={data}
                            handleSearch={filterData}
                        />
                    </div>
                </div>
                <div className={styles.sidewrapBody}>
                    <div className={styles.wrapper}>
                        {filteredData &&
                            typeof filteredData === "object" &&
                            !Array.isArray(filteredData) && (
                                <DropdownMenusByCategory
                                    obj={filteredData}
                                    filters={formState[openSection]}
                                    handleChildState={updateFormState}
                                    // styles={styles}
                                    topic={openSection}
                                />
                            )}
                        {filteredData && filteredData.length && (
                            <InputsSelector
                                arr={filteredData.map((el) =>
                                    el.name ? el.name : el
                                )}
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
                    </div>

                    <div className={styles.wrapper}>
                        <ActiveFilters
                            arr={formState[openSection]}
                            handleChildState={updateFormState}
                            // styles={styles}
                            topic={openSection}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
