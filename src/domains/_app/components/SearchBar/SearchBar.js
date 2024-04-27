import styles from "./SearchBar.module.css";

export default function SearchBar({
    searchBar,
    setSearchBar,
    handleFocus,
    handleBlur,
}) {
    return (
        <div id={styles.Searchbar}>
            <input
                type="text"
                placeholder="Search something..."
                value={searchBar}
                onChange={setSearchBar}
                onFocus={handleFocus}
                onBlur={handleBlur}
            ></input>
            <button id={styles.SearchBtn} className="button-standard">
                SEARCH
            </button>
        </div>
    );
}
