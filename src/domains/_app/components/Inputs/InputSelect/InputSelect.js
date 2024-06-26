import componentStyles from "@/src/domains/_app/components/Inputs/InputSelect/InputSelect.module.css";
import inputsStyles from "@/src/domains/_app/components/Inputs/Inputs.module.css";
let styles = { ...inputsStyles, ...componentStyles };
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function InputSelect({
    name,
    id,
    options,
    value,
    onChange,
    multipleSelection,
    includeParents,
    placeholder,
    isMandatory,
    error,
}) {
    return (
        <>
            <div
                className={`${
                    error ? styles["input-error"] : styles["input-ready"]
                } ${styles["input-wrap"]} ${styles["wrap-common-styles"]}`}
            >
                <select
                    name={name}
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e)}
                >
                    {options.map((opt) => (
                        <option
                            key={opt.value + " " + opt.name}
                            value={opt.value}
                        >
                            {opt.name}
                        </option>
                    ))}
                </select>
                <label>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                    {!!isMandatory && "*"}
                </label>
            </div>

            {error && <ErrorMessage error={error} />}
        </>
    );
}
