// import componentStyles from "@/src/domains/_app/components/Inputs/InputSocials/InputSocials.module.css";
// import inputsStyles from "@/src/domains/_app/components/Inputs/Inputs.module.css";
// let styles = { ...inputsStyles, ...componentStyles };

export default function SocialElement({ name, deleteElement }) {
    return (
        <>
            <input
                type="text"
                name={`${name}`}
                // id={id}
                value={name}
                readOnly
            />
            <button
                type="button"
                onClick={() => deleteElement()}
                className="button-standard"
            >
                X
            </button>
        </>
    );
}
