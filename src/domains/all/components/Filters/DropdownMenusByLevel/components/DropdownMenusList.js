// import {
//     selectFormSideDropdownsState,
//     selectFormSideNavSelected,
//     updateSideNavDropdownsState,
// } from "@/src/application/redux/slices/formSlice";
// import renderDropdownElements from "@/src/domains/all/components/Filters/DropdownMenusByLevel/utils/renderDropdownElements";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import createNewMenus from "../utils/createNewMenus";

// export default function DropdownMenusList({
//     groupKey,
//     values,
//     index,
//     topic,
//     onClick,
//     currentSelection,
//     dropdownsState,
//     handleDropdowns,
//     customStyles,
// }) {
//     const isSelected = (item) => {
//         return currentSelection
//             ? currentSelection.some(
//                   (selectedItem) => selectedItem.id === item.id
//               )
//             : false;
//     };

//     return (
//         <div
//             className={styles.levelWrap}
//             key={"index: " + index + " key: " + groupKey}
//         >
//             <div
//                 className={styles.level}
//                 onClick={() =>
//                     handleDropdowns({ dropdownsState, index, groupKey })
//                 }
//             >
//                 <span>• {groupKey}</span>
//                 <span>{values.length}</span>
//             </div>

//             {dropdownsState[index][groupKey] && (
//                 <div className={styles.levelDropdown}>
//                     {values.map((item) => {
//                         const selected = isSelected(item);

//                         return (
//                             <ItemTag
//                                 key={
//                                     "Dropdown element (isSelected) • value: " +
//                                     item.id +
//                                     " key: " +
//                                     key
//                                 }
//                                 label={item.name}
//                                 onClick={() =>
//                                     onClick({
//                                         it: item,
//                                         userAction: selected ? "remove" : "add",
//                                     })
//                                 }
//                                 isActive={selected}
//                                 customStyles={customStyles}
//                             />
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// }
