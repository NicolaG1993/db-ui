import styles from "@/src/application/styles/Test.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function TestComponent({ formState, updateState }) {
    const [label, setLabel] = useState("");
    const [id, setId] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosAuthInstance.delete(`/api/delete`, {
                headers: {},
                data: { id: id, table: label },
            });
            console.log("data: ", data);
            router.push(`/`);
        } catch (err) {
            console.log("ERROR in delete!", err);
        }
    };

    return (
        <form>
            <h2>Test Component</h2>

            {/* <div className={styles["form-col-left"]}>
                <label>
                    <h4>Name</h4>
                </label>
            </div>

            <div className={styles["form-col-right"]}>
                <input
                    type="text"
                    name="name"
                    id="Name"
                    maxLength="50"
                    onChange={(e) => updateState(e.target.value, "name")}
                    // onChange={(e) => updateFormState(e.target.value, "name")}
                    // onBlur={(e) => validateData(e)}
                    value={formState.name}
                />
            </div> */}

            <h2>Remove Data</h2>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>Table</h4>
                </label>
            </div>

            <div className={styles["form-col-right"]}>
                <input
                    type="text"
                    name="label"
                    id="Label"
                    maxLength="50"
                    onChange={(e) => setLabel(e.target.value)}
                    value={label}
                />
            </div>

            <div className={styles["form-col-left"]}>
                <label>
                    <h4>ID</h4>
                </label>
            </div>
            <div className={styles["form-col-right"]}>
                <input
                    type="number"
                    name="label"
                    id="Label"
                    maxLength="50"
                    onChange={(e) => setId(Number(e.target.value))}
                    value={id}
                />
            </div>

            <Button
                size="medium"
                type="button"
                colorScheme="danger"
                label={"DELETE"}
                customStyles={customStyles}
                onClick={handleSubmit}
                disabled={true}
            />
        </form>
    );
}
