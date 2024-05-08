import FormSideNav from "@/src/domains/_app/components/Form/components/FormSideNav/FormSideNav.js";
import FormSideHints from "../FormSideNav/components/FormSideHints";

export default function FormDrawerContent({
    drawerIsOpen,
    sideNavIsOpen,
    topic,
    data,
    parsedData,
    propsData,
    formState,
    hintsIsOpen,
    hints,
    appSettings,
    updateFormState,
    handleDrawer,
    closeSideNav,
    openSideNav,
    handleHints,
    acceptMissingHints,
    acceptRemovedHints,
}) {
    return (
        <div>
            {sideNavIsOpen && (
                <FormSideNav
                    data={data}
                    parsedData={parsedData}
                    formState={formState}
                    originalFormState={propsData || formState}
                    updateFormState={updateFormState}
                    topic={topic}
                    handleDrawer={handleDrawer}
                    closeSideNav={closeSideNav}
                    openSideNav={openSideNav}
                    handleHints={handleHints}
                    hints={hints}
                    acceptMissingHints={acceptMissingHints}
                    acceptRemovedHints={acceptRemovedHints}
                    appSettings={appSettings}
                />
            )}

            {/* 🧠 HINTS NAV IS OUTSIDE SIDE NAV - BECAUSE WE WANT TO SHOW IT ALSO ON FORM SUBMIT - maybe not 🧠 */}
            {hintsIsOpen && (
                <FormSideHints
                    hints={hints}
                    handleHints={handleHints}
                    acceptMissingHints={acceptMissingHints}
                    acceptRemovedHints={acceptRemovedHints}
                />
            )}
        </div>
    );
}
