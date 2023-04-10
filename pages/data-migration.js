import axios from "axios";
import { useEffect, useState } from "react";

// ELIMINARE!
export default function DataMigration() {
    // const [formState, setFormState] = useState();

    // const updateState = (str, tag) => {
    //     console.log("updateState activated:", str);
    //     setFormState({ ...formState, [tag]: str });
    // };

    // useEffect(() => {
    //     console.log("formState changed:", formState);
    // }, [formState]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //....
            // prendi data da local DB
            // parse per nuove tables (keys, pic urls roots, created_at)
            // ogni tabella ha bisogno di un parse personalizzato
            // inserire tabella in nuovo DB in una singola request
            //....
            const { data } = await axios.post(`/api/convert-url`, {
                table: "movie",
            });
            console.log("data: ", data);
        } catch (err) {
            console.log("ERROR in submit!", err);
        }
    };

    return (
        <main>
            <h1>Data Migration</h1>
            <button onClick={handleSubmit}>Execute</button>
        </main>
    );
}
