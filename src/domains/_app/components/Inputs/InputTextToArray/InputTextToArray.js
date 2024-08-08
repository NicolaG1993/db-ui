// ESTERNAL COMPONENT!
// All required data should be passed as argument!

import { useState } from "react";
import inputsStyles from "@/src/domains/_app/components/Inputs/Inputs.module.css";
import componentStyles from "@/src/domains/_app/components/Inputs/InputTextToArray/InputTextToArray.module.css";
import { ErrorMessage } from "zephyrus-components";
import customStyles from "@/src/domains/_app/components/Inputs/InputsCustomStyles.module.css";
let styles = { ...inputsStyles, ...componentStyles };
// import styles from "@/src/application/styles/AdminDashboard.module.css";

// FIX: Questo component é salvato nel domain "all" ma viene usato anche in forms to create and edit
// quindi va o spostato nel domain "_app" o duplicato, forse anche gli altri component in questo directory

export default function InputTextToArray({
    name,
    id,
    formState,
    onChange,
    // propData,
    error,
    placeholder,
    isMandatory,
}) {
    const [newInput, setNewInput] = useState();
    // const [data, setData] = useState(formState[name]);

    // SUBMIT NEW INPUT TO STATE
    const handleAddInputToArray = (newInput, formState, name) => {
        // setData([...data, newInput]);
        if (newInput) {
            onChange([newInput, ...formState[name]], name);
            setNewInput("");
        }
    };

    // REMOVE INPUT FROM STATE
    const handleRemoveSelectedInput = (i) => {
        onChange(
            formState[name].filter((el, index) => index !== i),
            name
        );
    };

    return (
        <>
            <div className={styles["extendend-input-layout"]}>
                <div
                    className={`${
                        error ? styles["input-error"] : styles["input-ready"]
                    } ${styles["input-wrap"]} ${styles["wrap-common-styles"]}`}
                >
                    <input
                        type="text"
                        name={name}
                        placeholder={placeholder}
                        id={`${id}New`}
                        value={newInput ? newInput : ""}
                        onChange={(e) => setNewInput(e.target.value)}
                        // className={errors.title && "input-error"}
                    ></input>
                    <label>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                        {!!isMandatory && "*"}
                    </label>
                </div>
                <button
                    type="button"
                    onClick={() =>
                        handleAddInputToArray(newInput, formState, name)
                    }
                    className={`button-standard ${styles["layout-button"]}`}
                >
                    Add
                </button>
            </div>

            {error && (
                <ErrorMessage error={error} customStyles={customStyles} />
            )}

            {formState[name] && !!formState[name]?.length && (
                <div className={styles["input-sub-wrap"]}>
                    {formState[name].map((el, i) => (
                        <div
                            className={styles["input-sub-wrap-row"]}
                            key={el + i}
                        >
                            {/* <div className={styles["input-and-btn-wrap"]}> */}
                            <input
                                type="text"
                                name={`${name} ${i + 1}`}
                                id={id}
                                value={el}
                                readOnly
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveSelectedInput(i)}
                                className="button-standard"
                            >
                                X
                            </button>
                            {/* </div> */}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
