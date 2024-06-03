import styles from "@/src/domains/_app/components/Inputs/InputText/InputText.module.css";

export default function InputText({
    name,
    id,
    value,
    onChange,
    onBlur,
    onFocus,
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
                    type="text"
                    name={name}
                    id={id}
                    maxLength="244"
                    onChange={(e) => onChange(e)}
                    onBlur={(e) => onBlur(e)}
                    value={value}
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
