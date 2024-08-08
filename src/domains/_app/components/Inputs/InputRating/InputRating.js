import inputsStyles from "@/src/domains/_app/components/Inputs/Inputs.module.css";
import componentStyles from "@/src/domains/_app/components/Inputs/InputRating/InputRating.module.css";
import { ErrorMessage } from "zephyrus-components";
import customStyles from "@/src/domains/_app/components/Inputs/InputsCustomStyles.module.css";
let styles = { ...inputsStyles, ...componentStyles };

export default function InputRating({
    name,
    id,
    step,
    max,
    onChange,
    onBlur,
    value,
    placeholder,
    error,
    isMandatory,
}) {
    return (
        <>
            <div
                className={`${
                    error ? styles["input-error"] : styles["input-ready"]
                } ${styles["input-wrap"]} ${styles["wrap-common-styles"]}`}
            >
                <input
                    type="number"
                    name={name}
                    id={id}
                    max={max}
                    step={step}
                    onChange={(e) => onChange(e)}
                    onBlur={(e) => onBlur(e)}
                    value={value}
                    placeholder={placeholder}
                    // className={errors.title && "input-error"}
                ></input>
                <label>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                    {!!isMandatory && "*"}
                </label>
            </div>

            {error && (
                <ErrorMessage error={error} customStyles={customStyles} />
            )}
        </>
    );
}
