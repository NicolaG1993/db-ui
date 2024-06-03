import componentStyles from "@/src/domains/_app/components/Inputs/InputDate/InputDate.module.css";
import inputsStyles from "@/src/domains/_app/components/Inputs/Inputs.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
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
                } ${styles["input-wrap"]}`}
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

            {error && <ErrorMessage error={error} />}
        </>
    );
}
