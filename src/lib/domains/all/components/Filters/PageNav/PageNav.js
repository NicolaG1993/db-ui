export default function PageNav({ displayData, goToPage, step, selectedPage }) {
    if (displayData) {
        return (
            <div>
                <span>Page: </span>
                <select
                    name="page"
                    id="Page"
                    onChange={
                        (e) => goToPage(e.target.value, "page") // passo page perché potrebbe servirmi x cookies in futuro
                    }
                    value={selectedPage}
                >
                    {[...Array(Math.ceil(displayData.length / step))].map(
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
