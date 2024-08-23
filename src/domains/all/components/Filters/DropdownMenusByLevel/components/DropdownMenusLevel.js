// // import renderDropdownLevel from "@/src/domains/all/components/Filters/DropdownMenusByLevel/utils/renderDropdownLevel";
// // import loopObject from "@/src/domains/_app/utils/loopObject";
// // import { useEffect } from "react";
// // import { shallowEqual, useDispatch, useSelector } from "react-redux";
// // import {
// //     selectFormSideDropdownsState,
// //     selectFormSideNavFilteredData,
// //     selectFormSideNavSelected,
// //     updateSideNavDropdownsState,
// // } from "@/src/application/redux/slices/formSlice";
// // import createNewMenus from "../utils/createNewMenus";

// export default function DropdownMenusLevel({
//     groupKey,
//     values,
//     index,
//     styles,
//     menuStructure,
//     dropdownsState,
//     // filters,
//     //  handleFilters,
//     handleDropdowns,
// }) {
//     // const dispatch = useDispatch();
//     // const selected = useSelector(selectFormSideNavSelected, shallowEqual);
//     // const dropdownsState = useSelector(
//     //     selectFormSideDropdownsState,
//     //     shallowEqual
//     // );
//     // const menuStructure = useSelector(
//     //     selectFormSideNavFilteredData,
//     //     shallowEqual
//     // ); // 🧠 not sure if its correct - test!

//     // const handleDropdowns = ({ dropdownsState, index, groupKey }) => {
//     //     // this process may differ for other components, that's why we handle this part here and not in action
//     //     // change if we see it doesn't change 🧠👇
//     //     const newState = createNewMenus({ dropdownsState, index, groupKey });
//     //     dispatch(
//     //         updateSideNavDropdownsState({
//     //             newState,
//     //         })
//     //     );
//     // };

//     ///////////////

//     // FIX - refactor
//     // devo prendere styles anche da file o va bene cosí?
//     // mi serve proprio "menuStructure" fino a qua?

//     // 🔴🔴🔴 FIX! WIP 🔴🔴🔴
//     // 🔴🔴🔴 Unica soluzione iniziare ad usare store e actions 🔴🔴🔴
//     let objectEntries = Object.entries(values); // buggy

//     // const DropdownMenusLevelChilds = () =>
//     //     renderDropdownLevel({
//     //         nextMenuStructure: menuStructure[groupKey],
//     //         index: index + 1,
//     //         styles,
//     //         // dropdownsState,
//     //         // selected,
//     //         // handleFilters,
//     //         // handleDropdowns, // 🧠 questa fn fa un giro assurdo come prop, non ideale 🧠
//     //     });

//     // console.log("🔴🔴🔴 DropdownMenusLevel: ", {
//     //     groupKey,
//     //     values,
//     //     index,
//     //     styles,
//     //     menuStructure,
//     //     objectEntries,
//     //     dropdownsState,
//     // });

//     // const logger = (obj) => console.log("🤖!!!LOGGER!!!🤖 ", obj);

//     // useEffect(() => {
//     //     console.log("index changed! ", {
//     //         groupKey,
//     //         values,
//     //         index,
//     //         styles,
//     //         menuStructure,
//     //         objectEntries,
//     //         dropdownsState,
//     //     });
//     // }, [index]);

//     // console.log("⭐ DropdownMenusLevel rendering: ", {
//     //     values,
//     //     index,
//     //     nextMenuStructure: menuStructure[groupKey],
//     //     menuStructure,
//     // });

//     return (
//         <div
//             className={styles.levelWrap}
//             key={"index: " + index + " key: " + groupKey}
//         >
//             <div
//                 className={styles.level}
//                 onClick={() => {
//                     handleDropdowns({ dropdownsState, index, groupKey }); // FIX : error when i click 2 times on a group 🔴🔴🔴
//                 }}
//             >
//                 <span>• {groupKey}</span>
//                 <span>{objectEntries.length}</span>
//             </div>
//             {dropdownsState[index][groupKey] && (
//                 <div className={styles.levelDropdown}>
//                     {/* <DropdownMenusLevelChilds /> */}

//                     <LevelRender
//                         menuStructure={menuStructure[groupKey]}
//                         index={index + 1}
//                         onClick={onClick}
//                         currentSelection={currentSelection}
//                         dropdownsState={dropdownsState}
//                         handleDropdowns={handleDropdowns}
//                         customStyles={customStyles}
//                     />

//                     {/* {Object.entries(menuStructure[groupKey]).map(
//                         ([key, values], i) => {
//                             if (values) {
//                                 if (Array.isArray(values)) {
//                                     return (
//                                         <DropdownMenusList
//                                             key={key}
//                                             groupKey={key}
//                                             values={values}
//                                             index={index + 1} // buggy 🔴 not anympre?
//                                             onClick={onClick}
//                                             currentSelection={currentSelection}
//                                             dropdownsState={dropdownsState}
//                                             handleDropdowns={handleDropdowns}
//                                             customStyles={customStyles}
//                                         />
//                                     );
//                                 } else if (typeof values === "object") {
//                                     return (
//                                         <DropdownMenusLevel
//                                             key={key}
//                                             groupKey={key}
//                                             values={values}
//                                             index={index + 1} // buggy 🔴 not anympre??
//                                             onClick={onClick}
//                                             currentSelection={currentSelection}
//                                             customStyles={customStyles}
//                                             dropdownsState={dropdownsState}
//                                             menuStructure={menuStructure}
//                                         />
//                                     );
//                                 }
//                             }
//                         }
//                     )} */}
//                 </div>
//             )}
//         </div>
//     );
// }
