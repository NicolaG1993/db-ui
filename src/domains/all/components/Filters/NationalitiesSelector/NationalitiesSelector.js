// import { useEffect, useState } from "react";
// import ErrorUI from "@/src/domains/_app/components/Error/components/ErrorUI/ErrorUI";
// import allNationalities from "@/src/application/settings/allNationalities";
// import standardStyles from "../InputsSelector/InputsSelector.module.css";
// import { shallowEqual, useDispatch } from "react-redux";
// import { useAppSelector } from "@/src/application/redux/lib/hooks";
// import {
//     selectFormSideNavRenderReady,
//     selectFormSideNavSelected,
//     handleSideNavRenderReady,
//     selectFormSideNavFilteredData,
// } from "@/src/application/redux/slices/formSlice";
// import renderNationalities from "./utils/renderNationalities";

// export default function NationalitiesSelector({
//     data,
//     filters,
//     topic,
//     userStyles,
// }) {
//     //////////////////////////////
//     // STATE
//     //////////////////////////////
//     console.log("*🌟🌟🌟Rendering *NationalitiesSelector* ", { filters });
//     const dispatch = useDispatch();
//     const renderReady = useAppSelector(
//         selectFormSideNavRenderReady,
//         shallowEqual
//     );
//     const currentSelection = useAppSelector(
//         selectFormSideNavSelected,
//         shallowEqual
//     );
//     // const filteredData = useAppSelector(
//     //     selectFormSideNavFilteredData,
//     //     shallowEqual
//     // );

//     const [error, setError] = useState();
//     // const [renderReady, setRenderReady] = useState(false);

//     let styles = { ...standardStyles, ...userStyles } || standardStyles;

//     useEffect(() => {
//         dispatch(handleSideNavRenderReady(true));
//     }, []);

//     // DELETE? 🧠
//     /*
//     useEffect(() => {
//         if (onChange && typeof onChange !== "function") {
//             setError("Error: onChange is not a function");
//         } else if (onChange) {
//             onChange({ val: filters, topic: topic });
//         }
//     }, [filters]);
//     */

//     //////////////////////////////
//     // UPDATE FILTER STATE
//     //////////////////////////////

//     // DELETE? 🧠
//     /*
//     const updateFilters = (val, action) => {
//         if (action === "add") {
//             // update only if value is not present in array already, bug prevention
//             if (filters && !filters.some((x) => x === val)) {
//                 setFilters([...filters, val]);
//             } else if (!filters.some((x) => x === val)) {
//                 setFilters([...filters, val]);
//             }
//         }
//         if (action === "remove") {
//             setFilters(filters.filter((x) => x !== val));
//         }
//     };
//     */

//     //////////////////////////////
//     // DATA HANDLERS
//     //////////////////////////////
//     /*
//     const renderValues = (array) => {
//         return (
//             <div className={styles.categoryDropdown}>
//                 {["N/A", ...array].map((it) => {
//                     return filters && filters.find((x) => it === x) ? (
//                         <div key={"value: " + it}>
//                             <span
//                                 className={styles.selectedEl}
//                                 onClick={() => updateFilters(it, "remove")}
//                             >
//                                 {it}
//                             </span>
//                         </div>
//                     ) : (
//                         <div key={"value: " + it}>
//                             <span
//                                 className={styles.unselectedEl}
//                                 onClick={() => updateFilters(it, "add")}
//                             >
//                                 {it}
//                             </span>
//                         </div>
//                     );
//                 })}
//             </div>
//         );
//     };
//     */

//     //////////////////////////////
//     // RENDERING
//     //////////////////////////////
//     return (
//         // <>
//         //     {error ? (
//         //         <ErrorUI error={error} styles={null} />
//         //     ) : renderReady ? (
//         //         renderValues(filteredData.map((el) => el.name))
//         //     ) : (
//         //         "Loading"
//         //     )}
//         // </>
//         <div className={styles.categoryDropdown}>
//             {renderReady ? (
//                 renderNationalities({
//                     data,
//                     currentSelection,
//                     //  updateFilters,
//                     styles,
//                 })
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// }

// // renderValues(filteredData.map((el) => el.name));
