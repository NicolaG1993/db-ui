import { useEffect, useState } from "react";
import Error from "@/src/domains/_app/components/Error/Error";
import allNationalities from "@/src/application/settings/allNationalities";
import standardStyles from "../InputsSelector/InputsSelector.module.css";

export default function NationalitiesSelector(props) {
    //////////////////////////////
    // STATE
    //////////////////////////////
    // console.log("*Rendering *NationalitiesSelector* ", props);
    const [error, setError] = useState();
    const [renderReady, setRenderReady] = useState(false);
    const [filters, setFilters] = useState(props.filters || []);
    let styles = props.styles || standardStyles;

    useEffect(() => {
        setRenderReady(true);
    }, []);

    useEffect(() => {
        if (
            props.handleChildState &&
            typeof props.handleChildState !== "function"
        ) {
            setError("Error: handleChildState is not a function");
        } else if (props.handleChildState) {
            props.handleChildState(filters, props.topic);
        }
    }, [filters]);

    //////////////////////////////
    // UPDATE FILTER STATE
    //////////////////////////////
    const updateFilters = (val, action) => {
        if (action === "add") {
            // update only if value is not present in array already, bug prevention
            if (props.filters && !props.filters.some((x) => x === val)) {
                setFilters([...props.filters, val]);
            } else if (!filters.some((x) => x === val)) {
                setFilters([...filters, val]);
            }
        }
        if (action === "remove") {
            setFilters(props.filters.filter((x) => x !== val));
        }
    };

    //////////////////////////////
    // DATA HANDLERS
    //////////////////////////////
    const renderValues = (array) => {
        return (
            <div className={styles.categoryDropdown}>
                {["N/A", ...array].map((it) => {
                    return props.filters &&
                        props.filters.find((x) => it === x) ? (
                        <div key={"value: " + it}>
                            <span
                                className={styles.selectedEl}
                                onClick={() => updateFilters(it, "remove")}
                            >
                                {it}
                            </span>
                        </div>
                    ) : (
                        <div key={"value: " + it}>
                            <span
                                className={styles.unselectedEl}
                                onClick={() => updateFilters(it, "add")}
                            >
                                {it}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    //////////////////////////////
    // RENDERING
    //////////////////////////////
    return (
        <>
            {error ? (
                <Error error={error} styles={null} />
            ) : renderReady ? (
                renderValues(allNationalities.map((el) => el.name))
            ) : (
                "Loading"
            )}
        </>
    );
}
