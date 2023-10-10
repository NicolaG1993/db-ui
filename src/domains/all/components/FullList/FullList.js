import { useEffect, useState } from "react";

import styles from "./FullList.module.css";
import dataStructureGroups from "@/src/application/settings/dataStructureGroups";

import FiltersBar from "../Filters/Filters";
import { fetchDataForFilter } from "@/src/domains/_app/actions/customFetchers";
import { getError } from "@/src/application/utils/error";

import FullListHeading from "./FullListHeading";
import FullListSearchBar from "./FullListSearchBar";
import FullListDisplayer from "./FullListDisplayer";
import fetchAllData from "../../actions/fetchAllData";
import fetchFilteredData from "../../actions/fetchFilteredData";

export default function FullList({ tableName }) {
    //================================================================================
    // Component State
    //================================================================================
    let table = dataStructureGroups[tableName];

    const [displayData, setDisplayData] = useState();
    const [order, setOrder] = useState(table.defaultOrder);
    const [searchBar, setSearchBar] = useState("");
    const [filters, setFilters] = useState({});
    const [filtersBar, setFiltersBar] = useState();
    const [selectedPage, setSelectedPage] = useState(1);
    const [step, setStep] = useState(30);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    //================================================================================
    // API calls
    //================================================================================
    const getFirstData = async ({
        url,
        searchBar,
        selectedPage,
        step,
        order,
    }) => {
        setIsLoading(true);
        try {
            const params = {
                str: searchBar,
                page: selectedPage,
                step: step,
                order: order,
            };
            const data = await fetchAllData(url, params);
            setDisplayData(data);
        } catch (err) {
            console.log("ERROR!", getError(err)); // TODO: proper error message in UI
            setIsError(getError(err));
        } finally {
            setIsLoading(false);
        }
    };

    const getFilteredData = async ({
        url,
        searchBar,
        filters,
        selectedPage,
        step,
        order,
    }) => {
        setIsLoading(true);
        try {
            const params = {
                str: searchBar,
                filters: JSON.stringify(filters),
                page: selectedPage,
                step: step,
                order: order,
            };
            const data = await fetchFilteredData(url, params);
            setDisplayData(data);
        } catch (err) {
            console.log("ERROR!", getError(err)); // TODO: proper error message in UI
            setIsError(getError(err));
        } finally {
            setIsLoading(false);
        }
    };
    //================================================================================
    // UseEffects
    //================================================================================
    const activateSearch = () => {
        setIsError();
        if (Object.keys(filters).length > 0) {
            getFilteredData({
                url: table.APIfetchSearch,
                searchBar,
                filters,
                selectedPage,
                step,
                order,
            });
        } else {
            getFirstData({
                url: table.APIfetchAll,
                searchBar,
                selectedPage,
                step,
                order,
            });
        }
    };

    useEffect(() => {
        selectedPage === 1 ? activateSearch() : setSelectedPage(1);
        // !important : if value is 1 already it will not update, so WE need to activateSearch
    }, [searchBar, filters]);

    useEffect(() => {
        activateSearch();
    }, [selectedPage, step, order]);

    useEffect(() => {
        if (displayData && displayData.length) {
            // full_count is stored inside every row
            const val = displayData[0].full_count;
            setTotalCount(Number(val));
        } else {
            setTotalCount(0);
        }
    }, [displayData]);

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

    const toggleFiltersBar = () => {
        setFiltersBar(!filtersBar);
    };

    const updateFilters = (val, topic) => {
        if (filters[topic]) {
            setFilters({
                ...filters,
                [topic]: val,
            });
        } else if (val && val.length) {
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
                toggleFilters={toggleFiltersBar}
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

            {isError ? (
                <div>{isError}</div>
            ) : (
                <FullListDisplayer
                    table={table}
                    tableName={tableName}
                    displayData={displayData}
                    goToPage={goToPage}
                    step={step}
                    selectedPage={selectedPage}
                    order={order}
                    totalCount={totalCount}
                    handleSelect={handleSelect}
                    isLoading={isLoading || !displayData}
                />
            )}
        </main>
    );
}
