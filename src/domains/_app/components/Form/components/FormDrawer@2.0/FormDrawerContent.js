import FormSideNav from "@/src/domains/_app/components/Form/components/FormSideNav@2.0/FormSideNav.js";
import FormSideHints from "../FormSideNav@2.0/components/FormSideHints";
import { shallowEqual, useSelector } from "react-redux";
import { selectFormStoreUI } from "@/src/application/redux/slices/formSlice";

export default function FormDrawerContent(
    {
        // drawerIsOpen,
        // sideNavIsOpen,
        // topic,
        // data,
        // parsedData,
        // propsData,
        // formState,
        // hintsIsOpen,
        // hints,
        // appSettings,
        // updateFormState,
        // handleDrawer,
        // closeSideNav,
        // openSideNav,
        // handleHints,
        // closeHintsNav,
        // acceptMissingHints,
        // acceptRemovedHints,
    }
) {
    const uiState = useSelector(selectFormStoreUI, shallowEqual);
    const { sideNavTopic, hintsIsOpen } = uiState;

    return (
        <>
            {sideNavTopic && (
                <FormSideNav
                // data={data}
                // parsedData={parsedData}
                // formState={formState}
                // originalFormState={propsData || formState}
                // updateFormState={updateFormState}
                // topic={topic}
                // handleDrawer={handleDrawer}
                // closeSideNav={closeSideNav}
                // openSideNav={openSideNav}
                // handleHints={handleHints}
                // hints={hints}
                // acceptMissingHints={acceptMissingHints}
                // acceptRemovedHints={acceptRemovedHints}
                // appSettings={appSettings}
                />
            )}

            {/* 🧠 HINTS NAV IS OUTSIDE SIDE NAV - BECAUSE WE WANT TO SHOW IT ALSO ON FORM SUBMIT - maybe not 🧠 */}
            {hintsIsOpen && (
                <FormSideHints
                // hints={hints}
                // handleHints={handleHints}
                // acceptMissingHints={acceptMissingHints}
                // acceptRemovedHints={acceptRemovedHints}
                // formState={formState}
                // closeHintsNav={closeHintsNav}
                />
            )}
        </>
    );
}
