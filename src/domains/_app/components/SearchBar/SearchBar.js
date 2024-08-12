import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
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
            <Button
                size="medium"
                onClick={clearResults}
                type="button"
                label="SEARCH"
                customStyles={customStyles}
                // id={styles.SearchBtn}
            />
        </div>
    );
}
