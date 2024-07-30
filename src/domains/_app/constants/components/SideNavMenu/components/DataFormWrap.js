import {
    closeForm,
    selectFormIsFinish,
    selectFormPropsData,
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

    console.log("DataFormWrap: ", {
        isFormOpen,
        propsData,
        singleFormLabel,
    });

    // We need to restore this after refactoring - maybe move logic in redux 🧠👇
    const addNewToPlaylist = (obj) => {
        const { id, title } = obj;
        // questa fn viene invocata dopo che MovieForm ha finito di creare il nuovo movie
        // voglio prenderlo e aggiungerlo in fondo alla lista
        if (id) {
            obj = { id, title: title || "Untitled" };
            dispatch(addToSessionPlaylist(obj));
        }

        dispatch(closeForm());
    };

    const handleEdits = async () => {
        dispatch(reloadItem());
        // const fetchedItem = await fetchData(id, label, structure);
        //  dispatch(selectItem(fetchedItem));
        dispatch(closeForm());
    };
    // 👆🧠 fetchData is declared inside Item, cuz we need it there
    // 👆🧠 We could call this when store.isFinish (or similar) becomes "true" 🧠
    // The problem is that we are handling addNewToPlaylist from here 🔴

    useEffect(() => {
        if (isFinish) {
            if (isFormOpen && singleFormLabel === "movie" && !propsData) {
                addNewToPlaylist(obj);
            } else if (isFormOpen && propsData) {
                handleEdits();
            }
        }
    }, [isFinish]);

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
