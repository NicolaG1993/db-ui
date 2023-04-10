import styles from "@/styles/Element.module.css";
import Link from "next/link";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import { formatDateEU } from "@/utils/convertTimestamp";
import RecordsCounter from "../RecordsCounter";
import RelationsList from "../../RelationsList/RelationsList";

export default function Actor({
    label,
    item,
    itemInfos,
    parsedObj,
    handleDelete,
    handleEdits,
    openForm,
    setOpenForm,
}) {
    console.log("itemInfos: ", itemInfos);
    let {
        pic,
        id,
        rating,
        nameType,
        urls,
        actors,
        release,
        studios,
        distributions,
    } = item;

    return (
        <div id={styles.Movie} className={styles.elWrap}>
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
                        <span>Rating: </span>
                        {rating ? <p>{rating}</p> : <p>Unrated</p>}
                    </div>
                </div>
            </div>

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>INFO</h3>
                </div>

                <div className={styles.elRow}>
                    <span>Links: </span>
                    <div className={styles.tagsWrap}>
                        {urls && urls.length ? (
                            urls.map((el, i) => (
                                <div
                                    key={"url" + el.id}
                                    className={styles.linkEl}
                                >
                                    <a
                                        key={"url" + i}
                                        href={el}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <p>{el}</p>
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p>N/A</p>
                        )}
                    </div>
                </div>

                <div className={styles.elRow}>
                    <span>Release: </span>
                    <p>{release ? formatDateEU(release) : "N/A"}</p>
                </div>

                <div className={styles.elRow}>
                    <span>Studio: </span>
                    <div className={styles.tagsWrap}>
                        {studios && studios.length ? (
                            studios.map((el) => (
                                <div
                                    key={"studio" + el.id}
                                    className={styles.tagEl}
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
                        {distributions && distributions.length ? (
                            distributions.map((el) => (
                                <div
                                    key={"distribution" + el.id}
                                    className={styles.tagEl}
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

                <div className={styles.elRowToScroll}>
                    <span>Categories: </span>
                    {/* <div className={styles.tagsWrap}>
                                {item.categories && item.categories.length ? (
                                    item.categories.map((el) => (
                                        <div
                                            key={"category" + el.id}
                                            className={styles.tagEl}
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
                                                            href={`/category/${el.id}`}
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

                <div className={styles.elRow}>
                    <span>Tot. Actors: </span>
                    <p>{actors.length}</p>
                </div>
            </div>

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>CAST</h3>

                    {actors.length > 0 && (
                        <Link href="/search">see all ({actors.length})</Link>
                    )}
                </div>

                {actors ? (
                    <RelationsList
                        itemName={item[nameType]}
                        data={actors}
                        listLabel={"actor"} // fare dinamici ? no perche custom component
                        listGroup={"actors"}
                    />
                ) : (
                    <p>N/A</p>
                )}
            </div>

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>ACTIONS</h3>
                </div>

                <div className={styles.buttonsWrap}>
                    <button onClick={() => setOpenForm(true)}>Modify</button>
                    <button onClick={() => handleDelete(id)}>Delete</button>
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
