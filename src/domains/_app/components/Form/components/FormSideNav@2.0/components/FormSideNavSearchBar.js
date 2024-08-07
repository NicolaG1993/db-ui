import { useEffect, useState } from "react";
import SearchBarSmall from "@/src/domains/_app/components/SearchBar/SearchBarSmall.js";

export default function FormSideNavSearchBar({
    topic,
    data,
    value,
    onChange,
    onClear,
}) {
    const [searchBar, setSearchBar] = useState(value);

    const handleSearchBar = (e) => {
        e.preventDefault();
        e.target.value !== searchBar && setSearchBar(e.target.value);
    };

    const clearSearchBar = () => {
        console.log("clearSearchBar invoked: ⭐");
        setSearchBar("");
    };
    const handleFocus = (e) => {
        //
    };
    const handleBlur = (e) => {
        //
    };

    useEffect(() => {
        onChange(searchBar);
        console.log("searchBar changes: ⭐", searchBar);
    }, [searchBar]);

    useEffect(() => {
        setSearchBar();
    }, [data]);

    useEffect(() => {
        !topic && clearSearchBar();
    }, [topic]);

    return (
        <SearchBarSmall
            searchBar={searchBar}
            setSearchBar={handleSearchBar}
            clearSearchBar={clearSearchBar}
        />
    );
}
