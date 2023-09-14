import SearchBar from "../../../_app/components/SearchBar/SearchBar";
import styles from "./FullListSearchBar.module.css";

export default function FullListSearchBar({
    filtersBar,
    searchBar,
    handleSearchBar,
    filtersToggle,
}) {
    return (
        <div className={styles.searchBarWrap}>
            <SearchBar searchBar={searchBar} setSearchBar={handleSearchBar} />
            <span
                onClick={() => setFiltersBar(!filtersBar)}
                className={styles.filtersToggle}
            >
                {filtersBar ? "Close" : "Filters"}
            </span>
        </div>
    );
}
