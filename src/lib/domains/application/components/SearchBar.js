import styles from "./SearchBar.module.css";

export default function SearchBar({
    searchBar,
    setSearchBar,
    handleFocus,
    handleBlur,
}) {
    return (
        <div className={styles.searchbar}>
            <input
                type="text"
                placeholder="Search something..."
                value={searchBar}
                onChange={setSearchBar}
                onFocus={handleFocus}
                onBlur={handleBlur}
            ></input>
            <button>SEARCH</button>
        </div>
    );
}
