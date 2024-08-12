import styles from "./RelationsList.module.css";
import dataStructureGroups from "@/src/application/settings/dataStructureGroups";
import Card from "@/src/domains/_app/components/Card/Card";
import { useEffect, useState, useRef } from "react";
import fetchRelationsPage from "@/src/domains/el/actions/fetchRelationsPage";
import dataStructureItems from "@/src/application/settings/dataStructureItems";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function RelationsList({
    itemName,
    itemId,
    itemLabel,
    nameType,
    relationsLabel,
    relationsGroup,
}) {
    let table = dataStructureGroups[relationsGroup];

    let [data, setData] = useState([]);
    let [filters, setFilters] = useState({
        page: 1,
        order: dataStructureItems[relationsLabel].nameType, // "name" || "title"
        direction: "asc",
    });
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const scrollContainerRef = useRef(null);

    // console.log("🟡⚠️🟡⚠️⭐ RelationsList: ", {
    //     itemName,
    //     itemId,
    //     itemLabel,
    //     // relationsLabel,
    //     relationsGroup,
    //     table,
    //     nameType,
    // });

    /*
    useEffect(() => {
        const res = loadPage({ relationsGroup, filters }); // async 🔴
        setData(res);
    }, []);
    */

    /*
    TODO:
        🟡 API request here on load (pag.1)
        🟡 API request on scrolling bottom (if possible)
           🟡 Need row component (Mercanis style) o event listener
        🟡 Store data (inside component for now)
        🟡 Loading animation
        🧠 BE
            Fix old API (we dont need movies anymore in the item request - but the info yes! like categories, tot movies, ...)
            Create new api for movie page
    */

    const loadMoreData = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        const newData = await fetchRelationsPage({
            // relationsLabel,
            relationsGroup,
            itemLabel,
            itemId,
            filters,
        });

        // console.log("newData: ", newData);
        if (newData?.data?.length === 0) {
            setHasMore(false);
        } else {
            setData((prev) =>
                filters.page === 1 ? newData.data : [...prev, ...newData.data]
            );
        }
        setLoading(false);
    };

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

    // useEffect(() => {
    //     console.log("💚🏡💚🏡 data: ", data);
    // }, [data]);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        console.log("handleScroll: ", {
            scrollTop: container.scrollTop,
            clientHeight: container.clientHeight,
            scrollHeight: container.scrollHeight,
            condition:
                container.scrollTop + container.clientHeight >=
                container.scrollHeight - 2,
        });
        if (
            container.scrollTop + container.clientHeight >=
            container.scrollHeight - 2
        ) {
            // we add "- 2" to prevent block scrolling in edge cases // where "2" stays for 2px
            setFilters((prev) => ({ ...filters, page: prev.page + 1 }));
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    // Function to update filters and reset page(component)
    const updateFilters = (newFilters) => {
        setFilters({
            ...filters,
            ...newFilters,
            page: 1, // Reset page to 1 whenever filters change
        });
    };

    return (
        <div className={styles.relationList} ref={scrollContainerRef}>
            {/* <Button
                size="medium"
                type="button"
                label="Sort by Title Ascending"
                customStyles={customStyles}
                onClick={() =>
                    updateFilters({ order: "title", direction: "asc" })
                }
            />
            <Button
                size="medium"
                type="button"
                label="Sort by Title Descending"
                customStyles={customStyles}
                onClick={() =>
                    updateFilters({ order: "title", direction: "desc" })
                }
            />
            <Button
                size="medium"
                type="button"
                label="Sort by Date Ascending"
                customStyles={customStyles}
                onClick={() =>
                    updateFilters({ order: "title", direction: "desc" })
                }
            />
            <Button
                size="medium"
                type="button"
                label="Sort by Date Descending"
                customStyles={customStyles}
                onClick={() =>
                    updateFilters({ order: "date", direction: "desc" })
                }
            /> */}

            <div className={styles.relationsGrid}>
                {data?.map((el, i) => (
                    <Card
                        key={`RelationsList ${el[table.nameType]} ${i}`}
                        cardKey={`RelationsList ${el[table.nameType]} ${i}`}
                        table={table}
                        obj={el}
                    />
                ))}
                {loading && <p>Loading...</p>}
                {/* {!hasMore && <p>No more data</p>} */}
            </div>
        </div>
    );
}
