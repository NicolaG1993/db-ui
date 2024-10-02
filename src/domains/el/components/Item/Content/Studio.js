import styles from "@/src/application/styles/Element.module.css";
import Link from "next/link";
import Image from "next/image";
import { Button, ItemRow } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import InfiteScrollingWrap from "../InfiteScrollingWrap";

export default function Studio({ label, item, handleDelete, setFormIsOpen }) {
    let { pic, id, nameType, actors, website, nationalities, totalMovies } =
        item;

    return (
        <div id={styles.Category} className={styles.elWrap}>
            <div className={styles.infosBlock}>
                <div className={styles.infoWrap}>
                    <div className={styles.picWrap}>
                        <Image
                            src={pic ? pic : "/no-image.png"}
                            alt={item[nameType]}
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>

                    <div className={styles.underPicWrap}>
                        <h1>{item[nameType]}</h1>
                        <div className={styles.elRow}></div>
                        {/* 🔴 elRow should not be here */}
                    </div>
                </div>

                <div className={styles.infoWrap}>
                    <div className={styles.infoHeadingWrap}>
                        <h3>INFO</h3>
                    </div>
                    <ItemRow
                        label={"Website"}
                        urls={website ? [website] : null}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Nationality"}
                        group={"nationalities"}
                        values={nationalities}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Tot. Movies"}
                        value={totalMovies}
                        customStyles={customStyles}
                    />
                    <ItemRow
                        label={"Tot. Actors"}
                        value={actors?.length || 0}
                        customStyles={customStyles}
                    />

                    {/* TODO: New case for ItemRow component ? 👇🧠🧠🧠 */}

                    <ItemRow
                        label={"Actors"}
                        arr={actors}
                        tagType={"complex"}
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
                            customStyles={customStyles}
                            onClick={() => handleDelete(id)}
                            colorScheme="danger"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.infosBlock}>
                <div className={styles.infoWrap}>
                    <div className={styles.infoHeadingWrap}>
                        <h3>MOVIES</h3>

                        {totalMovies > 0 && (
                            <Link href="/search">see all ({totalMovies})</Link>
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
