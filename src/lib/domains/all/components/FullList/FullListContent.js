import Image from "next/image";
import Link from "next/link";
import styles from "./FullListContent.module.css";
import createMarkup from "@/utils/createMarkup";
import { detectImage } from "@/utils/custom/customParsers";
import SessionPlaylistAddBtn from "../../../_app/constants/components/SessionPlaylist/SessionPlaylistBtns/SessionPlaylistAddBtn";

export default function FullListContent({ data, table }) {
    let { nameType, thumbnailSize, itemLabel, itemGroup } = table;
    console.log(table);
    return (
        <>
            {data ? (
                data.map((el, i) => (
                    <div
                        key={`FullListContent ${el[nameType]} ${i}`}
                        className={styles.gridElement}
                    >
                        {itemGroup === "movies" && (
                            <SessionPlaylistAddBtn
                                el={{ id: el.id, title: el.title }}
                            />
                        )}

                        <Link
                            id={styles[thumbnailSize]}
                            href={`/el/${itemLabel}/${el.id}`}
                            title={el[nameType]}
                        >
                            <div
                                style={{
                                    position: "relative",
                                }}
                            >
                                <Image
                                    src={el.pic ? el.pic : detectImage(el)}
                                    alt={el[nameType]}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>

                            {itemLabel === "movie" ? (
                                <div className={styles.movieDescription}>
                                    <div>
                                        <h5
                                            dangerouslySetInnerHTML={createMarkup(
                                                el[nameType]
                                            )}
                                        ></h5>
                                        <p className={styles.subtitle}>
                                            {el.cast &&
                                                el.cast.map((model, i) => (
                                                    <span key={model.modelid}>
                                                        {i > 0 && ", "}
                                                        {model.name}
                                                    </span>
                                                ))}
                                        </p>
                                    </div>
                                    <p className={styles.rating}>
                                        {el.rating ? el.rating : "N/A"}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.regularDescription}>
                                    <h5
                                        dangerouslySetInnerHTML={createMarkup(
                                            el[nameType]
                                        )}
                                    ></h5>
                                    <p className={styles.subtitle}>
                                        Movies:{" "}
                                        {el.movies || el.count
                                            ? el.count || el.movies.length
                                            : 0}
                                    </p>
                                    <p className={styles.rating}>
                                        {el.rating ? el.rating : "N/A"}
                                    </p>
                                </div>
                            )}
                        </Link>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

// NON ANCORA DINAMICO 🧠
/*

/all/${table}
• FullList
• • FullListContent

/el/${label}/[id]
• Item
• • ItemContent
• • • ActorItem
• • • MovieItem
• • • StudioItem
• • • TagItem

• Form
• • ActorForm
• • MovieForm
• • StudioForm
• • TagForm

*/
