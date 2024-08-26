import { useEffect, useState } from "react";

import styles from "./FullList.module.css";
import dataStructureGroups from "@/src/application/settings/dataStructureGroups";

// import FiltersBar from "../Filters/Filters";
// import { fetchDataForFilter } from "@/src/domains/_app/actions/customFetchers";
import { getError } from "@/src/application/utils/error";

import FullListHeading from "./FullListHeading";
import fetchAllData from "../../actions/fetchAllData";
import fetchFilteredData from "../../actions/fetchFilteredData";
import scrollToTop from "@/src/domains/_app/utils/scrollToTop";
import { Pagination, SearchBar } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import {
    addToSessionPlaylist,
    removeElementFromSessionPlaylist,
    selectSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useAppContext } from "@/src/domains/_app/contexts/AppContext";
import { useRouter } from "next/router";
import {
    activateLoadingItem,
    clearItem,
} from "@/src/application/redux/slices/itemSlice";

/*
TODO: Keep this component as wrap (handle data and declare dynamic functions here!)
*/

export default function FullList({ tableName }) {
    //================================================================================
    // Component State
    //================================================================================
    const router = useRouter();
    const dispatch = useDispatch();
    const { showTooltip, hideTooltip } = useAppContext();
    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);
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
            console.log("fetchAllData 🧑‍🏭🧠🐉: ", data);
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
    const goToPage = (val) => {
        setSelectedPage(val);
        scrollToTop();
    };

    const handleSearchBar = (str) => {
        // console.log("handleSearchBar: ", str);
        setSearchBar(str);
    };
    // const handleSearchBar = (e) => {
    //     e.preventDefault();
    //     setSearchBar(e.target.value);
    // };

    const handleSorting = (e) => {
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

    const clearPreviousItem = () => {
        dispatch(clearItem());
        dispatch(activateLoadingItem());
    };

    const onMouseOver = (title, description, e) => {
        showTooltip(title, description, e);
    };
    const onMouseOut = () => {
        hideTooltip();
    };
    const onClickCard = ({ id, label }) => {
        clearPreviousItem();
        router.push(`/el/${label}/${id}`);
    };

    const addToPlaylist = (obj) => {
        dispatch(addToSessionPlaylist(obj));
    };
    const removeFromPlaylist = (obj) => {
        dispatch(removeElementFromSessionPlaylist(obj));
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main className={styles.fullList}>
            <FullListHeading tableName={tableName} />

            <div className={styles.searchBarWrap}>
                <SearchBar
                    version="input-only"
                    value={searchBar}
                    onChange={handleSearchBar}
                    customStyles={customStyles}
                    // toggleFilters={toggleFiltersBar} // TODO? 🧠
                    // filtersBar={filtersBar} // TODO? 🧠
                />
                {/* <span
                onClick={() => toggleFilters()}
                className={styles.filtersToggle}
            >
                {filtersBar ? "Close" : "Filters"}
            </span> */}
            </div>

            {/* {filtersBar && (
                <FiltersBar
                    filters={filters}
                    updateFilters={updateFilters}
                    closeFilters={setFiltersBar}
                    deleteAllFilters={setFilters}
                    allLabels={["tags", "nationalities"]}
                    fetchData={fetchDataForFilter}
                />
            )} */}

            {isError ? (
                <div>{isError}</div>
            ) : (
                <Pagination
                    table={table}
                    // tableName={tableName}
                    displayData={displayData}
                    goToPage={goToPage}
                    step={step}
                    selectedPage={selectedPage}
                    order={order}
                    handleSorting={handleSorting}
                    totalCount={totalCount}
                    isLoading={isLoading || !displayData}
                    currentPlaylist={sessionPlaylist}
                    cardHasOverlay={table.itemGroup === "movies"} // Fix when we have overlay also for actor card 🧠
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    onClickCard={onClickCard}
                    onAddItem={addToPlaylist}
                    onRemoveItem={removeFromPlaylist}
                    customStyles={customStyles}
                />
            )}
        </main>
    );
}
