import {
    closeForm,
    selectFormIsFinish,
    selectFormPropsData,
    selectFormResponse,
    selectFormStoreLabel,
    selectIsFormOpen,
    selectIsFormSingle,
} from "@/src/application/redux/slices/formSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import NewDataForm from "@/src/domains/_app/constants/components/SideNavMenu/components/NewDataForm";
import EditDataForm from "@/src/domains/_app/constants/components/SideNavMenu/components/EditDataForm";
import { useEffect } from "react";
import {
    selectItem,
    reloadItem,
} from "@/src/application/redux/slices/itemSlice";
import { addToSessionPlaylist } from "@/src/application/redux/slices/sessionPlaylistSlice";

/*
    handle parent edits for sessionPlaylist
    handle parent edits for edit Form
*/

export default function DataFormWrap() {
    const dispatch = useDispatch();
    let isFormOpen = useSelector(selectIsFormOpen, shallowEqual);
    let propsData = useSelector(selectFormPropsData);
    let singleFormLabel = useSelector(selectIsFormSingle);
    let isFinish = useSelector(selectFormIsFinish);
    let formRes = useSelector(selectFormResponse, shallowEqual);

    // We need to restore this after refactoring - maybe move logic in redux 🧠👇
    // This is called only for movie and only for SessionPlaylist (seams a edge case to me - maybe to store and handle somewhere else?
    const addNewToPlaylist = (obj) => {
        const { id } = obj;
        // questa fn viene invocata dopo che MovieForm ha finito di creare il nuovo movie
        // voglio prenderlo e aggiungerlo in fondo alla lista
        if (id) {
            /*
            const newMovie = {
                ...obj,
                title: obj.title || "Untitled", // It isn't possible to store without title
            };
            */
            dispatch(addToSessionPlaylist(obj));
        }
    };

    const handleEdits = async () => {
        dispatch(reloadItem());
    };

    useEffect(() => {
        if (isFinish) {
            if (isFormOpen && singleFormLabel === "movie" && !propsData) {
                formRes && addNewToPlaylist(formRes); // we dont have obj here! 🧠🔴🔴🔴⚠️⚠️⚠️
            } else if (isFormOpen && propsData) {
                handleEdits();
            }

            dispatch(closeForm());
        }
    }, [isFinish, formRes]);

    if (isFormOpen && singleFormLabel === "" && !propsData) {
        return <NewDataForm />;
    } else if (isFormOpen && singleFormLabel === "movie" && !propsData) {
        return <NewDataForm formLabel={singleFormLabel} />;
    } else if (isFormOpen && propsData) {
        return (
            <EditDataForm propsData={propsData} formLabel={singleFormLabel} />
        );
    }
}
