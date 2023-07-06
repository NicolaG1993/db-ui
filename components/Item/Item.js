import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "@/styles/Element.module.css";
import dataStructureItems from "@/utils/custom/dataStructureItems";
import { parseTagsForUiList } from "@/utils/custom/customParsers";
import Head from "next/head";

export default function Item({ label }) {
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

    console.log("💚 item!", item);
    //================================================================================
    // UseEffects
    //================================================================================
    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

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

    const handleEdits = () => {
        fetchData();
    };

    //================================================================================
    // API Requests
    //================================================================================
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`/api/${label}/${id}`);
            setItem({ ...data, ...structure });
        } catch (err) {
            console.log("ERROR!", err);
        }
    };

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/delete`, {
                headers: {},
                data: { id: item.id, table: label },
            });
            router.push(`/all/${group}`);
        } catch (err) {
            console.log("ERROR in delete!", err);
        }
    };

    //================================================================================
    // Render UI
    //================================================================================

    return (
        <main id={"ElMain"} className={styles.main}>
            {item ? (
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
                <p>Loading...</p>
            )}
        </main>
    );
}
