import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./FullListContent.module.css";
import { orderData, parseOrderOptions } from "@/utils/custom/customParsers";
import dataStructureGroups from "@/utils/custom/dataStructureGroups";

import FiltersBar from "../Filters/Filters";
import { fetchDataForFilter } from "@/utils/custom/customFetches";
import { getError } from "@/utils/error";

import FullListHeading from "./FullListHeading";
import FullListSearchBar from "./FullListSearchBar";
import FullListDisplayer from "./FullListDisplayer";

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
            <FullListHeading tableName={tableName} />

            <FullListSearchBar
                filtersBar={filtersBar}
                searchBar={searchBar}
                handleSearchBar={handleSearchBar}
            />

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

            <FullListDisplayer
                table={table}
                tableName={tableName}
                displayData={displayData}
                goToPage={goToPage}
                step={step}
                selectedPage={selectedPage}
                order={order}
                handleSelect={handleSelect}
            />
        </main>
    );
}
