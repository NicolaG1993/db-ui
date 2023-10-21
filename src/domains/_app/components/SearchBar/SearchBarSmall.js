import styles from "./SearchBarSmall.module.css";

export default function SearchBarSmall({
    searchBar,
    setSearchBar,
    handleFocus,
    handleBlur,
    clearSearchBar,
}) {
    const handleClear = (e) => {
        e.preventDefault();
        clearSearchBar();
    };

    return (
        <div className={styles.searchbar}>
            <input
                type="text"
                placeholder="Search..."
                value={searchBar}
                onChange={setSearchBar}
                onFocus={handleFocus}
                onBlur={handleBlur}
            ></input>
            <button onClick={(e) => handleClear(e)}>Clear</button>
        </div>
    );
}
