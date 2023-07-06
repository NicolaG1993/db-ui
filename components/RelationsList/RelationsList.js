import Image from "next/image";
import Link from "next/link";
// import styles from "@/styles/Element.module.css";
import styles from "@/styles/Displayers.module.css";
import dataArchitectureObj from "@/utils/custom/dataStructureGroups";
import createMarkup from "@/utils/createMarkup";
import { detectImage } from "@/utils/custom/customParsers";
import SessionPlaylistAddBtn from "../SessionPlaylist/SessionPlaylistBtns/SessionPlaylistAddBtn";

export default function RelationsList({
    itemName,
    data,
    listLabel,
    listGroup,
}) {
    let table = dataArchitectureObj[listGroup];
    let { nameType, thumbnailSize, itemLabel } = table;

    // console.log("💚 itemName!", itemName);
    // console.log("💚 data!", data);
    // console.log("💚 itemGroup!", itemGroup);
    // console.log("💚 listLabel!", listLabel);
    // console.log("💚 listGroup!", listGroup);
    // console.log("💚 itemLabel!", itemLabel);

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

                            {/* <div>
                                <div>
                                    <h5>{el[nameType]}</h5>
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
                            </div> */}

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
