import { useEffect, useState } from "react";
import styles from "./HomeSearchBar.module.css";
import getSearch from "../../_app/actions/getSearch";
import { SearchBar } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import { useRouter } from "next/router";

export default function HomeSearchbar() {
    //================================================================================
    // Component State
    //================================================================================
    const [searchBar, setSearchBar] = useState();
    const [selectedOption, setSelectedOption] = useState("movie");
    const [searchResults, setSearchResults] = useState();
    const router = useRouter();

    //================================================================================
    // Search Bar Functions
    //================================================================================
    const handleSearchBar = (str) => {
        setSearchBar(str);
    };
    const handleSelect = (str) => {
        setSelectedOption(str);
    };
    const handleClick = (id) => {
        if (selectedOption && id) {
            router.push(`/el/${selectedOption}/${id}`);
        }
    };

    const fetchSearch = async () => {
        const { data, error } = await getSearch({
            str: searchBar,
            group: selectedOption,
        });
        setSearchResults(data);
        if (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        searchBar && selectedOption && fetchSearch();
    }, [searchBar]);

    useEffect(() => {
        setSearchBar();
        setSearchResults();
    }, [selectedOption]);

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <div className={styles.homesearchbarwrap}>
            <SearchBar
                version="input-select-table"
                value={searchBar}
                onChange={handleSearchBar}
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                onSelect={handleSelect}
                onClick={handleClick}
                options={[
                    { value: "movie", name: "Movie", label: "Movie" },
                    { value: "actor", name: "Actor", label: "Actor" },
                    { value: "studio", name: "Studio", label: "Studio" },
                ]}
                selectedOption={selectedOption}
                dropdownResults={searchResults}
                customStyles={customStyles}
            />
        </div>
    );
}
