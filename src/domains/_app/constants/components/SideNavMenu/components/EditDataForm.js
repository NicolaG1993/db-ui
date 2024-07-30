import Form from "@/src/domains/_app/components/Form/components/Form";
// import styles from "@/src/application/styles/AdminDashboard.module.css";
// import { selectFormStoreUI } from "@/src/application/redux/slices/formSlice";
// import { shallowEqual, useSelector } from "react-redux";

export default function EditDataForm({ propsData, formLabel }) {
    return (
        <Form
            formLabel={formLabel}
            propsData={propsData}
            // handleEditsInParent={handleEdits}
        />
    );
}
