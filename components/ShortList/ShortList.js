import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Displayers.module.css";
import dataArchitectureObj from "@/utils/custom/dataStructureGroups";
import createMarkup from "@/utils/createMarkup";
import { detectImage } from "@/utils/custom/customParsers";
import SessionPlaylistAddBtn from "@/components/SessionPlaylist/SessionPlaylistBtns/SessionPlaylistAddBtn";

export default function ShortList({ data, tableName }) {
    let table = dataArchitectureObj[tableName];
    let { nameType, thumbnailSize, itemLabel } = table;

    return (
        <div className={styles.display}>
            <div className={styles.displayHeading}>
                <h4>Latest {tableName}</h4>
                <Link href={`/all/${tableName}`}>See all</Link>
            </div>
            <div className={styles.shortListGrid} id={styles.ShortListGrid}>
                {data ? (
                    data.map((el) => (
                        <div
                            key={tableName + " ShortList " + el.id}
                            className={styles.gridElement}
                        >
                            {tableName === "movies" && (
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
                                    className={styles.picWrap}
                                >
                                    <Image
                                        src={el.pic ? el.pic : detectImage(el)}
                                        alt={el[nameType]}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>

                                {itemLabel === "actor" && (
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
                                {itemLabel === "movie" && (
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
                                                        <span
                                                            key={model.modelid}
                                                        >
                                                            {i > 0 && ", "}
                                                            {model.name}
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
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
