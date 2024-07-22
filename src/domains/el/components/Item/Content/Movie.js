import styles from "@/src/application/styles/Element.module.css";
import Link from "next/link";
import Image from "next/image";
import Form from "@/src/domains/_app/components/Form/components/Form";
import { formatDateEU } from "@/src/application/utils/convertTimestamp";
import RecordsCounter from "../RecordsCounter";
import RelationsList from "../../RelationsList/RelationsList";
import SessionPlaylistAddBtn from "../SessionPlaylistAddBtn";
import Modal from "@/src/domains/_app/components/Modal/Modal";
import renderLinks from "@/src/domains/el/utils/renderLinks";
import { parseTagsForUiList } from "@/src/domains/_app/utils/parsers";

export default function Movie({
    label,
    item,
    // itemInfos,
    // parsedObj,
    handleDelete,
    handleEdits,
    openForm,
    setOpenForm,
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
    return (
        <div id={styles.Movie} className={styles.elWrap}>
            <div className={styles.infoWrap}>
                <div className={styles.picWrap}>
                    <Image
                        placeholder={"/no-image.png"}
                        src={pic ? pic : "/no-image.png"}
                        alt={item[nameType]}
                        style={{ objectFit: "cover" }}
                        fill
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
                                <a
                                    // key={"url" + i}
                                    href={el}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={"url " + el}
                                    className={styles.linkEl}
                                >
                                    <p>{el}</p>
                                </a>
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
                                <Link
                                    href={`/el/studio/${el.id}`}
                                    key={"studio" + el.id}
                                    className={styles.tagEl}
                                >
                                    {el.name}
                                </Link>
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

                    <div className={styles.tagLabelsWrap}>
                        {renderLinks(
                            parseTagsForUiList(categories),
                            "category"
                        )}
                    </div>
                </div>

                <div className={styles.elRowToScroll}>
                    <span>Tags: </span>
                    <div className={styles.tagLabelsWrap}>
                        {renderLinks(parseTagsForUiList(tags), "tag")}
                    </div>
                </div>

                <div className={styles.elRow}>
                    <span>Tot. Actors: </span>
                    <p>{totalActors}</p>
                </div>
            </div>

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>CAST</h3>

                    {totalActors > 0 && (
                        <Link href="/search">see all ({totalActors})</Link>
                    )}
                </div>

                <RelationsList
                    itemName={item[nameType]}
                    itemId={item.id}
                    itemLabel={label}
                    nameType={nameType}
                    relationsLabel={"actor"} // fare dinamici ? no perche custom component ?
                    relationsGroup={"actors"}
                />
            </div>

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>ACTIONS</h3>
                </div>

                <div className={styles.buttonsWrap}>
                    <SessionPlaylistAddBtn
                        el={{
                            id: item.id,
                            title: item.title,
                            pic: item.pic,
                            cast: item.cast,
                        }}
                    />
                    <button
                        onClick={() => setOpenForm(true)}
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

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>RECORDS</h3>
                </div>

                <div className={styles.recordsRow}>
                    <RecordsCounter id={id} />
                </div>
            </div>

            <Modal isOpen={openForm} onClose={() => setOpenForm(false)}>
                <Form
                    formLabel={label}
                    propsData={item}
                    handleEditsInParent={handleEdits}
                />
            </Modal>
        </div>
    );
}
