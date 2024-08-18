// import Link from "next/link";
// import styles from "@/src/application/styles/Element.module.css";

// export default function ParsedLinks({ parsedData, group }) {
//     if (parsedData) {
//         return Object.entries(parsedData)
//             .sort()
//             .map(([key, arr], i) => {
//                 return (
//                     <div key={key}>
//                         <div className={styles.tagLabel}>{key}</div>
//                         <div>
//                             {arr.map((el) => (
//                                 <Link
//                                     href={`/el/${group}/${el.id}`}
//                                     key={group + " " + el.id}
//                                     className={styles.tagEl}
//                                 >
//                                     {el.name}
//                                 </Link>
//                             ))}
//                         </div>
//                     </div>
//                 );
//             });
//     } else {
//         return <p>N/A</p>;
//     }
// }
