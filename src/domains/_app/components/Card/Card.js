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
import ScrollingText from "../ScrollingText/ScrollingText";
import { createCastString } from "../../utils/interpretateData";

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
                            Movies: {obj.total_movies}
                        </p>
                        <p className={styles.rating}>
                            {obj.rating ? obj.rating : "unrated"}
                        </p>
                    </div>
                )}
                {thumbnailSize === "Landscape" && (
                    <div className={styles.movieDescription}>
                        <div>
                            {/* <h5
                                dangerouslySetInnerHTML={createMarkup(
                                    obj[nameType]
                                )}
                            ></h5> */}

                            <ScrollingText
                                text={obj[nameType]}
                                isScrolling={true}
                                backAndForth={true}
                                width="250px"
                                textStyle={styles.movieDescriptionTitle}
                            />

                            {label === "movie" && (
                                // <p className={styles.subtitle}>
                                //     {obj.actors &&
                                //         obj.actors.map((model, i) => (
                                //             <span
                                //                 key={`actors ${model.name} ${i}`}
                                //             >
                                //                 {i > 0 && ", "}
                                //                 {model.name}
                                //             </span>
                                //         ))}
                                // </p>

                                <ScrollingText
                                    text={createCastString(obj?.actors || [])}
                                    isScrolling={true}
                                    backAndForth={true}
                                    width="250px"
                                    textStyle={styles.subtitle}
                                />
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
