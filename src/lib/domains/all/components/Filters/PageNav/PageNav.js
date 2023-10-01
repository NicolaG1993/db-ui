export default function PageNav({ totalCount, goToPage, step, selectedPage }) {
    if (totalCount) {
        return (
            <div>
                <span>Page: </span>
                <select
                    name="page"
                    id="Page"
                    onChange={
                        (e) => goToPage(Number(e.target.value), "page") // passo page perché potrebbe servirmi x cookies in futuro
                    }
                    value={selectedPage}
                >
                    {[...Array(Math.ceil(totalCount / step))].map(
                        (value, i) => (
                            <option key={i} value={i + 1}>
                                {i + 1}
                            </option>
                        )
                    )}
                </select>
            </div>
        );
    }
}
