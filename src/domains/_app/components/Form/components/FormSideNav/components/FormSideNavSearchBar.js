import { useEffect, useState } from "react";
import SearchBarSmall from "@/src/domains/_app/components/SearchBar/SearchBarSmall.js";

export default function FormSideNavSearchBar({
    topic,
    data,
    //  searchBar,
    onChange,
    onClear,
}) {
    const [searchBar, setSearchBar] = useState("");

    const handleSearchBar = (e) => {
        console.log("👽🔥 handleSearchBar: ", {
            value: e.target.value,
            searchBar,
        });
        e.preventDefault();
        e.target.value !== searchBar && setSearchBar(e.target.value);
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
        console.log("👽🔥 searchBar changes: ", {
            searchBar,
        });
        onChange(searchBar);
    }, [searchBar, onChange]);

    useEffect(() => {
        setSearchBar();
    }, [data]);

    useEffect(() => {
        !topic && clearSearchBar();
    }, [topic]);

    return (
        <>
            <SearchBarSmall
                searchBar={searchBar}
                setSearchBar={handleSearchBar}
                //  handleFocus={handleFocus}
                //  handleBlur={handleBlur}
                clearSearchBar={clearSearchBar}
                // setSearchBar={() => onChange()}
                // clearSearchBar={() => onClear()}
            />
            {/* {openSection === "tags" && <div>Suggestions</div>} */}
        </>
    );
}
