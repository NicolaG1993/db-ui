import { useEffect, useState } from "react";
import SearchBarSmall from "../../../SearchBar/SearchBarSmall";

export default function FormSideNavSearchBar({
    openSection,
    data,
    handleSearch,
}) {
    const [searchBar, setSearchBar] = useState("");

    const handleSearchBar = (e) => {
        setSearchBar(e.target.value);
    };
    const clearSearchBar = () => {
        setSearchBar("");
    };
    const handleFocus = (e) => {
        //
    };
    const handleBlur = (e) => {
        //
    };

    useEffect(() => {
        // filter data in parent
        handleSearch(searchBar);
    }, [searchBar]);

    useEffect(() => {
        setSearchBar();
    }, [data]);

    useEffect(() => {
        !openSection && clearSearchBar();
    }, [openSection]);

    return (
        <>
            <SearchBarSmall
                searchBar={searchBar}
                setSearchBar={handleSearchBar}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                clearSearchBar={clearSearchBar}
            />
            {openSection === "tags" && <div>Suggestions</div>}
        </>
    );
}
