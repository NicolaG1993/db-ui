import { useEffect, useState } from "react";
import ErrorUI from "@/src/domains/_app/components/Error/components/ErrorUI/ErrorUI";
import standardStyles from "./InputsSelector.module.css";
import { useAppSelector } from "@/src/application/redux/lib/hooks";
import {
    selectFormSideNavRenderReady,
    selectFormSideNavSelected,
    hydrateSideNavSelector,
} from "@/src/application/redux/slices/formSlice";
import { shallowEqual, useDispatch } from "react-redux";
import renderElements from "./utils/renderElements";

export default function InputsSelector({
    data,
    // currentFilters,
    topic,
    userStyles,
    onChange,
}) {
    console.log("*InputsSelector* ", {
        data,
        // currentFilters,
        topic,
        userStyles,
    });
    //////////////////////////////
    // REDUX STORE
    //////////////////////////////
    const dispatch = useDispatch();
    const renderReady = useAppSelector(
        selectFormSideNavRenderReady,
        shallowEqual
    );
    const currentSelection = useAppSelector(
        selectFormSideNavSelected,
        shallowEqual
    );
    //////////////////////////////
    // STATE
    //////////////////////////////
    const [error, setError] = useState();
    // const [renderReady, setRenderReady] = useState(false);
    // const [filters, setFilters] = useState(currentSelection || []);
    let styles = { ...standardStyles, ...userStyles } || standardStyles;

    useEffect(() => {
        // 🔴 Non faccio refactor di "error" perché so gia che dovró rifarlo con "props.onError() alla fine"
        if (!data) {
            setError("Error: data is missing");
        } else if (!Array.isArray(data)) {
            setError("Error: data is not an array");
        } else if (currentSelection && !Array.isArray(currentSelection)) {
            setError("Error: currentSelection is not an array");
        }

        // else {
        //     setRenderReady(true);
        // }

        // if (error) {
        //     dispatch(handleSideNavError({ error }));
        // } else {
        //     dispatch(hydrateSideNavDropdowns());
        // }

        dispatch(hydrateSideNavSelector());
    }, []);

    // useEffect(() => {
    //     if (onChange && typeof onChange !== "function") {
    //         setError("Error: onChange is not a function");
    //     } else if (onChange) {
    //         onChange({ val: currentSelection, topic });
    //     }
    // }, [currentSelection, topic]);

    // DELETE
    useEffect(() => {
        error && console.log("ERROR: ", error);
    }, [error]);

    //////////////////////////////
    // UPDATE FILTER STATE
    //////////////////////////////
    // 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴 FIX (REFACTOR) 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
    /*
    const updateFilters = (val, action) => {
        if (action === "add") {
            // update only if value is not present in array already, bug prevention
            if (currentFilters && !currentFilters.some((x) => x === val)) {
                setFilters([...currentFilters, val]);
            } else if (!filters.some((x) => x === val)) {
                setFilters([...filters, val]);
            }
        }
        if (action === "remove") {
            setFilters(currentFilters.filter((x) => x !== val));
        }
    };
    */

    //////////////////////////////
    // RENDERING
    //////////////////////////////
    /*
    return (
        <>
            {error ? (
                <ErrorUI error={error} styles={null} />
            ) : renderReady ? (
                renderElements(data)
            ) : (
                "Loading"
            )}
        </>
    );
    */
    return (
        <div className={styles.categoryDropdown}>
            {renderReady ? (
                renderElements({
                    data,
                    currentSelection,
                    //  updateFilters,
                    styles,
                })
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
