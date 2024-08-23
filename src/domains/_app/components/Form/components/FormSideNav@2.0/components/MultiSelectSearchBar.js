import { useEffect, useState } from "react";
import { Button, SearchBar } from "zephyrus-components";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function FormSideNavSearchBar({
    topic,
    data,
    value,
    onChange,
    // onClear,
}) {
    const [searchBar, setSearchBar] = useState(value);

    const handleSearchBar = (str) => {
        str !== searchBar && setSearchBar(str);
    };

    const clearSearchBar = () => {
        setSearchBar("");
    };
    // const handleFocus = (e) => {
    //     //
    // };
    // const handleBlur = (e) => {
    //     //
    // };

    useEffect(() => {
        onChange(searchBar);
    }, [searchBar]);

    useEffect(() => {
        setSearchBar();
    }, [data]);

    useEffect(() => {
        !topic && clearSearchBar();
    }, [topic]);

    return (
        <div className={styles.formSideNavSearchBar}>
            <SearchBar
                version="input-only"
                value={searchBar}
                onChange={handleSearchBar}
                customStyles={customStyles}
            />
            <Button
                size="small"
                onClick={clearSearchBar}
                type="button"
                label="Clear"
                customStyles={customStyles}
            />
        </div>
    );
}
