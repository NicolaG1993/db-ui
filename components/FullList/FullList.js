import { useEffect, useState } from "react";
import axios from "axios";

import styles from "@/styles/Displayers.module.css";
import { orderData, parseOrderOptions } from "@/utils/custom/customParsers";
import dataStructureGroups from "@/utils/custom/dataStructureGroups";

import FiltersBar from "@/components/Filters/Filters";
import FullListContent from "./FullListContent";
import { fetchDataForFilter } from "@/utils/custom/customFetches";
import { getError } from "@/utils/error";
import PageNav from "@/components/Filters/PageNav/PageNav";
import SearchBar from "@/src/lib/domains/application/components/SearchBar";

export default function FullList({ tableName }) {
    //================================================================================
    // Component State
    //================================================================================
    let table = dataStructureGroups[tableName];

    // const [allData, setAllData] = useState();
    const [displayData, setDisplayData] = useState();
    const [order, setOrder] = useState(table.defaultOrder);
    const [searchBar, setSearchBar] = useState("");
    const [filters, setFilters] = useState({});
    const [filtersBar, setFiltersBar] = useState();
    const [selectedPage, setSelectedPage] = useState(1);
    const [step, setStep] = useState(30);

    //================================================================================
    // UseEffects
    //================================================================================
    useEffect(() => {
        fetchAllData();
    }, []);

    useEffect(() => {
        if (displayData && order) {
            const response = orderData(displayData, order);
            setDisplayData([...response]);
        }
    }, [order]);

    useEffect(() => {
        setSelectedPage(1);
        if (searchBar || Object.keys(filters).length > 0) {
            fetchFilteredData();
        }
    }, [searchBar, filters]);

    //================================================================================
    // API
    //================================================================================
    const fetchAllData = async () => {
        try {
            const { data } = await axios.get(table.APIfetchAll);
            console.log("💚💚💚 fetchAllData: ", data);
            // setAllData(data);
            setDisplayData(data);
        } catch (err) {
            console.log("ERROR!", getError(err));
        }
    };

    const fetchFilteredData = async () => {
        console.log("fetchFilteredData: ", searchBar, filters);
        try {
            const { data } = await axios.get(table.APIfetchSearch, {
                params: {
                    str: searchBar,
                    filters: filters,
                },
            });
            console.log("💚💚💚 fetchFilteredData: ", data);
            const response = orderData(data, order);
            setDisplayData(response);
        } catch (err) {
            console.log("ERROR!", getError(err));
        }
    };

    //================================================================================
    // Filters
    //================================================================================
    const goToPage = (val) => setSelectedPage(val);

    const handleSearchBar = (e) => {
        e.preventDefault();
        setSearchBar(e.target.value);
    };

    const handleSelect = (e) => {
        e.preventDefault();
        setOrder(e.target.value);
    };

    const updateFilters = (val, topic) => {
        if (filters[topic]) {
            setFilters({
                ...filters,
                [topic]: val,
            });
        } else {
            // if filters[topic] doesnt exist, create it
            setFilters({ ...filters, [topic]: val });
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main className={styles.fullList}>
            <div className={styles.headings}>
                <h1>ALL {tableName}</h1>
            </div>

            <div className={styles.searchBarWrap}>
                <SearchBar
                    searchBar={searchBar}
                    setSearchBar={handleSearchBar}
                />
                <span
                    onClick={() => setFiltersBar(!filtersBar)}
                    className={styles.filtersToggle}
                >
                    {filtersBar ? "Close" : "Filters"}
                </span>
            </div>

            {filtersBar && (
                <FiltersBar
                    filters={filters}
                    updateFilters={updateFilters}
                    closeFilters={setFiltersBar}
                    deleteAllFilters={setFilters}
                    allLabels={["tags", "nationalities"]}
                    fetchData={fetchDataForFilter}
                />
            )}

            <div className={styles.display}>
                <div className={styles.displayHeading}>
                    <div>
                        <h4>{tableName}</h4>
                        <span>
                            {displayData ? displayData.length : 0} results
                        </span>
                    </div>

                    <PageNav
                        displayData={displayData}
                        goToPage={goToPage}
                        step={step}
                        selectedPage={selectedPage}
                    />

                    <select
                        name="order"
                        id="Order"
                        onChange={(e) => handleSelect(e)}
                        value={order}
                    >
                        {parseOrderOptions(table.orders)}
                    </select>
                </div>

                <div className={styles.fullListGrid}>
                    <FullListContent
                        data={
                            displayData &&
                            displayData.slice(
                                selectedPage * step - step,
                                selectedPage * step
                            )
                        }
                        table={table}
                    />
                </div>

                <div>
                    <PageNav
                        displayData={displayData}
                        goToPage={goToPage}
                        step={step}
                        selectedPage={selectedPage}
                    />
                </div>
            </div>
        </main>
    );
}
