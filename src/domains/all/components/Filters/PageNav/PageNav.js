import styles from "@/src/domains/all/components/Filters/PageNav/PageNav.module.css";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function PageNav({ totalCount, goToPage, step, selectedPage }) {
    if (totalCount) {
        const options = [...Array(Math.ceil(totalCount / step))].map(
            (value, i) => (
                <option key={i} value={i + 1}>
                    {i + 1}
                </option>
            )
        );
        const totalPages = options.length;

        return (
            <div className={styles.wrap}>
                <Button
                    size="mini"
                    type="button"
                    label="-1"
                    customStyles={customStyles}
                    onClick={
                        (e) => goToPage(selectedPage - 1, "page") // passo page perché potrebbe servirmi x cookies in futuro
                    }
                    disabled={selectedPage <= 1}
                />

                <select
                    name="page"
                    id="Page"
                    onChange={(e) => goToPage(Number(e.target.value), "page")}
                    value={selectedPage}
                >
                    {options}
                </select>
                <Button
                    size="mini"
                    type="button"
                    label="+1"
                    customStyles={customStyles}
                    onClick={
                        (e) => goToPage(selectedPage + 1, "page") // passo page perché potrebbe servirmi x cookies in futuro
                    }
                    disabled={selectedPage === totalPages}
                />
            </div>
        );
    }
}
