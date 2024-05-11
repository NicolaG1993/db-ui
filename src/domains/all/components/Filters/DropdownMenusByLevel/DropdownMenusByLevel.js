import { useEffect, useState } from "react";
import standardStyles from "@/src/domains/all/components/Filters/DropdownMenusByLevel/DropdownMenusByLevel.module.css";
import updatePrevSelected from "@/src/domains/all/components/Filters/DropdownMenusByLevel/actions/updatePrevSelected";
import getDropdownsState from "@/src/domains/all/components/Filters/DropdownMenusByLevel/actions/getDropdownsState";
import renderDropdownLevel from "@/src/domains/all/components/Filters/DropdownMenusByLevel/utils/renderDropdownLevel";
import { useAppSelector } from "@/src/application/redux/lib/hooks";
import { shallowEqual, useDispatch } from "react-redux";
import {
    handleSideNavError,
    hydrateSideNavDropdowns,
    selectFormSideNavError,
    selectFormSideNavFilteredData,
    selectFormSideNavFilters,
    selectFormSideNavRenderReady,
    selectFormSideNavSelected,
    selectFormStoreUI,
} from "@/src/application/redux/slices/formSlice";
// import ErrorUI from "@/src/domains/_app/components/Error/components/ErrorUI/ErrorUI";

/*
TODO:
✅ controllare cosa fa updatePrevSelected 
✅ fix selected tags not detected
✅ creare files per ogni component e utils
✅ fix tag hints not working
⬜ fix props loops - we have to implement a store for this and refactor some more, not sure
⬜ testare con oggetti dummy (ogni oggetto: movie, actor, record, tag, ...)
⬜ Fix G.Michaels infos + fix bug if still there (when adding a tag and saving they all got deleted)
⬜ pulire codice
*/

export default function DropdownMenusByLevel({ onChange, userStyles }) {
    //////////////////////////////
    // STATE
    //////////////////////////////
    console.log("*🌸 Rendering *DropdownMenusByLevel* ", props);

    // TODO:
    // menuStructure contiene solo names
    // abbinargli gli ids corrispondenti (da tags che riceviamo da API on render)
    // renderizzarli nel gruppo corretto
    // handle add
    // handle remove
    // handle tags hints

    const dispatch = useDispatch();

    const uiState = useAppSelector(selectFormStoreUI, shallowEqual);
    const topic = uiState.sideNavTopic;
    // 🧠 TRY: can i select all SideNavState at once and us it?
    const error = useAppSelector(selectFormSideNavError, shallowEqual);
    // const [error, setError] = useState();
    const [dropdownsState, setDropdownsState] = useState({});
    const renderReady = useAppSelector(
        selectFormSideNavRenderReady,
        shallowEqual
    );
    // const [renderReady, setRenderReady] = useState(false);
    const selected = useAppSelector(selectFormSideNavSelected, shallowEqual);
    // const [filters, setFilters] = useState(filters || []);
    // const [stateObj, setStateObj] = useState({}); // ??? elimina ???
    const menuStructure = useAppSelector(
        selectFormSideNavFilteredData,
        shallowEqual
    );

    let styles = userStyles
        ? { ...standardStyles, ...userStyles }
        : standardStyles; // mi serve veramente? 🧠 lo uso solo per poter applicare stile al di sopra del suo

    useEffect(() => {
        let error;
        if (!menuStructure) {
            error = "Error: menuStructure is missing";
        } else if (typeof menuStructure !== "object") {
            error = "Error: menuStructure is not an object";
        } else if (selected && !Array.isArray(selected)) {
            error = "Error: selected is not an array";
        }

        if (error) {
            dispatch(handleSideNavError({ error }));
        } else {
            dispatch(hydrateSideNavDropdowns());
        }
    }, []);

    useEffect(() => {
        if (onChange && typeof onChange !== "function") {
            const error = "Error: onChange is not a function";
            dispatch(handleSideNavError({ error }));
        } else if (onChange) {
            onChange({ val: selected, topic });
        }
    }, [selected]);

    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////
    const handleMenus = (newState) => {
        setDropdownsState(newState);
    };

    const handleFilters = (val, userAction) => {
        dispatch(
            updateSideNavSelected({
                val,
                userAction,
                selected,
                dropdownsState,
            })
        );
    };

    //////////////////////////////
    // DOM
    //////////////////////////////
    return (
        <div id={styles.DropdownMenus}>
            {renderReady ? (
                renderDropdownLevel({
                    nextMenuStructure: menuStructure,
                    index: 1,
                    styles,
                    dropdownsState,
                    filters: selected,
                    handleFilters,
                    handleMenus,
                })
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

// OLD NOTES: BEFORE REFACTORING
// // FARE CUSTOM COMPONENTS DI QUESTO 🧠👍
// // È GIA PRONTO!
