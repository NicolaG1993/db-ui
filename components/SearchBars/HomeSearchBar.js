import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

import styles from "@/styles/Searchbars.module.css";

export default function HomeSearchbar() {
    //================================================================================
    // Component State
    //================================================================================

    const [searchBar, setSearchBar] = useState();
    const [searchResults, setSearchResults] = useState(null);
    const [resultsUI, setResultsUI] = useState(false);
    const [labelA, setLabelA] = useState("actor");
    const [labelB, setLabelB] = useState("movie");

    //================================================================================
    // Search Bar Functions
    //================================================================================

    const handleSearchBar = (e) => {
        setSearchBar(e.target.value);
    };

    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(`/api/search/searchbar`, {
                params: {
                    str: searchBar,
                },
            });

            setSearchResults({
                groupA: data.groupA,
                groupB: data.groupB,
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        searchBar ? fetchSearch() : setSearchResults(null);
    }, [searchBar]);

    //================================================================================
    // Render UI
    //================================================================================

    return (
        <div className={styles.homesearchbarwrap}>
            <div className={styles.homesearchbar}>
                <input
                    type="text"
                    placeholder="Search something..."
                    onChange={handleSearchBar}
                    onFocus={() => setResultsUI(true)}
                    onBlur={() =>
                        setTimeout(() => {
                            setResultsUI(false);
                        }, 200)
                    }
                ></input>
                <button>SEARCH</button>
            </div>

            {searchBar && resultsUI ? (
                <div className={styles.resultsBox}>
                    {searchResults ? (
                        searchResults.groupA.length ||
                        searchResults.groupB.length ? (
                            <>
                                <div className={styles.resultsBlock}>
                                    <div className={styles.resultsHeading}>
                                        <span>Actors</span>
                                        <Link href={`/search`}>
                                            {`${searchResults.groupA.length} results`}
                                        </Link>
                                    </div>

                                    <div className={styles.results}>
                                        {searchResults.groupA
                                            .slice(0, 8)
                                            .map((el) => (
                                                <Link
                                                    href={`/el/${labelA}/${el.id}`}
                                                    key={
                                                        `${labelA}Search ` +
                                                        el.id
                                                    }
                                                >
                                                    {el.name}
                                                </Link>
                                            ))}
                                    </div>
                                </div>

                                <div className={styles.resultsBlock}>
                                    <div className={styles.resultsHeading}>
                                        <span>Movies</span>
                                        <Link href={`/search`}>
                                            {`${searchResults.groupB.length} results`}
                                        </Link>
                                    </div>

                                    <div className={styles.results}>
                                        {searchResults.groupB
                                            .slice(0, 8)
                                            .map((el) => (
                                                <Link
                                                    href={`/${labelB}/${el.id}`}
                                                    key={
                                                        `${labelB}Search ` +
                                                        el.id
                                                    }
                                                >
                                                    {el.title}
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>{"No results :("}</p>
                        )
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
