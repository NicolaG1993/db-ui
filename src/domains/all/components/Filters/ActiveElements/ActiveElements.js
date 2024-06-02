import { useEffect, useState } from "react";
import ErrorUI from "@/src/domains/_app/components/Error/components/ErrorUI/ErrorUI";
// TODO: fix this css file properly
import standardStyles from "../InputsSelector/InputsSelector.module.css";
import { useAppSelector } from "@/src/application/redux/lib/hooks";
import {
    handleSideNavError,
    selectFormSideNavError,
    selectFormSideNavSelected,
} from "@/src/application/redux/slices/formSlice";
import { shallowEqual, useDispatch } from "react-redux";

export default function ActiveElements({
    selected,
    onChange,
    topic,
    userStyles,
}) {
    console.log("ActiveElements START", {
        selected,
        topic,
    });

    const dispatch = useDispatch();
    const error = useAppSelector(selectFormSideNavError, shallowEqual);
    // const selected = useAppSelector(selectFormSideNavSelected, shallowEqual);
    //////////////////////////////
    // STATE
    //////////////////////////////
    // const [error, setError] = useState();
    const [activeElements, setActiveElements] = useState([]);
    let styles = userStyles || standardStyles;

    useEffect(() => {
        // maybe not needed in PROD 🧠 i think i can easily remove this
        console.log("ActiveElements renders", {
            selected,
            activeElements,
            // topic,
        });
        let error;
        if (!selected) {
            error = "Error: arr is missing";
        } else if (!Array.isArray(selected)) {
            error = "Error: arr is not an array";
        }

        if (error) {
            console.log("ERROR: ", error);
            dispatch(handleSideNavError({ error }));
        }
    }, []);

    useEffect(() => {
        selected && setActiveElements(selected);
    }, [selected]);
    /* 
    useEffect(() => {
        if (onChange && typeof onChange !== "function") {
            setError("Error: onChange is not a function");
        } else if (onChange) {
            // console.log("unpdating parent! 🐠🐟🐟🐠", activeElements);
            onChange({ val: activeElements, userAction: "remove", topic: topic });
        }
    }, [activeElements]);
*/
    const removeActiveElement = (element) => {
        console.log("🧠 element: ", element);
        if (onChange && typeof onChange !== "function") {
            setError("Error: onChange is not a function");
        } else if (onChange) {
            // setActiveElements(newArr); // forse nn serve 🧠
            // console.log("unpdating parent! 🐠🐟🐟🐠", activeElements);
            onChange({ val: element, userAction: "remove" });
        }
    };

    //////////////////////////////
    // DATA HANDLERS & RENDERING
    //////////////////////////////

    // 🔴 REMOVE ONCLICK is NOT WORKING! 🔴
    return (
        <>
            {error ? (
                <ErrorUI error={error} styles={null} />
            ) : (
                <div className={styles.categoryDropdown}>
                    {selected &&
                        selected.map((el, i) =>
                            topic === "nationalities" ? (
                                <div key={"activeElement " + el}>
                                    <span
                                        className={styles.selectedEl}
                                        onClick={() => removeActiveElement(el)}
                                    >
                                        {el}
                                    </span>
                                </div>
                            ) : (
                                <div key={"activeElement " + el.id}>
                                    <span
                                        className={styles.selectedEl}
                                        onClick={() => removeActiveElement(el)}
                                        // onClick={() => {
                                        //     handleDeselectElement([
                                        //         ...activeElements.filter(
                                        //             (x) => x.id !== el.id
                                        //         ),
                                        //     ]);
                                        // }}
                                        // onClick={() =>
                                        //     setActiveElements([
                                        //         ...activeElements.filter(
                                        //             (x) => x.id !== el.id
                                        //         ),
                                        //     ])
                                        // }
                                    >
                                        {el.name}
                                    </span>
                                </div>
                            )
                        )}
                </div>
            )}
        </>
    );
}
