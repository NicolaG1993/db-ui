import { useState } from "react";
import styles from "@/src/application/styles/AdminDashboard.module.css";

// FIX: Questo component é salvato nel domain "all" ma viene usato anche in forms to create and edit
// quindi va o spostato nel domain "_app" o duplicato, forse anche gli altri component in questo directory

export default function InputToArray({
    topic,
    topicID,
    formState,
    setFormState,
    propData,
}) {
    const [newInput, setNewInput] = useState();
    // const [data, setData] = useState(formState[topic]);

    // SUBMIT NEW INPUT TO STATE
    const handleAddInputToArray = () => {
        console.log("💚💚💚 handleAddInputToArray activated: ", newInput);
        // setData([...data, newInput]);
        if (newInput) {
            setFormState([...formState[topic], newInput], topic);
            setNewInput("");
        }
    };

    // REMOVE INPUT FROM STATE
    const handleRemoveSelectedInput = (i) => {
        setFormState(
            formState[topic].filter((el, index) => index !== i),
            topic
        );
    };

    return (
        <>
            <div className={styles["form-col-right"]}>
                <div className={styles["input-and-btn-wrap"]}>
                    <input
                        type="text"
                        name={topic}
                        id={`${topicID}New`}
                        value={newInput ? newInput : ""}
                        onChange={(e) => setNewInput(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => handleAddInputToArray()}
                        className="button-standard"
                    >
                        Add
                    </button>
                </div>
            </div>

            {formState[topic] &&
                formState[topic].map((el, i) => (
                    <div className={styles["form-col-right"]} key={el + i}>
                        <div className={styles["input-and-btn-wrap"]}>
                            <input
                                type="text"
                                name={`${topic} ${i + 1}`}
                                id={topicID}
                                value={el}
                                readOnly
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveSelectedInput(i)}
                                className={styles["form-input-sub-btn"]}
                                className="button-standard"
                            >
                                X
                            </button>
                        </div>
                    </div>
                ))}
        </>
    );
}
