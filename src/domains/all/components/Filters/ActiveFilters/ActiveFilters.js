import { useEffect, useState } from "react";
import Error from "@/src/domains/_app/components/Error/Error";
import standardStyles from "../InputsSelector/InputsSelector.module.css";

export default function ActiveFilters(props) {
    console.log("*Rendering *ActiveFilters* ", props);
    //////////////////////////////
    // STATE
    //////////////////////////////
    const [error, setError] = useState();
    const [filters, setFilters] = useState(props.arr);
    let styles = props.styles || standardStyles;

    useEffect(() => {
        // console.log("ActiveFilters renders", filters);
        // if (!props.arr) {
        //     setError("Error: props.arr is missing");
        // } else if (!Array.isArray(props.arr)) {
        //     setError("Error: props.arr is not an array");
        // } else {
        //     setError();
        // }
    }, []);

    useEffect(() => {
        props.arr && setFilters(props.arr);
    }, [props.arr]);

    useEffect(() => {
        if (
            props.handleChildState &&
            typeof props.handleChildState !== "function"
        ) {
            setError("Error: handleChildState is not a function");
        } else if (props.handleChildState) {
            // console.log("unpdating parent! 🐠🐟🐟🐠", filters);
            props.handleChildState(filters, props.topic);
        }
    }, [filters]);

    //////////////////////////////
    // DATA HANDLERS & RENDERING
    //////////////////////////////
    return (
        <>
            {error ? (
                <Error error={error} styles={null} />
            ) : (
                <div className={styles.categoryDropdown}>
                    {filters &&
                        filters.map((el) => (
                            <div key={"selected " + el}>
                                <span
                                    className={styles.selectedEl}
                                    onClick={() =>
                                        setFilters([
                                            ...filters.filter((x) => x !== el),
                                        ])
                                    }
                                >
                                    {el}
                                </span>
                            </div>
                        ))}
                </div>
            )}
        </>
    );
}
