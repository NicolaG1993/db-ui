// import Card from "@/src/domains/_app/components/Card/Card";
// import PageNav from "../Filters/PageNav/PageNav";
// import styles from "./FullListDisplayer.module.css";
// import { parseOrderOptions } from "@/src/domains/_app/utils/parsers";

// export default function FullListDisplayer({
//     table,
//     tableName,
//     displayData,
//     goToPage,
//     step,
//     selectedPage,
//     order,
//     totalCount,
//     handleSelect,
//     isLoading,
// }) {
//     return (
//         <div className={styles.display}>
//             <div className={styles.displayHeading}>
//                 <div>
//                     <h4>{tableName}</h4>
//                     <span>{totalCount ? totalCount : 0} results</span>
//                 </div>

//                 <PageNav
//                     totalCount={totalCount}
//                     goToPage={goToPage}
//                     step={step}
//                     selectedPage={selectedPage}
//                 />

//                 <select
//                     name="order"
//                     id="Order"
//                     onChange={(e) => handleSelect(e)}
//                     value={order}
//                 >
//                     {parseOrderOptions(table.orders)}
//                 </select>
//             </div>

//             <div className={styles.fullListGrid}>
//                 {displayData && !isLoading ? (
//                     displayData.map((el, i) => (
//                         <Card
//                             key={`FullListContent ${el[table.nameType]} ${i}`}
//                             table={table}
//                             obj={el}
//                         />
//                     ))
//                 ) : (
//                     <div>Loading data...</div>
//                 )}
//             </div>

//             <div>
//                 <PageNav
//                     totalCount={totalCount}
//                     goToPage={goToPage}
//                     step={step}
//                     selectedPage={selectedPage}
//                 />
//             </div>
//         </div>
//     );
// }
