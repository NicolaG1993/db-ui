import Image from "next/image";
import Link from "next/link";
import styles from "./Card.module.css";
import createMarkup from "@/src/application/utils/createMarkup";
import { detectImage } from "@/src/domains/_app/utils/parsers";
import { useState } from "react";
import CardUI from "./CardUI/CardUI";
import {
    activateLoadingItem,
    clearItem,
} from "@/src/application/redux/slices/itemSlice";
import { useDispatch } from "react-redux";

export default function Card({ obj, table, cardKey }) {
    let { nameType, thumbnailSize, itemLabel } = table;
    const [label, setLabel] = useState(table.itemLabel);

    const dispatch = useDispatch();

    const clearPreviousItem = () => {
        dispatch(clearItem());
        dispatch(activateLoadingItem());
    };

    return (
        <div className={styles.gridElement}>
            <CardUI obj={obj} label={label} />
            <Link
                className={styles.link}
                id={styles[thumbnailSize]}
                onClick={() => clearPreviousItem()}
                href={`/el/${label}/${obj.id}`}
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

                {thumbnailSize === "Portrait" && (
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
                {thumbnailSize === "Landscape" && (
                    <div className={styles.movieDescription}>
                        <div>
                            <h5
                                dangerouslySetInnerHTML={createMarkup(
                                    obj[nameType]
                                )}
                            ></h5>
                            {label === "movie" && (
                                <p className={styles.subtitle}>
                                    {obj.cast &&
                                        obj.cast.map((model, i) => (
                                            <span
                                                key={`cast ${model.name} ${i}`}
                                            >
                                                {i > 0 && ", "}
                                                {model.name}
                                            </span>
                                        ))}
                                </p>
                            )}
                        </div>
                        {label === "movie" && (
                            <p className={styles.rating}>
                                {obj.rating ? obj.rating : "unrated"}
                            </p>
                        )}
                    </div>
                )}
            </Link>
        </div>
    );
}
