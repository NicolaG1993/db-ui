import componentStyles from "@/src/domains/_app/components/Inputs/InputFake/InputFake.module.css";
import inputsStyles from "@/src/domains/_app/components/Inputs/Inputs.module.css";
let styles = { ...inputsStyles, ...componentStyles };

export default function InputFake({ name, id, selected, onClick, error }) {
    return (
        <div className={styles["extendend-input-layout"]}>
            <div
                className={`${
                    error ? styles["input-error"] : styles["input-ready"]
                } ${styles["input-wrap"]}`}
            >
                <p>{selected} selected</p>
                <label>{id}</label>
                {/* <div onClick={() => onClick()}>Select</div> */}
            </div>
            <button
                type="button"
                onClick={() => onClick()}
                className="button-standard"
            >
                Edit
            </button>
        </div>
    );
}
