import componentStyles from "@/src/domains/_app/components/Inputs/InputDate/InputDate.module.css";
import inputsStyles from "@/src/domains/_app/components/Inputs/Inputs.module.css";
import { ErrorMessage } from "zephyrus-components";
import customStyles from "@/src/domains/_app/components/Inputs/InputsCustomStyles.module.css";
let styles = { ...inputsStyles, ...componentStyles };

export default function InputDate({
    name,
    id,
    value,
    onChange,
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
                    type="date"
                    name={name}
                    id={id}
                    onChange={(e) => onChange(e)}
                    value={value}
                />
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
