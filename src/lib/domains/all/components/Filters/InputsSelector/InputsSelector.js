import { useEffect, useState } from "react";
import Error from "@/src/lib/domains/_app/components/Error/Error";
import standardStyles from "./InputsSelector.module.css";

export default function InputsSelector(props) {
    //////////////////////////////
    // STATE
    //////////////////////////////
    console.log("*Rendering *InputsSelector* ", props);
    const [error, setError] = useState();
    const [renderReady, setRenderReady] = useState(false);
    const [filters, setFilters] = useState(props.filters || []);
    let styles = props.styles || standardStyles;

    useEffect(() => {
        if (!props.arr) {
            setError("Error: props.arr is missing");
        } else if (!Array.isArray(props.arr)) {
            setError("Error: props.arr is not an array");
        } else if (props.filters && !Array.isArray(props.filters)) {
            setError("Error: props.filters is not an array");
        } else {
            setRenderReady(true);
        }
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
                {array.map((it) => {
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
        <div className={styles.wrapper}>
            {error ? (
                <Error error={error} styles={null} />
            ) : renderReady ? (
                renderValues(props.arr)
            ) : (
                "Loading"
            )}
        </div>
    );
}
