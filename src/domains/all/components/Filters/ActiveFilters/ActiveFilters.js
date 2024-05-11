import { useEffect, useState } from "react";
import ErrorUI from "@/src/domains/_app/components/Error/components/ErrorUI/ErrorUI";
import standardStyles from "../InputsSelector/InputsSelector.module.css";

export default function ActiveFilters(props) {
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
        if (props.onChange && typeof props.onChange !== "function") {
            setError("Error: onChange is not a function");
        } else if (props.onChange) {
            // console.log("unpdating parent! 🐠🐟🐟🐠", filters);
            props.onChange({ val: filters, topic: props.topic });
        }
    }, [filters]);

    //////////////////////////////
    // DATA HANDLERS & RENDERING
    //////////////////////////////
    return (
        <>
            {error ? (
                <ErrorUI error={error} styles={null} />
            ) : (
                <div className={styles.categoryDropdown}>
                    {filters &&
                        filters.map((el) => (
                            <div key={"selected " + el.id}>
                                <span
                                    className={styles.selectedEl}
                                    onClick={() =>
                                        setFilters([
                                            ...filters.filter(
                                                (x) => x.id !== el.id
                                            ),
                                        ])
                                    }
                                >
                                    {el.name}
                                </span>
                            </div>
                        ))}
                </div>
            )}
        </>
    );
}
