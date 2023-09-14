import Image from "next/image";
import Link from "next/link";
import styles from "./RelationsList.module.css";
import dataArchitectureObj from "@/utils/custom/dataStructureGroups";
import createMarkup from "@/utils/createMarkup";
import { detectImage } from "@/utils/custom/customParsers";
import SessionPlaylistAddBtn from "../../../_app/constants/components/SessionPlaylist/SessionPlaylistBtns/SessionPlaylistAddBtn";

export default function RelationsList({
    itemName,
    data,
    listLabel,
    listGroup,
}) {
    let table = dataArchitectureObj[listGroup];
    let { nameType, thumbnailSize, itemLabel } = table;

    return (
        <div className={styles.relationList}>
            <div className={styles.relationsGrid}>
                {data.map((el) => (
                    <div key={itemLabel + el.id} className={styles.gridElement}>
                        {listGroup === "movies" && (
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
                                style={{ position: "relative" }}
                                className={styles.picWrap}
                            >
                                <Image
                                    src={el.pic ? el.pic : detectImage(el)}
                                    alt={el[nameType]}
                                    fill
                                    style={{
                                        objectFit: "cover",
                                    }}
                                />
                            </div>

                            {listLabel === "actor" && (
                                <div className={styles.regularDescription}>
                                    <h5
                                        dangerouslySetInnerHTML={createMarkup(
                                            el[nameType]
                                        )}
                                    ></h5>
                                    <p className={styles.subtitle}>
                                        Movies:{" "}
                                        {el.movies ? el.movies.length : 0}
                                    </p>
                                    <p className={styles.rating}>
                                        {el.rating ? el.rating : "unrated"}
                                    </p>
                                </div>
                            )}
                            {listLabel === "movie" && (
                                <div className={styles.movieDescription}>
                                    <div>
                                        <h5
                                            dangerouslySetInnerHTML={createMarkup(
                                                el[nameType]
                                            )}
                                        ></h5>
                                        <p className={styles.subtitle}>
                                            {el.cast &&
                                                el.cast.map((item, i) => (
                                                    <span key={item.movieid}>
                                                        {i > 0 && ", "}
                                                        {itemName}
                                                    </span>
                                                ))}
                                        </p>
                                    </div>
                                    <p className={styles.rating}>
                                        {el.rating ? el.rating : "unrated"}
                                    </p>
                                </div>
                            )}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
