import TestComponent from "@/src/lib/domains/_test/components/TestComponent";
import { useEffect, useState } from "react";

export default function Test() {
    const [formState, setFormState] = useState({ name: "" });

    const updateState = (str, tag) => {
        console.log("updateState activated:", str);
        setFormState({ ...formState, [tag]: str });
    };

    useEffect(() => {
        console.log("formState changed:", formState);
    }, [formState]);

    return (
        <main>
            <h1>Test Area</h1>
            <TestComponent formState={formState} updateState={updateState} />
        </main>
    );
}
