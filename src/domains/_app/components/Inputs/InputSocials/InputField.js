export default function InputField({
    onChange,
    filteredOptions,
    newSocialUrl,
    newSocialType,
    styles,
    placeholder,
}) {
    return (
        <>
            <input
                type="text"
                name="newSocialUrl"
                id="NewSocialUrl"
                maxLength="50"
                value={newSocialUrl ? newSocialUrl : ""}
                onChange={(e) => onChange(e.target.value, "url")}
                placeholder={placeholder}
            />
            <select
                name="newSocialType"
                id="NewSocialType"
                value={newSocialType}
                onChange={(e) => onChange(e.target.value, "type")}
            >
                {filteredOptions.map((el) => (
                    <option value={el.value} key={"option: " + el.value}>
                        {el.name}
                    </option>
                ))}
            </select>
        </>
    );
}
