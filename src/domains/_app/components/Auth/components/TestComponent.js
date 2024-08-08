import defaultStyles from "./TestComponent.module.css";

export default function TestComponent({
    name,
    id,
    label,
    value,
    onChange,
    onBlur,
    // onFocus,
    error,
    disabled,
    isMandatory,
    placeholder,
    type,
    customStyles = {},
}) {
    /**
     * .input : stile base, tutti quegli stili che sono sempre attivi in qualsiasi condizione (padding, sizes, ...)
     * .input-ready : stile del component quando é attivo, senza errori e non é disabled
     * .input-error : stile del component quando c´é errore e non é disabled
     * .input-disabled : stile del component quando é disabled e non ci sono errori
     */

    const styles = customStyles
        ? { ...defaultStyles, ...customStyles }
        : defaultStyles;

    return (
        <>
            <div className={styles.inputWrap}>
                <input
                    className={`${styles.input} ${
                        error ? styles["input-error"] : ""
                    } ${disabled ? styles["input-disabled"] : ""} ${
                        !disabled && !error ? styles["input-ready"] : ""
                    }`}
                    type={type || "text"}
                    name={name}
                    id={id}
                    maxLength={244}
                    onChange={onChange}
                    onBlur={onBlur}
                    // onFocus={onFocus}
                    value={value}
                    placeholder={placeholder}
                    // disabled={disabled}
                />
                <label className={styles.label}>
                    {label
                        ? label
                        : name.charAt(0).toUpperCase() + name.slice(1)}
                    {!!isMandatory && "*"}
                </label>
            </div>
            {error && (
                // <ErrorMessage error={error} customStyles={customStyles} />
                <p>🔴 ERROR</p>
            )}
        </>
    );
}
