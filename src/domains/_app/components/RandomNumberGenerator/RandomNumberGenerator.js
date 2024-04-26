import { useState, useEffect } from "react";
import styles from "./RandomNumbersGenerator.module.css";

export default function RandomNumberGenerator({ open, closeWidget }) {
    const [form, setForm] = useState({
        numbers: 1,
        from: 1,
        to: 10,
        setting: "unique",
    });
    const [result, setResult] = useState([]);

    const clearResults = () => {
        setResult([]);
    };

    const handleChange = (e) => {
        e.preventDefault();
        const formObj = new FormData(e.target.form);
        let allValues = Object.fromEntries(formObj.entries());
        if (
            allValues.numbers > allValues.to - allValues.from &&
            allValues.setting === "unique"
        ) {
            allValues.numbers = allValues.to - allValues.from;
        }
        setForm({
            ...allValues,
            numbers: Number(allValues.numbers),
            from: Number(allValues.from),
            to: Number(allValues.to),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let arr = [];
        if (form.setting === "not unique") {
            for (let i = 1; i <= form.numbers; i++) {
                let randomNumber =
                    Math.floor(Math.random() * (form.to - form.from + 1)) +
                    form.from;
                arr.push(randomNumber);
            }
        } else if (form.setting === "unique") {
            while (arr.length < form.numbers) {
                let randomNumber =
                    Math.floor(Math.random() * (form.to - form.from + 1)) +
                    form.from;
                if (arr.indexOf(randomNumber) === -1) arr.push(randomNumber);
            }
        }
        setResult(arr);
    };

    return (
        <div
            id={styles["RandomNumberGenerator"]}
            className={styles["form-wrap"]}
        >
            <form
                onChange={(e) => handleChange(e)}
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className={styles["grid-column-1to2"]}>
                    <input
                        type="number"
                        id="numbers"
                        name="numbers"
                        defaultValue={form.numbers}
                        min={1}
                        max={
                            form.setting === "not unique"
                                ? 20
                                : form.to - form.from
                        }
                    />
                </div>

                <div className={styles["grid-column-2to4"]}>
                    <select
                        name="setting"
                        id="setting"
                        defaultValue={form.setting}
                    >
                        <option value="not unique" label="not unique">
                            not unique
                        </option>
                        <option value="unique" label="unique">
                            unique
                        </option>
                    </select>
                </div>

                <div className={styles["grid-column-4to5"]}>
                    <label>
                        <span>Number/s</span>
                    </label>
                </div>

                <div className={styles["grid-column-1to2"]}>
                    <label>
                        <span>from</span>
                    </label>
                </div>
                <div className={styles["grid-column-2to4"]}>
                    <input
                        type="number"
                        id="from"
                        name="from"
                        defaultValue={form.from}
                        min={0}
                        max={form.to - 1}
                    />
                </div>
                <div className={styles["grid-column-1to2"]}>
                    <label>
                        <span>to</span>
                    </label>
                </div>
                <div className={styles["grid-column-2to4"]}>
                    <input
                        type="number"
                        id="to"
                        name="to"
                        defaultValue={form.to}
                        min={form.from}
                    />
                </div>

                <div className={styles["grid-column-1to5"]}>
                    <button type="submit">Generate</button>
                </div>
            </form>

            {result.length > 0 && (
                <>
                    <div className={styles["form-results"]}>
                        <div className={styles["results-box"]}>
                            <h3>Your random numbers</h3>
                            <p>{result.map((el) => `${el} `)}</p>
                        </div>

                        <button onClick={clearResults} type="button">
                            Clear Result
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
