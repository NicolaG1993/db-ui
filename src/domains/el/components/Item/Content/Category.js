import styles from "@/src/application/styles/Element.module.css";
import Link from "next/link";
import Image from "next/image";
import { Button, ItemRow } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import InfiteScrollingWrap from "../InfiteScrollingWrap";

export default function Category({
    label,
    item,
    handleDelete,

    setFormIsOpen,
}) {
    let { id, createdAt, name, pic, type, totalMovies, actors, nameType } =
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

                    <div className={styles.underPicWrap}></div>
                </div>

                <div className={styles.infoWrap}>
                    <div className={styles.infoHeadingWrap}>
                        <h3>INFO</h3>
                    </div>

                    <ItemRow
                        label={"Type"}
                        value={type ? type : "N/A"}
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

                    <ItemRow
                        label={"Actors"}
                        arr={actors}
                        tagType={"complex"}
                        customStyles={customStyles}
                    />
                    {/* <div className={styles.elRowToScroll}>
                        <span>Actors: </span>
                        <div className={styles.tagsWrap}>
                            {actors ? (
                                actors.map((el) => (
                                    <div
                                        key={"actor" + el.id}
                                        className={styles.tagElWithInfo}
                                    >
                                        <Link href={`/el/actor/${el.id}`}>
                                            <p>{el.name}</p>
                                        </Link>
                                        {" | "}
                                        <Link href={`/search`}>
                                            <p>{el.count}</p>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>N/A</p>
                            )}
                        </div>
                    </div> */}
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
