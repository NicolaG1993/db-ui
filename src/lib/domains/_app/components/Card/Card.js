import Image from "next/image";
import Link from "next/link";
import styles from "./Card.module.css";
import createMarkup from "@/utils/createMarkup";

import { detectImage } from "@/utils/custom/customParsers";
import { useEffect, useState } from "react";
import CardUI from "./CardUI/CardUI";

export default function Card({ obj, table, tableName }) {
    let { nameType, thumbnailSize, itemLabel } = table;
    const [label, setLabel] = useState(table.itemGroup);

    console.log("thumbnailSize: ", thumbnailSize);

    useEffect(() => {
        if (itemLabel) {
            setLabel(itemLabel);
        } else if (tableName) {
            setLabel(tableName);
            // 🧠 dovrebbe servire solo in shortlist
            // vedere se si puo rimuovere questo caso 🧠
            // mi eviterebbe di usare useEffect e useState 🧠🧠🧠🧠
            // si potrebbero passare tutti i data gia destrutturati
        } else {
            setLabel();
        }
    }, [table, tableName]);

    return (
        <div className={styles.gridElement}>
            <CardUI obj={obj} label={label} />
            <Link
                id={styles[thumbnailSize]}
                href={`/el/${label}/${obj.id}`}
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
                                            <span key={model.modelid}>
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
