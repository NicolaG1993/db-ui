import componentStyles from "@/src/domains/_app/components/Inputs/InputText/InputText.module.css";
import inputsStyles from "@/src/domains/_app/components/Inputs/Inputs.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
let styles = { ...inputsStyles, ...componentStyles };

export default function InputText({
    name,
    id,
    value,
    onChange,
    onBlur,
    onFocus,
    error,
    isMandatory,
    placeholder,
}) {
    return (
        <>
            <div
                className={`${
                    error ? styles["input-error"] : styles["input-ready"]
                } ${styles["input-wrap"]} ${styles["wrap-common-styles"]}`}
            >
                <input
                    type="text"
                    name={name}
                    id={id}
                    maxLength="244"
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

            {error && <ErrorMessage error={error} />}
        </>
    );
}
