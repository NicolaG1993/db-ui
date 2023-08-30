import axios from "axios";
import { useEffect, useState } from "react";

import SearchBar from "../../application/components/SearchBar";
import styles from "./HomeSearchBar.module.css";
import SearchBarResults from "../../application/components/SearchBarResults";
import getSearch from "../../application/hooks/getSearch";

export default function HomeSearchbar() {
    //================================================================================
    // Component State
    //================================================================================
    const [searchBar, setSearchBar] = useState();
    const [searchResults, setSearchResults] = useState(null);
    const [resultsUI, setResultsUI] = useState(false);

    let labelA = "actor";
    let labelB = "movie";

    //================================================================================
    // Search Bar Functions
    //================================================================================
    const handleSearchBar = (e) => {
        setSearchBar(e.target.value);
    };

    const handleFocus = (e) => {
        setResultsUI(true);
    };

    const handleBlur = (e) => {
        setTimeout(() => {
            setResultsUI(false);
        }, 200);
    };

    const fetchSearch = async () => {
        const { data, error } = await getSearch(searchBar);
        setSearchResults(data);
        if (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSearch();
    }, [searchBar]);

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <div className={styles.homesearchbarwrap}>
            <SearchBar
                searchBar={searchBar}
                setSearchBar={handleSearchBar}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
            />
            {searchBar && resultsUI ? (
                <SearchBarResults
                    searchResults={searchResults}
                    labelA={labelA}
                    labelB={labelB}
                />
            ) : (
                <></>
            )}
        </div>
    );
}
