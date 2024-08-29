import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
// import axios from "axios";
import styles from "@/src/application/styles/Element.module.css";
import dataStructureItems from "@/src/application/settings/dataStructureItems";
// import { parseTagsForUiList } from "@/src/domains/_app/utils/parsers";
import Head from "next/head";
import fetchItem from "@/src/domains/el/actions/fetchItem";
import {
    // selectItemStore,
    selectSelectedItem,
    selectItemIsLoaded,
    selectItem,
    activateLoadingItem,
    // setStoreError,
    selectItemIsLoading,
    selectItemIsChanged,
} from "@/src/application/redux/slices/itemSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import deleteItem from "@/src/domains/el/actions/deleteItem";
import ItemSkeleton from "@/src/domains/el/components/Item/ItemSkeleton";
// import { getError } from "@/src/application/utils/error";
import { useErrorBoundary } from "react-error-boundary";
import {
    closeForm,
    openForm,
    resetFormStore,
} from "@/src/application/redux/slices/formSlice";

export default function Item({ label }) {
    //================================================================================
    // Item Store State
    //================================================================================
    let selectedItem = useSelector(selectSelectedItem);
    // let itemStore = useSelector(selectItemStore, shallowEqual);
    let itemIsLoaded = useSelector(selectItemIsLoaded, shallowEqual);
    let itemIsLoading = useSelector(selectItemIsLoading, shallowEqual);
    let itemIsChanged = useSelector(selectItemIsChanged, shallowEqual);

    //================================================================================
    // Component State
    //================================================================================

    const structure = dataStructureItems[label];
    let { ItemComponent, group } = structure;

    const [item, setItem] = useState();
    // const [itemInfos, setItemInfos] = useState();
    // const [parsedObj, setParsedObj] = useState(false);

    // const [openForm, setOpenForm] = useState(false);

    // should i save errors in store instead?
    // and have a special overlay for it?
    // const [apiError, setApiError] = useState();

    //================================================================================
    // Hooks
    //================================================================================
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { showBoundary } = useErrorBoundary();

    //================================================================================
    // Functions
    //================================================================================
    /*
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
    */

    const openEditForm = ({ propsData, formLabel }) => {
        dispatch(resetFormStore());
        // setAddNewModal(true);
        dispatch(openForm({ propsData, formLabel })); // open Form UI
    };
    const closeEditForm = () => {
        // setAddNewModal(false);
        dispatch(closeForm());
    };

    const handleItemReload = async () => {
        const fetchedItem = await fetchData(id, label, structure);
        dispatch(selectItem(fetchedItem));
        // closeEditForm();
    };

    const handleEditForm = (bool, propsData) => {
        if (bool) {
            // dispatch(loadNewActiveForm(arg)); // dispatch new form con props data here!
            // dispatch(resetFormStore()); // or just reset it! EZ
            openEditForm({ propsData, formLabel: label });
        } else {
            //  dispatch(resetFormStore()); // we should do this on opening new forms
            closeEditForm();
        }
    };

    //================================================================================
    // API Requests
    //================================================================================

    const fetchData = useCallback(async (id, label, structure) => {
        // Correct error handling here // Work in progress...
        // Apply to all App after finishing 🧠
        const res = await fetchItem(id, label, structure);
        if (res.status === 200 && res.data) {
            return res.data;
        } else if (res.error) {
            showBoundary({
                code: res.status,
                message: res.message,
            });
        }
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
        if (itemIsChanged) {
            handleItemReload();
        }
    }, [itemIsChanged]);

    useEffect(() => {
        // console.log("ITEM: ", item);
        /*
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
        */
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
                            // itemInfos={itemInfos}
                            // parsedObj={parsedObj}
                            handleDelete={handleDelete}
                            // handleEdits={handleEdits}
                            // openForm={} // isFormOpen // no need: delete
                            // setOpenForm={handleEditForm}
                            setFormIsOpen={handleEditForm}
                        />
                    )}
                </>
            ) : (
                <ItemSkeleton />
            )}
        </main>
    );
}
