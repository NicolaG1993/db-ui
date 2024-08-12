import styles from "./SearchBarSmall.module.css";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import { Button } from "zephyrus-components";

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
                value={searchBar || ""}
                onChange={setSearchBar}
                onFocus={handleFocus}
                onBlur={handleBlur}
            ></input>
            <Button
                size="small"
                onClick={(e) => handleClear(e)}
                type="button"
                label="Clear"
                customStyles={customStyles}
            />
        </div>
    );
}
