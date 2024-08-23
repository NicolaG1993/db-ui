import FormDrawerMultiSelect from "@/src/domains/_app/components/Form/components/FormSideNav@2.0/FormDrawerMultiSelect.js";
import FormDrawerHints from "@/src/domains/_app/components/Form/components/FormSideNav@2.0/FormDrawerHints";

export default function FormDrawerContent({ sideNavTopic, hintsIsOpen }) {
    if (sideNavTopic && !hintsIsOpen) {
        return <FormDrawerMultiSelect />;
    } else if (hintsIsOpen) {
        // 🧠 HINTS NAV IS OUTSIDE SIDE NAV - BECAUSE WE WANT TO SHOW IT ALSO ON FORM SUBMIT - maybe not 🧠
        return <FormDrawerHints />;
    }
}
