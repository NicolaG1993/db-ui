import { useEffect, useState } from "react";
import standardStyles from "@/src/domains/all/components/Filters/DropdownMenusByLevel/DropdownMenusByLevel.module.css";
import updatePrevFilters from "@/src/domains/all/components/Filters/DropdownMenusByLevel/actions/updatePrevFilters";
import getDropdownsState from "@/src/domains/all/components/Filters/DropdownMenusByLevel/actions/getDropdownsState";
import renderDropdownLevel from "@/src/domains/all/components/Filters/DropdownMenusByLevel/utils/renderDropdownLevel";
// import ErrorUI from "@/src/domains/_app/components/Error/components/ErrorUI/ErrorUI";

/*
TODO:
✅ controllare cosa fa updatePrevFilters 
✅ fix selected tags not detected
✅ creare files per ogni component e utils
✅ fix tag hints not working
⬜ fix props loops - we have to implement a store for this and refactor some more, not sure
⬜ testare con oggetti dummy (ogni oggetto: movie, actor, record, tag, ...)
⬜ Fix G.Michaels infos + fix bug if still there (when adding a tag and saving they all got deleted)
⬜ pulire codice
*/

export default function DropdownMenusByLevel(props) {
    //////////////////////////////
    // STATE
    //////////////////////////////
    console.log("*🌸 Rendering *DropdownMenusByLevel* ", props);

    // TODO:
    // props.menuStructure contiene solo names
    // abbinargli gli ids corrispondenti (da tags che riceviamo da API on render)
    // renderizzarli nel gruppo corretto
    // handle add
    // handle remove
    // handle tags hints

    const [error, setError] = useState();
    const [dropdownsState, setDropdownsState] = useState({});
    const [renderReady, setRenderReady] = useState(false);
    const [filters, setFilters] = useState(props.filters || []);
    // const [stateObj, setStateObj] = useState({}); // ??? elimina ???

    let styles = props.styles
        ? { ...standardStyles, ...props.styles }
        : standardStyles;

    useEffect(() => {
        if (!props.menuStructure) {
            setError("Error: props.menuStructure is missing");
        } else if (typeof props.menuStructure !== "object") {
            setError("Error: props.menuStructure is not an object");
        } else if (props.filters && !Array.isArray(props.filters)) {
            setError("Error: props.filters is not an array");
        } else {
            hydrateDropdowns();
        }
    }, []);

    useEffect(() => {
        if (props.onChange && typeof props.onChange !== "function") {
            setError("Error: onChange is not a function");
        } else if (props.onChange) {
            props.onChange({ val: filters, topic: props.topic });
        }
    }, [filters]);

    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////
    const hydrateDropdowns = () => {
        let { res, err } = getDropdownsState({
            stateObj: {},
            propsObj: props.menuStructure,
            dropdownsState,
        });
        err && setError(err); // 🧠 handle Error correctly - now we are just storing it 🧠
        setDropdownsState(res);
        setRenderReady(true);
    };

    const handleMenus = (newState) => {
        setDropdownsState(newState);
    };

    const handleFilters = (val, action) => {
        let array = updatePrevFilters(
            val,
            action,
            props,
            filters,
            dropdownsState
        );
        setFilters(array);
    };

    //////////////////////////////
    // DOM
    //////////////////////////////
    return (
        <div id={styles.DropdownMenus}>
            {renderReady ? (
                renderDropdownLevel({
                    nextMenuStructure: props.menuStructure,
                    index: 1,
                    styles,
                    dropdownsState,
                    filters: props.filters, // or just filters?
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
