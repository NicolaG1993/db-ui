// Maybe this file is not in the right directory? 🧠 check afterwards the components library is finished
import { useState, useEffect, useRef } from "react";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
    addToSessionPlaylist,
    removeElementFromSessionPlaylist,
    selectSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";
import {
    activateLoadingItem,
    clearItem,
} from "@/src/application/redux/slices/itemSlice";
import { InputSelect, RelationsList } from "zephyrus-components";
import dataStructureGroups from "@/src/application/settings/dataStructureGroups";
import { useAppContext } from "@/src/domains/_app/contexts/AppContext";
import styles from "@/src/domains/el/components/Item/InfiteScrollingWrap.module.css";
import fetchRelationsPage from "../../actions/fetchRelationsPage";

/*
NB:
itemLabel, itemId, itemGroup -> refers to the item page we are in
relationsLabel, relationsGroup -> refers to the relation we are showing in the infinite scrolling
*/

export default function InfiteScrollingWrap({
    itemId,
    itemLabel,
    relationsGroup,
}) {
    const relationsTableSettings = dataStructureGroups[relationsGroup];

    // Move from here into util? 🧠👇
    const sortingOptions = [
        {
            value: `${relationsTableSettings.nameType}-asc`,
            name: `${relationsTableSettings.nameType} ascending`,
        },
        {
            value: `${relationsTableSettings.nameType}-desc`,
            name: `${relationsTableSettings.nameType} descending`,
        },
        {
            value: "rating-asc",
            name: "Rating Ascending",
        },
        {
            value: "rating-desc",
            name: "Rating Descending",
        },
    ];

    const scrollContainerRef = useRef(null);

    let [data, setData] = useState([]);
    let [filters, setFilters] = useState({
        page: 1,
        order: relationsTableSettings.nameType, // itemSettings.nameType,
        direction: "asc",
    });
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreData = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        const newData = await fetchRelationsPage({
            // relationsLabel,
            relationsGroup,
            // itemGroup,
            itemLabel,
            itemId,
            filters,
        });

        if (newData?.data?.length === 0) {
            setHasMore(false);
        } else {
            setData((prev) =>
                filters.page === 1 ? newData.data : [...prev, ...newData.data]
            );
        }
        setLoading(false);
    };

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        // console.log("handleScroll: ", {
        //     scrollTop: container.scrollTop,
        //     clientHeight: container.clientHeight,
        //     scrollHeight: container.scrollHeight,
        //     condition:
        //         container.scrollTop + container.clientHeight >=
        //         container.scrollHeight - 2,
        // });
        if (
            container.scrollTop + container.clientHeight >=
            container.scrollHeight - 2
        ) {
            // we add "- 2" to prevent block scrolling in edge cases // where "2" stays for 2px
            setFilters((prev) => ({ ...filters, page: prev.page + 1 }));
        }
    };

    // Function to update filters and reset page(component)
    const updateFilters = (newFilters) => {
        setFilters({
            ...filters,
            ...newFilters,
            page: 1, // Reset page to 1 whenever filters change
        });
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    // Initial load and when filters change (excluding page)
    useEffect(() => {
        setData([]); // Clear the existing data
        setHasMore(true); // Reset the hasMore state
        loadMoreData();
    }, [filters.order, filters.direction]);

    // Load more data when page changes
    useEffect(() => {
        if (filters.page > 1) {
            loadMoreData(filters);
        }
    }, [filters.page]);

    /* CARD COMPONENT HANDLERS 👇 */
    const router = useRouter();
    const dispatch = useDispatch();
    const { showTooltip, hideTooltip } = useAppContext();
    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);

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

    return (
        <div className={styles.infiniteScrollingWrap}>
            <div className={styles.wrapHeading}>
                <div className={styles.sorterBox}>
                    <InputSelect
                        name="relationsListSorting"
                        id="RelationsListSorting"
                        label={"Sort by: "}
                        onChange={() =>
                            updateFilters({ order: "title", direction: "asc" })
                        }
                        options={sortingOptions}
                        // disabled={true}
                        size={"small"}
                        value={filters.order} // todo
                        customStyles={customStyles}
                    />
                </div>
            </div>

            <div className={styles.infiniteScrolling} ref={scrollContainerRef}>
                <RelationsList
                    data={data} // TODO: fetching has to be moved up here // otherwise we could create a custom wrapper for this
                    table={relationsTableSettings} // table={dataStructureGroups["movies"]}
                    hasMore={hasMore} // TODO: move up here
                    loading={loading} // TODO: move up here
                    filters={filters} // TODO: move up here // not implemented yet!
                    // onLoadMore={loadMoreData} // TODO: move up here
                    // onUpdateFilters={updateFilters} // TODO: move up here // not implemented yet!
                    cardHasOverlay={
                        relationsTableSettings.itemGroup === "movies"
                    } // TODO: info come questa possono essere messe in tableSettings 🧠🧠🧠
                    currentPlaylist={sessionPlaylist}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    onClickCard={onClickCard}
                    onAddItem={addToPlaylist}
                    onRemoveItem={removeFromPlaylist}
                    customStyles={customStyles}
                />
                {/* <div className={styles.relationsGrid}>
                 {data?.map((el, i) => (
                     <Card
                         key={`RelationsList ${el[table.nameType]} ${i}`}
                         cardKey={`RelationsList ${el[table.nameType]} ${i}`}
                         table={table}
                         obj={el}
                     />
                 ))}
                 {loading && <p>Loading...</p>}
                 {!hasMore && <p>End of the list</p>}
             </div> */}
            </div>
        </div>
    );
}

/** 🧠🧠🧠
 TODO:
 Questo dovrebbe essere InfiniteScrollingWrap ?
 quindi gestire infinite scrolling, eventListeners e fetching qua
 in RelationsList we should just display the data that we pass to it - nothing else

 We need to modify RelationsList to achieve this (it would make it simpler tho)
 */
