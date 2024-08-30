import styles from "@/src/application/styles/Element.module.css";
import Link from "next/link";
import Image from "next/image";
import { formatDateEU } from "@/src/application/utils/convertTimestamp";
import RecordsCounter from "../RecordsCounter";
import SessionPlaylistAddBtn from "../SessionPlaylistAddBtn";
import { parseTagsForUiList } from "@/src/domains/_app/utils/parsers";
import { Button, ItemRow } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import InfiteScrollingWrap from "../InfiteScrollingWrap";
import { useRouter } from "next/router";

export default function Movie({
    label,
    item,
    // itemInfos,
    // parsedObj,
    handleDelete,
    // handleEdits,
    // openForm,
    setFormIsOpen,
}) {
    let {
        pic,
        id,
        rating,
        nameType,
        urls,
        // actors,
        release,
        studios,
        distributions,
        tags,
        categories,
        totalActors,
    } = item;

    const router = useRouter();
    const handleRouting = (url) => {
        router.push(url);
    }; // 🧠 Should move to Item component and pass as prop (?)

    return (
        <div id={styles.Movie} className={styles.elWrap}>
            <div className={styles.infosBlock}>
                <div className={styles.infoWrap}>
                    <div className={styles.picWrap}>
                        <Image
                            src={pic ? pic : "/no-image.png"}
                            alt={item[nameType]}
                            style={{ objectFit: "cover" }}
                            fill
                        />
                    </div>

                    <div className={styles.underPicWrap}>
                        <h1>{item[nameType]}</h1>
                        <div className={styles.elRow}>
                            {/* 🔴 elRow should not be here */}
                            <ItemRow
                                label={"Rating"}
                                value={rating ? rating : "Unrated"}
                                customStyles={customStyles}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.infoWrap}>
                    <div className={styles.infoHeadingWrap}>
                        <h3>INFO</h3>
                    </div>

                    <ItemRow
                        label={"Links"}
                        urls={urls}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Release"}
                        value={release ? formatDateEU(release) : "N/A"}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Studio"}
                        arr={studios}
                        group={"studio"}
                        onClick={handleRouting}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Distribution"}
                        arr={distributions}
                        group={"distribution"}
                        onClick={handleRouting}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Categories"}
                        parsedData={parseTagsForUiList(categories)}
                        group={"category"}
                        onClick={handleRouting}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Tags"}
                        parsedData={parseTagsForUiList(tags)}
                        group={"tag"}
                        onClick={handleRouting}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Tot. Actors"}
                        value={totalActors}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles.infoWrap}>
                    <div className={styles.infoHeadingWrap}>
                        <h3>ACTIONS</h3>
                    </div>

                    <div className={styles.itemButtonsWrap}>
                        <SessionPlaylistAddBtn
                            el={{
                                id: item.id,
                                title: item.title,
                                pic: item.pic,
                                actors: item.actors, // but we dont have actors here! // inside Card yes 🔴🧠🔴⚠️🧠🔴⚠️
                            }}
                        />
                        <Button
                            size="medium"
                            type="button"
                            label="Modify"
                            customStyles={customStyles}
                            onClick={() => setFormIsOpen(true, item)}
                        />
                        <Button
                            size="medium"
                            type="button"
                            label="Delete"
                            customStyles={customStyles}
                            onClick={() => handleDelete(id)}
                            colorScheme="danger"
                        />
                    </div>
                </div>

                <div className={styles.infoWrap}>
                    <div className={styles.infoHeadingWrap}>
                        <h3>RECORDS</h3>
                    </div>

                    <div className={styles.recordsRow}>
                        <RecordsCounter id={id} />
                    </div>
                </div>
            </div>

            <div className={styles.infosBlock}>
                <div className={styles.infoWrap}>
                    <div className={styles.infoHeadingWrap}>
                        <h3>CAST</h3>

                        {totalActors > 0 && (
                            <Link href="/search">see all ({totalActors})</Link>
                        )}
                    </div>

                    <InfiteScrollingWrap
                        itemId={id}
                        itemLabel={label}
                        relationsGroup={"actors"}
                    />
                </div>
            </div>
        </div>
    );
}
