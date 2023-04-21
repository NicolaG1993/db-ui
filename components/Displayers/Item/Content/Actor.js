import styles from "@/styles/Element.module.css";
import Link from "next/link";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import { formatDateEU, getAge } from "@/utils/convertTimestamp";
import RelationsList from "../../RelationsList/RelationsList";
import { detectImage } from "@/utils/custom/customParsers";

export default function Actor({
    label,
    group,
    item,
    itemInfos,
    parsedObj,
    handleDelete,
    handleEdits,
    openForm,
    setOpenForm,
}) {
    // console.log("itemInfos: ", itemInfos);
    let { pic, rating, movies, nameType } = item;
    return (
        <div id={styles.Actor} className={styles.elWrap}>
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
                    <div className={styles.elRow}>
                        <span>Rating: </span>
                        {rating ? <p>{rating}</p> : <p>Unrated</p>}
                    </div>
                </div>
            </div>

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>PERSONAL INFO</h3>
                </div>

                <div className={styles.elRow}>
                    <span>Birthday: </span>
                    <p>{item.birthday ? formatDateEU(item.birthday) : "N/A"}</p>
                </div>

                <div className={styles.elRow}>
                    <span>Age: </span>
                    <p>{getAge(item.birthday)} y.o.</p>
                </div>

                <div className={styles.elRow}>
                    <span>Genre: </span>
                    {item.genre ? <p>{item.genre}</p> : <p>N/A</p>}
                </div>

                <div className={styles.elRow}>
                    <span>Nationality: </span>
                    <div className={styles.tagsWrap}>
                        {item.nationalities ? (
                            item.nationalities.map((el) => (
                                <div
                                    key={"nationality" + el}
                                    className={styles.tagElSmall}
                                >
                                    <Link href={`/nationality/${el}`}>
                                        {el}
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>N/A</p>
                        )}
                    </div>
                </div>

                {/* <div className={styles.elRow}>
                    <span>Height: </span>
                    <p>{"?"} cm</p>
                </div>

                <div className={styles.elRow}>
                    <span>Weight: </span>
                    <p>{"?"} cm</p>
                </div>

                <div className={styles.elRow}>
                    <span>Breast size: </span>
                    <p>{"?"} cm</p>
                </div>

                <div className={styles.elRow}>
                    <span>Reach size: </span>
                    <p>{"?"} cm</p>
                </div>

                <div className={styles.elRow}>
                    <span>Shoe size: </span>
                    <p>{"?"}</p>
                </div> */}

                <div className={styles.elRow}>
                    <span>Hair: </span>
                    <div className={styles.tagsWrap}>
                        {itemInfos && itemInfos.Hair ? (
                            itemInfos.Hair.map((el) => (
                                <div
                                    key={"hair " + el.id}
                                    className={styles.tagElSmall}
                                >
                                    <Link href={`/tag/${el.id}`}>
                                        {el.name}
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>N/A</p>
                        )}
                    </div>
                </div>

                <div className={styles.elRow}>
                    <span>Eyes color: </span>
                    <p>{"?"}</p>
                </div>

                <div className={styles.elRow}>
                    <span>Ethnicity: </span>
                    <div className={styles.tagsWrap}>
                        {itemInfos && itemInfos.Ethnicity ? (
                            itemInfos.Ethnicity.map((el) => (
                                <div
                                    key={"ethnicity " + el.id}
                                    className={styles.tagElSmall}
                                >
                                    <Link href={`/tag/${el.id}`}>
                                        {el.name}
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>N/A</p>
                        )}
                    </div>
                </div>

                <div className={styles.elRow}>
                    <span>Body type: </span>
                    <div className={styles.tagsWrap}>
                        {itemInfos && itemInfos["Body Types"] ? (
                            itemInfos["Body Types"].map((el) => (
                                <div
                                    key={"bodyType " + el.id}
                                    className={styles.tagElSmall}
                                >
                                    <Link href={`/tag/${el.id}`}>
                                        {el.name}
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
                    <h3>MISC. INFO</h3>
                </div>

                <div className={styles.elRowToScroll}>
                    <span>Tags: </span>
                    <div className={styles.tagLabelsWrap}>
                        {parsedObj.tags ? (
                            Object.entries(parsedObj.tags)
                                .sort()
                                .map(([key, arr], i) => {
                                    return (
                                        <div key={key}>
                                            <div className={styles.tagLabel}>
                                                {key}
                                            </div>
                                            <div>
                                                {arr.map((el) => (
                                                    <div
                                                        key={"tag" + el.id}
                                                        className={styles.tagEl}
                                                    >
                                                        <Link
                                                            href={`/el/tag/${el.id}`}
                                                        >
                                                            {el.name}
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            <p>N/A</p>
                        )}
                    </div>
                </div>

                <div className={styles.elRowToScroll}>
                    <span>Categories: </span>
                    {/* <div className={styles.tagsWrap}>
                                {item.categories && item.categories.length ? (
                                    item.categories.map((el) => (
                                        <div
                                            key={"category" + el.id}
                                            className={styles.tagElSmall}
                                        >
                                            <Link href={`/category/${el.id}`}>
                                                {el.name}
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>N/A</p>
                                )}
                            </div> */}

                    <div className={styles.tagLabelsWrap}>
                        {parsedObj.categories ? (
                            Object.entries(parsedObj.categories)
                                .sort()
                                .map(([key, arr], i) => {
                                    return (
                                        <div key={key}>
                                            <div className={styles.tagLabel}>
                                                {key}
                                            </div>
                                            <div>
                                                {arr.map((el) => (
                                                    <div
                                                        key={"category" + el.id}
                                                        className={styles.tagEl}
                                                    >
                                                        <Link
                                                            href={`/el/category/${el.id}`}
                                                        >
                                                            {el.name}
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            <p>N/A</p>
                        )}
                    </div>
                </div>

                <div className={styles.elRow}>
                    <span>Studios: </span>
                    <div className={styles.tagsWrap}>
                        {item.studios && item.studios.length ? (
                            item.studios.map((el) => (
                                <div
                                    key={"studio" + el.id}
                                    className={styles.tagElSmall}
                                >
                                    <Link href={`/el/studio/${el.id}`}>
                                        {el.name}
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>N/A</p>
                        )}
                    </div>
                </div>

                <div className={styles.elRow}>
                    <span>Distribution: </span>
                    <div className={styles.tagsWrap}>
                        {item.distributions && item.distributions.length ? (
                            item.distributions.map((el) => (
                                <div
                                    key={"distribution" + el.id}
                                    className={styles.tagElSmall}
                                >
                                    <Link href={`/el/distribution/${el.id}`}>
                                        {el.name}
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>N/A</p>
                        )}
                    </div>
                </div>

                <div className={styles.elRow}>
                    <span>Tot. Clips: </span>
                    <p>{movies.length}</p>
                </div>
            </div>

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>MOVIES</h3>

                    {movies.length > 0 && (
                        <Link href="/search">see all ({movies.length})</Link>
                    )}
                </div>

                {movies ? (
                    <RelationsList
                        itemName={item[nameType]}
                        data={movies}
                        listLabel={"movie"} // fare dinamici ? no perche custom component
                        listGroup={"movies"}
                    />
                ) : (
                    <p>N/A</p>
                )}

                {/* <div className={styles.moviesWrap}>
                    {item.movies ? (
                        <div className={styles.grid}>
                            {item.movies.map((el) => (
                                <Link
                                    key={"movie" + el.id}
                                    href={`/el/movie/${el.id}`}
                                >
                                    <div id={styles.Clip}>
                                        <div
                                            style={{
                                                position: "relative",
                                            }}
                                        >
                                            <Image
                                                src={
                                                    el.pic
                                                        ? el.pic
                                                        : "/no-image.png"
                                                }
                                                alt={el.title}
                                                fill
                                                style={{
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <div>
                                                <h5>{el.title}</h5>
                                                <p className={styles.subtitle}>
                                                    {el.cast &&
                                                        el.cast.map(
                                                            (item, i) => (
                                                                <span
                                                                    key={
                                                                        item.movieid
                                                                    }
                                                                >
                                                                    {i > 0 &&
                                                                        ", "}
                                                                    {item.name}
                                                                </span>
                                                            )
                                                        )}
                                                </p>
                                            </div>
                                            <p className={styles.rating}>
                                                {el.rating
                                                    ? el.rating
                                                    : "unrated"}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p>N/A</p>
                    )}
                </div> */}
            </div>

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>ACTIONS</h3>
                </div>

                <div className={styles.buttonsWrap}>
                    <button onClick={() => setOpenForm(true)}>Modify</button>
                    <button onClick={() => handleDelete(item.id)}>
                        Delete
                    </button>
                </div>
            </div>

            {openForm && (
                <div id={"Overlay"}>
                    <div className={"overlayWindow"}>
                        <div className={"topBar"}>
                            <span onClick={() => setOpenForm(false)}>X</span>
                        </div>

                        <Form
                            topicLabel={label}
                            propsData={item}
                            handleEditsInParent={handleEdits}
                            setOpenForm={setOpenForm}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

/**
 * Bisogna fare in modo che UI sia dinamica (es. attore != movie != studio)
 * si puo fare come per in Form
 * si puo fare come esistono 3 presets (1x attore, 1x movie, 1x altro) e vengono scelti in base a label
 */
