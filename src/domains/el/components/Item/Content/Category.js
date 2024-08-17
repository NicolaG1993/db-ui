import styles from "@/src/application/styles/Element.module.css";
import Link from "next/link";
import Image from "next/image";
// import Form from "@/src/domains/_app/components/Form/components/Form";
import RelationsList from "@/src/domains/el/components/RelationsList/RelationsList";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import InfiteScrollingWrap from "../InfiteScrollingWrap";

export default function Category({
    label,
    item,
    handleDelete,
    // handleEdits,
    // openForm,
    setFormIsOpen,
}) {
    // let { pic, id, rating, nameType, actors, movies, type } = item;
    let { id, createdAt, name, pic, type, totalMovies, actors, nameType } =
        item;
    console.log("item: ", item);

    return (
        <div id={styles.Category} className={styles.elWrap}>
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
                    {/* <h1>{item[nameType]}</h1>
                    <div className={styles.elRow}>
                        <span>Rating: </span>
                        {rating ? <p>{rating}</p> : <p>Unrated</p>}
                    </div> */}
                </div>
            </div>

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>INFO</h3>
                </div>

                <div className={styles.elRow}>
                    <span>Type: </span>
                    <p>{type ? type : "N/A"}</p>
                </div>

                <div className={styles.elRow}>
                    <span>Tot. Movies: </span>
                    <p>{totalMovies}</p>
                </div>

                <div className={styles.elRow}>
                    <span>Tot. Actors: </span>
                    <p>{actors?.length}</p>
                </div>

                <div className={styles.elRowToScroll}>
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
                </div>
            </div>

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
                {/* <RelationsList
                    itemName={item[nameType]}
                    itemId={item.id}
                    itemLabel={label}
                    nameType={nameType}
                    // data={movies}
                    relationsLabel={"movie"}
                    relationsGroup={"movies"}
                /> */}
            </div>

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>ACTIONS</h3>
                </div>

                <div className={styles.buttonsWrap}>
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
    );
}
