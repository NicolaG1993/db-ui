import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/src/application/styles/Element.module.css";
import { formatDateEU } from "@/src/application/utils/convertTimestamp";

export default function RecordsCounter({ id }) {
    const [counter, setCounter] = useState();
    const [recordsUI, setRecordsUI] = useState(false);

    useEffect(() => {
        if (id) {
            fetchCounter();
        }
    }, [id]);

    const fetchCounter = async () => {
        try {
            const { data } = await axios.get(`/api/record/${id}`);
            setCounter(data);
        } catch (err) {
            console.log("ERROR in fetchCounter!", err);
        }
    };

    const handleAddCounter = async () => {
        try {
            const { data } = await axios.post(`/api/record/new`, {
                id: id,
            });
            setCounter([...counter, data]);
        } catch (err) {
            console.log("ERROR in handleAddCounter!", err);
        }
    };

    const handleRemoveCounter = async (id) => {
        try {
            await axios.delete(`/api/delete`, {
                headers: {},
                data: { id: id, table: "counter" },
            });
            fetchCounter();
        } catch (err) {
            console.log("ERROR in delete!", err);
        }
    };

    return (
        <>
            <div>
                <span>Counter: </span>
                <span>
                    {counter
                        ? counter.length > 0
                            ? counter.length
                            : 0
                        : "Loading..."}
                </span>
                <button onClick={() => handleAddCounter()}>+1</button>
            </div>

            <div className={styles.recordsWrap}>
                <span onClick={() => setRecordsUI(!recordsUI)}>
                    {!recordsUI ? "Show all records" : "Close"}
                </span>

                {recordsUI && (
                    <div className={styles.recordsUI}>
                        {counter.map((el) => (
                            <div key={el.id} className={styles.record}>
                                <span>{formatDateEU(el.created_at)}</span>
                                <span
                                    onClick={() => handleRemoveCounter(el.id)}
                                >
                                    X
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
