import styles from "@/src/application/styles/Element.module.css";
import Link from "next/link";
import Image from "next/image";
import Form from "@/src/domains/_app/components/Form/components/Form";
import RelationsList from "@/src/domains/el/components/RelationsList/RelationsList";
import Modal from "@/src/domains/_app/components/Modal/Modal";

export default function Studio({
    label,
    item,
    handleDelete,
    // handleEdits,
    // openForm,
    setFormIsOpen,
}) {
    let {
        pic,
        id,
        // rating,
        nameType,
        actors,
        website,
        nationalities,
        totalMovies,
    } = item;

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
                    <h1>{item[nameType]}</h1>
                    <div className={styles.elRow}>
                        {/* <span>Rating: </span>
                        {rating ? <p>{rating}</p> : <p>Unrated</p>} */}
                    </div>
                </div>
            </div>

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>INFO</h3>
                </div>

                <div className={styles.elRow}>
                    <span>Website: </span>
                    <p>
                        {website ? (
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {website}
                            </a>
                        ) : (
                            "N/A"
                        )}
                    </p>
                </div>

                <div className={styles.elRow}>
                    <span>Nationality: </span>
                    <div className={styles.tagsWrap}>
                        {nationalities ? (
                            nationalities.map((el) => (
                                <div
                                    key={"nationality " + el}
                                    className={styles.tagEl}
                                >
                                    <Link href={`/el/nationality/${el}`}>
                                        {el}
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>N/A</p>
                        )}
                    </div>
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
                                    key={"actor " + el.id}
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

                <RelationsList
                    itemName={item[nameType]}
                    itemId={item.id}
                    itemLabel={label}
                    nameType={nameType}
                    relationsLabel={"movie"}
                    relationsGroup={"movies"}
                />
            </div>

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>ACTIONS</h3>
                </div>

                <div className={styles.buttonsWrap}>
                    <button
                        onClick={() => setFormIsOpen(true, item)}
                        className="button-standard"
                    >
                        Modify
                    </button>
                    <button
                        onClick={() => handleDelete(id)}
                        className="button-danger"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* <Modal isOpen={openForm} onClose={() => setFormIsOpen(false)}>
                <Form
                    formLabel={label}
                    propsData={item}
                    handleEditsInParent={handleEdits}
                />
            </Modal> */}
        </div>
    );
}
