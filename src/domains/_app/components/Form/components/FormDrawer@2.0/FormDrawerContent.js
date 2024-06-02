import FormSideNav from "@/src/domains/_app/components/Form/components/FormSideNav@2.0/FormSideNav.js";
import FormSideHints from "../FormSideNav@2.0/components/FormSideHints";
import { shallowEqual, useSelector } from "react-redux";
import { selectFormStoreUI } from "@/src/application/redux/slices/formSlice";

export default function FormDrawerContent({}) {
    const uiState = useSelector(selectFormStoreUI, shallowEqual);
    const { sideNavTopic, hintsIsOpen } = uiState;

    return (
        <>
            {sideNavTopic && !hintsIsOpen && <FormSideNav />}

            {/* 🧠 HINTS NAV IS OUTSIDE SIDE NAV - BECAUSE WE WANT TO SHOW IT ALSO ON FORM SUBMIT - maybe not 🧠 */}
            {hintsIsOpen && <FormSideHints />}
        </>
    );
}
