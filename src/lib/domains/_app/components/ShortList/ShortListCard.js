import Image from "next/image";
import Link from "next/link";
import styles from "./ShortListCard.module.css";
import createMarkup from "@/utils/createMarkup";
import SessionPlaylistAddBtn from "../../constants/components/SessionPlaylist/SessionPlaylistBtns/SessionPlaylistAddBtn";
import { detectImage } from "@/utils/custom/customParsers";

export default function ShortListCard({ obj, table, tableName }) {
    let { nameType, thumbnailSize, itemLabel } = table;

    return (
        <div className={styles.gridElement}>
            {tableName === "movies" && (
                <SessionPlaylistAddBtn obj={{ id: obj.id, title: obj.title }} />
            )}

            <Link
                id={styles[thumbnailSize]}
                href={`/el/${itemLabel}/${obj.id}`}
                title={obj[nameType]}
            >
                <div
                    style={{
                        position: "relative",
                    }}
                    className={styles.picWrap}
                >
                    <Image
                        src={obj.pic ? obj.pic : detectImage(obj)}
                        alt={obj[nameType]}
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>

                {itemLabel === "actor" && (
                    <div className={styles.regularDescription}>
                        <h5
                            dangerouslySetInnerHTML={createMarkup(
                                obj[nameType]
                            )}
                        ></h5>
                        <p className={styles.subtitle}>
                            Movies: {obj.movies ? obj.movies.length : 0}
                        </p>
                        <p className={styles.rating}>
                            {obj.rating ? obj.rating : "unrated"}
                        </p>
                    </div>
                )}
                {itemLabel === "movie" && (
                    <div className={styles.movieDescription}>
                        <div>
                            <h5
                                dangerouslySetInnerHTML={createMarkup(
                                    obj[nameType]
                                )}
                            ></h5>
                            <p className={styles.subtitle}>
                                {obj.cast &&
                                    obj.cast.map((model, i) => (
                                        <span key={model.modelid}>
                                            {i > 0 && ", "}
                                            {model.name}
                                        </span>
                                    ))}
                            </p>
                        </div>
                        <p className={styles.rating}>
                            {obj.rating ? obj.rating : "unrated"}
                        </p>
                    </div>
                )}
            </Link>
        </div>
    );
}
