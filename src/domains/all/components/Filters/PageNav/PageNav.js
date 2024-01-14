import styles from "@/src/domains/all/components/Filters/PageNav/PageNav.module.css";
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

        console.log({ totalCount, totalPages, goToPage, step, selectedPage });
        return (
            <div className={styles.wrap}>
                <button
                    onClick={
                        (e) => goToPage(selectedPage - 1, "page") // passo page perché potrebbe servirmi x cookies in futuro
                    }
                    disabled={selectedPage <= 1}
                >
                    -1
                </button>
                <select
                    name="page"
                    id="Page"
                    onChange={(e) => goToPage(Number(e.target.value), "page")}
                    value={selectedPage}
                >
                    {options}
                </select>
                <button
                    onClick={(e) => goToPage(selectedPage + 1, "page")}
                    disabled={selectedPage === totalPages}
                >
                    +1
                </button>
            </div>
        );
    }
}
