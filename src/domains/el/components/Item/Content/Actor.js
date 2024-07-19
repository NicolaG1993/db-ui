import styles from "@/src/application/styles/Element.module.css";
import Link from "next/link";
import Image from "next/image";
import Form from "@/src/domains/_app/components/Form/components/Form";
import RelationsList from "../../RelationsList/RelationsList";
import { detectImage } from "@/src/domains/_app/utils/parsers";
import { formatDateEU, getAge } from "@/src/application/utils/convertTimestamp";
import IG_icon from "/public/IG_icon.svg";
import X_icon from "/public/X_icon.svg";
import Modal from "@/src/domains/_app/components/Modal/Modal";
import renderLinks from "../../../utils/renderLinks";

/*
Form "open" and "close" should be handled in redux

on close:
- we need to clean up the form and cookie - for edit
- clear the form after saving it in cookies - for new#

on open:
- load propsData - for edit
- load cookies state if exist - for new

DEVO FORSE RIVEDERE DIFFERENZE FRA DUE FORMS?

NB. che setOpenForm ha due logiche abbastanza diverse fra new e edit. Si puó migliorare secondo me.
*/

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
                    {item.birthday ? (
                        <p>{getAge(item.birthday)} y.o.</p>
                    ) : (
                        <p>N/A</p>
                    )}
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
                                <Link
                                    href={`/el/nationality/${el}`}
                                    key={"nationality " + el}
                                    className={styles.tagEl}
                                >
                                    {el}
                                </Link>
                            ))
                        ) : (
                            <p>N/A</p>
                        )}
                    </div>
                </div>

                <div className={styles.elRow}>
                    <span>Hair: </span>
                    <div className={styles.tagsWrap}>
                        {itemInfos && itemInfos.Hair ? (
                            itemInfos.Hair.map((el) => (
                                <Link
                                    href={`/el/tag/${el.id}`}
                                    key={"hair " + el.id}
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
                    <span>Eyes color: </span>
                    <p>{"N/A"}</p>
                </div>

                <div className={styles.elRow}>
                    <span>Ethnicity: </span>
                    <div className={styles.tagsWrap}>
                        {itemInfos && itemInfos.Ethnicity ? (
                            itemInfos.Ethnicity.map((el) => (
                                <Link
                                    href={`/el/tag/${el.id}`}
                                    key={"ethnicity " + el.id}
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
                    <span>Body type: </span>
                    <div className={styles.tagsWrap}>
                        {itemInfos && itemInfos["Body Types"] ? (
                            itemInfos["Body Types"].map((el) => (
                                <Link
                                    href={`/el/tag/${el.id}`}
                                    key={"bodyType " + el.id}
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
                    <span>Social: </span>
                    <div>
                        {item.instagram && (
                            <a
                                href={item.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.iconLink}
                            >
                                <X_icon />
                            </a>
                        )}
                        {item.twitter && (
                            <a
                                href={item.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.iconLink}
                            >
                                <IG_icon />
                            </a>
                        )}
                    </div>
                </div>

                {item.more_urls && (
                    <div className={styles.elRow}>
                        <span>Links: </span>
                        <div>
                            {item.more_urls.map((url, i) => (
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={`${url} ${i}`}
                                    className={styles.linkEl}
                                >
                                    <p>{url}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>MISC. INFO</h3>
                </div>

                <div className={styles.elRowToScroll}>
                    <span>Tags: </span>
                    <div className={styles.tagLabelsWrap}>
                        {renderLinks(parsedObj.tags, "tag")}
                    </div>
                </div>

                <div className={styles.elRowToScroll}>
                    <span>Categories: </span>

                    <div className={styles.tagLabelsWrap}>
                        {renderLinks(parsedObj.categories, "category")}
                    </div>
                </div>

                <div className={styles.elRow}>
                    <span>Studios: </span>
                    <div className={styles.tagsWrap}>
                        {item.studios && item.studios.length ? (
                            item.studios.map((el) => (
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
                        {item.distributions && item.distributions.length ? (
                            item.distributions.map((el) => (
                                <Link
                                    href={`/el/distribution/${el.id}`}
                                    key={"distribution" + el.id}
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
                    <span>Tot. Clips: </span>
                    <p>{movies?.length}</p>
                </div>
            </div>

            {/* FIX THIS 👇⚠️🧠
            
                • Infinite scrolling for data
                • Improve UI (window is too small and should be attached to bottom of the page - no extra scrolling, is annoying)
                • We could rework the list design
                • We should add sorting

                TODO:

                🧠 "movies" should be a separate API request, that works with pagination
                • "Tot Movies" dobbiamo averlo giá dall'inizio
                • Le nuove pagine di "movies" vengo aggiunte a quelle gia ottenute, non sostituite
                • Pagination dev'essere triggered quando user é in fondo alla lista + animazione caricamento
                • Dobbiamo avere sorting 
                
            */}
            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>MOVIES</h3>

                    {movies?.length > 0 && (
                        <Link href="/search">see all ({movies.length})</Link>
                    )}
                </div>

                {movies ? (
                    <RelationsList
                        itemName={item[nameType]}
                        itemId={item.id}
                        itemLabel={label}
                        //   data={movies}
                        relationsLabel={"movie"} // fare dinamici ? no perche custom component
                        relationsGroup={"movies"}
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
                    <button
                        onClick={() => setOpenForm(true)}
                        className="button-standard"
                    >
                        Modify
                    </button>
                    <button
                        onClick={() => handleDelete(item.id)}
                        className="button-danger"
                    >
                        Delete
                    </button>
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

/*
 * Bisogna fare in modo che UI sia dinamica (es. attore != movie != studio)
 * si puo fare come per in Form
 * si puo fare come esistono 3 presets (1x attore, 1x movie, 1x altro) e vengono scelti in base a label
 */
