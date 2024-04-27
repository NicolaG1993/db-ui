import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "@/src/application/styles/Element.module.css";
import dataStructureItems from "@/src/application/settings/dataStructureItems";
import { parseTagsForUiList } from "@/src/domains/_app/utils/parsers";
import Head from "next/head";
import fetchItem from "../../actions/fetchItem";
import {
    selectItemStore,
    selectSelectedItem,
    selectItemIsLoaded,
    selectItem,
    activateLoadingItem,
} from "@/src/application/redux/slices/itemSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import deleteItem from "../../actions/deleteItem";
import ItemSkeleton from "./ItemSkeleton";

export default function Item({ label }) {
    //================================================================================
    // Item Store State
    //================================================================================
    let selectedItem = useSelector(selectSelectedItem);
    // let itemStore = useSelector(selectItemStore, shallowEqual);
    let itemIsLoaded = useSelector(selectItemIsLoaded, shallowEqual);

    //================================================================================
    // Component State
    //================================================================================

    const structure = dataStructureItems[label];
    let { ItemComponent, group } = structure;

    const [item, setItem] = useState();
    const [itemInfos, setItemInfos] = useState();
    const [parsedObj, setParsedObj] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    const router = useRouter();
    const { id } = router.query;

    //================================================================================
    // Actions
    //================================================================================
    const dispatch = useDispatch();

    //================================================================================
    // Functions
    //================================================================================
    const extractItemInfos = (item) => {
        let tagsObj = {};
        item.tags.map((tag) => {
            if (tagsObj[tag.type]) {
                tagsObj[tag.type].push(tag);
            } else {
                tagsObj[tag.type] = [tag];
            }
        });
        let finalObj = {};
        // forse questo non serve, posso modificare tagsObj, ma per ora lo faccio cosi - xk not 100% sure 🧠
        Object.entries(tagsObj).map(([key, value]) => {
            finalObj[key] = value && value.length ? value : null;
        });
        setItemInfos(finalObj);
    };

    const handleEdits = async () => {
        const fetchedItem = await fetchData(id, label, structure);
        dispatch(selectItem(fetchedItem));
    };

    //================================================================================
    // API Requests
    //================================================================================
    const fetchData = useCallback(async (id, label, structure) => {
        const fetchedItem = await fetchItem(id, label, structure);
        delete fetchedItem.ItemComponent;
        return fetchedItem;
    }, []);

    const handleDelete = async () => {
        dispatch(activateLoadingItem());
        let res = await deleteItem(item.id, label);
        if (res) {
            dispatch(selectItem(undefined));
            router.push(`/all/${group}`);
        }
    };

    //================================================================================
    // UseEffects
    //================================================================================
    useEffect(() => {
        async function fetch() {
            if (id) {
                const fetchedItem = await fetchData(id, label, structure);
                dispatch(selectItem(fetchedItem));
            }
        }
        fetch();
    }, [id, label, structure, fetchData, dispatch]);

    useEffect(() => {
        setItem(selectedItem);
    }, [selectedItem]);

    useEffect(() => {
        if (item) {
            if (item.tags && item.tags.length) {
                setParsedObj((obj) => ({
                    ...obj,
                    tags: parseTagsForUiList(item.tags),
                }));

                // invoke here setState for itemInfos to render in UI - best place to do it!
                extractItemInfos(item);
            }
            if (item.categories && item.categories.length) {
                setParsedObj((obj) => ({
                    ...obj,
                    categories: parseTagsForUiList(item.categories),
                }));
            }
        } // mancano casi? 🧠
        else {
            setItemInfos({});
        }
    }, [item]);

    //================================================================================
    // Render UI
    //================================================================================

    return (
        <main id={"ElMain"} className={styles.main}>
            {item && itemIsLoaded ? (
                <>
                    <Head>
                        <title>{item.name || item.title}</title>
                        <meta property="og:type" content="website" />
                        <meta
                            property="og:title"
                            content={item.name || item.title}
                        />
                    </Head>

                    {ItemComponent && (
                        <ItemComponent
                            label={label}
                            group={group}
                            item={item}
                            itemInfos={itemInfos}
                            parsedObj={parsedObj}
                            handleDelete={handleDelete}
                            handleEdits={handleEdits}
                            openForm={openForm}
                            setOpenForm={setOpenForm}
                        />
                    )}
                </>
            ) : (
                <ItemSkeleton />
            )}
        </main>
    );
}
