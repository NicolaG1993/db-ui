// import Image from "next/image";
// import Link from "next/link";
// import styles from "./Card.module.css";
// import { detectImage } from "@/src/domains/_app/utils/parsers";
// import { useState } from "react";
// import CardUI from "./CardUI/CardUI";
// import {
//     activateLoadingItem,
//     clearItem,
// } from "@/src/application/redux/slices/itemSlice";
// import { useDispatch } from "react-redux";
// import ScrollingText from "../ScrollingText/ScrollingText";
// import { useAppContext } from "../../contexts/AppContext";

// export default function Card({ obj, table, cardKey }) {
//     let { nameType, thumbnailSize, itemLabel } = table;
//     const [label, setLabel] = useState(table.itemLabel);

//     const dispatch = useDispatch();

//     const clearPreviousItem = () => {
//         dispatch(clearItem());
//         dispatch(activateLoadingItem());
//     };

//     const { showTooltip, hideTooltip } = useAppContext();

//     return (
//         <div
//             className={styles.gridElement}
//             onMouseOver={(e) => showTooltip(obj[nameType], "", e)}
//             onMouseOut={hideTooltip}
//         >
//             <CardUI obj={obj} label={label} />
//             <Link
//                 className={styles.link}
//                 id={styles[thumbnailSize]}
//                 onClick={() => clearPreviousItem()}
//                 href={`/el/${label}/${obj.id}`}
//             >
//                 <div
//                     style={{
//                         position: "relative",
//                     }}
//                     className={styles.picWrap}
//                 >
//                     <Image
//                         src={obj.pic}
//                         alt={obj[nameType]}
//                         fill
//                         style={{ objectFit: "cover" }}
//                     />
//                 </div>

//                 {thumbnailSize === "Portrait" && (
//                     <div className={styles.regularDescription}>
//                         <ScrollingText
//                             text={obj[nameType]}
//                             isScrolling={true}
//                             backAndForth={true}
//                             width="130px"
//                             textStyle={styles.movieDescriptionTitle}
//                         />
//                         <p className={styles.subtitle}>
//                             Movies: {obj.total_movies}
//                         </p>
//                         <p className={styles.rating}>
//                             {obj.rating ? obj.rating : "unrated"}
//                         </p>
//                     </div>
//                 )}
//                 {thumbnailSize === "Landscape" && (
//                     <div className={styles.movieDescription}>
//                         <div>
//                             <ScrollingText
//                                 text={obj[nameType]}
//                                 isScrolling={true}
//                                 backAndForth={true}
//                                 width="250px"
//                                 textStyle={styles.movieDescriptionTitle}
//                             />

//                             {label === "movie" && (
//                                 <ScrollingText
//                                     text={obj.castString}
//                                     isScrolling={true}
//                                     backAndForth={true}
//                                     width="250px"
//                                     textStyle={styles.subtitle}
//                                 />
//                             )}
//                         </div>
//                         {label === "movie" && (
//                             <p className={styles.rating}>
//                                 {obj.rating ? obj.rating : "unrated"}
//                             </p>
//                         )}
//                     </div>
//                 )}
//             </Link>
//         </div>
//     );
// }
