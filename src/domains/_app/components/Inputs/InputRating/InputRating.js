import styles from "@/src/domains/_app/components/Inputs/InputRating/InputRating.module.css";

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
                } ${styles["input-wrap"]}`}
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

            {/* CREA COMPONENT X ERROR 🧠👇 */}
            {error && (
                <div className={styles["form-error"]}>{"• " + error}</div>
            )}
        </>
    );
}
