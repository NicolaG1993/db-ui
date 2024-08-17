// import styles from "@/src/domains/_app/constants/components/SessionPlaylist/SessionPlaylist.module.css";
// import moveArrayItem from "@/src/domains/_app/utils/moveArrayItem";
// import { detectImage } from "@/src/domains/_app/utils/parsers";
// import Image from "next/image";
// import Link from "next/link";
// import createOrderOptions from "../../utils/createOrderOptions";

// export default function PlaylistTable({
//     data,
//     removeFromPlaylist,
//     clearPreviousItem,
//     overridePlaylist,
// }) {
//     const orderList = ({ oldIndex, newIndex, data }) => {
//         const newData = moveArrayItem(data, oldIndex, newIndex);
//         overridePlaylist(newData);
//     };

//     return (
//         <div className={styles["movie-list"]}>
//             {data && data.length ? (
//                 data.map((el, i) => (
//                     <div key={"session data " + i} className={styles["row"]}>
//                         <select
//                             name="selectListPosition"
//                             value={i}
//                             onChange={(e) =>
//                                 orderList({
//                                     oldIndex: i,
//                                     newIndex: Number(e.target.value),
//                                     data,
//                                 })
//                             }
//                         >
//                             {createOrderOptions(data, i)}
//                         </select>
//                         <Link
//                             href={`/el/movie/${el.id}`}
//                             onClick={() => clearPreviousItem(el.id)}
//                         >
//                             <div className={styles["row-content-wrap"]}>
//                                 <div
//                                     style={{
//                                         position: "relative",
//                                     }}
//                                     className={styles.picWrap}
//                                 >
//                                     <Image
//                                         src={el.pic ? el.pic : detectImage(el)}
//                                         alt={el.title}
//                                         fill
//                                         style={{ objectFit: "cover" }}
//                                     />
//                                 </div>
//                                 <div>
//                                     <h5>{el.title}</h5>
//                                     <p className={styles.subtitle}>
//                                         {el.actors &&
//                                             el.actors.map((actor, i) => (
//                                                 <span
//                                                     key={`actors ${actor.name} ${i}`}
//                                                 >
//                                                     {i > 0 && ", "}
//                                                     {actor.name}
//                                                 </span>
//                                             ))}
//                                     </p>
//                                 </div>
//                             </div>
//                         </Link>
//                         <p onClick={() => removeFromPlaylist(i)}>X</p>
//                     </div>
//                 ))
//             ) : (
//                 <div className={styles["no-data-row"]}>
//                     <p>No data</p>
//                 </div>
//             )}
//         </div>
//     );
// }
