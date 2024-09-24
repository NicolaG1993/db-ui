import styles from "@/src/application/styles/Element.module.css";
import Link from "next/link";
import Image from "next/image";
import {
    detectImage,
    parseTagsForUiList,
} from "@/src/domains/_app/utils/parsers";
import { formatDateEU, getAge } from "@/src/application/utils/convertTimestamp";
import extractItemInfo from "@/src/domains/el/utils/extractItemInfo";
import { Button, ItemRow } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import InfiteScrollingWrap from "../InfiteScrollingWrap";

/*
Form "open" and "close" should be handled in redux

on close:
- we need to clean up the form and cookie - for edit
- clear the form after saving it in cookies - for new#

on open:
- load propsData - for edit
- load cookies state if exist - for new

DEVO FORSE RIVEDERE DIFFERENZE FRA DUE FORMS?

NB. che setFormIsOpen ha due logiche abbastanza diverse fra new e edit. Si puó migliorare secondo me.
*/

export default function Actor({
    label,
    group,
    item,
    // itemInfos,
    // parsedObj,
    handleDelete,
    // handleEdits,
    // openForm,
    setFormIsOpen,
}) {
    let {
        id,
        pic,
        rating,
        // movies,
        nameType,
        twitter,
        instagram,
        moreUrls,
        birthday,
        genre,
        tags,
        categories,
        studios,
        distributions,
        nationalities,
        totalMovies,
    } = item;

    const itemInfo = extractItemInfo(tags || []);

    let {} = itemInfo;

    return (
        <div id={styles.Actor} className={styles.elWrap}>
            <div className={styles.infosBlock}>
                <div className={styles.infoWrap}>
                    <div className={styles.picWrap}>
                        <Image
                            src={pic ? pic : detectImage(item)}
                            alt={item[nameType]}
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>

                    <div className={styles.underPicWrap}>
                        <h1>{item[nameType]}</h1>
                        <ItemRow
                            label={"Rating"}
                            value={rating ? rating : "Unrated"}
                            customStyles={customStyles}
                        />
                    </div>
                </div>

                <div className={styles.infoWrap}>
                    <div className={styles.infoHeadingWrap}>
                        <h3>PERSONAL INFO</h3>
                    </div>
                    <ItemRow
                        label={"Birthday"}
                        value={birthday && formatDateEU(birthday)}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Age"}
                        value={birthday && `${getAge(birthday)} y.o.`}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Genre"}
                        value={genre}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Nationality"}
                        group={"nationalities"}
                        values={nationalities}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Hair"}
                        group={"tag"}
                        arr={itemInfo?.Hair}
                        customStyles={customStyles}
                    />
                    <ItemRow label={"Eyes color"} customStyles={customStyles} />
                    {/* TODO 🧠 */}
                    <ItemRow
                        label={"Ethnicity"}
                        group={"tag"}
                        arr={itemInfo?.Ethnicity}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Body type"}
                        group={"tag"}
                        arr={itemInfo?.["Body Types"]}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Social"}
                        socials={{ instagram, twitter }}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Links"}
                        urls={moreUrls}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles.infoWrap}>
                    <div className={styles.infoHeadingWrap}>
                        <h3>MISC. INFO</h3>
                    </div>

                    <ItemRow
                        label={"Tags"}
                        parsedData={() => parseTagsForUiList(tags)}
                        group={"tag"}
                        customStyles={customStyles}
                    />

                    <ItemRow
                        label={"Categories"}
                        parsedData={() => parseTagsForUiList(categories)}
                        group={"category"}
                        customStyles={customStyles}
                    />

                    <ItemRow
                        label={"Studios"}
                        arr={studios}
                        group={"studio"}
                        customStyles={customStyles}
                    />

                    <ItemRow
                        label={"Distribution"}
                        arr={distributions}
                        group={"distribution"}
                        customStyles={customStyles}
                    />

                    <ItemRow
                        label={"Tot. Clips"}
                        value={totalMovies}
                        customStyles={customStyles}
                    />
                </div>

                <div className={styles.infoWrap}>
                    <div className={styles.infoHeadingWrap}>
                        <h3>ACTIONS</h3>
                    </div>

                    <div className={styles.itemButtonsWrap}>
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
                            colorScheme="danger"
                            customStyles={customStyles}
                            onClick={() => handleDelete(id)}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.infosBlock}>
                <div className={styles.infoWrap}>
                    <div className={styles.infoHeadingWrap}>
                        <h3>MOVIES</h3>

                        {totalMovies > 0 && (
                            <Link href="/search">see all ({totalMovies})</Link> // 🧠 TODO: Landing page for this link - or just remove it!
                        )}
                    </div>

                    <InfiteScrollingWrap
                        itemId={id}
                        itemLabel={label}
                        relationsGroup={"movies"}
                    />
                </div>
            </div>
        </div>
    );
}

/*
 * Bisogna fare in modo che UI sia dinamica (es. attore != movie != studio)
 * si puo fare come per in Form
 * si puo fare come esistono 3 presets (1x attore, 1x movie, 1x altro) e vengono scelti in base a label
 */
