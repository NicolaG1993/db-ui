// import { updateSideNavSelected } from "@/src/application/redux/slices/formSlice";
// import { useDispatch } from "react-redux";

// export default function Element({
//     it,
//     // handleFilters,
//     styles,
//     isSelected,
//     viewOnly,
// }) {
//     // console.log(" ✌️ Element: ", { it, isSelected });
//     // const dispatch = useDispatch();
//     return (
//         <div>
//             <span
//                 className={isSelected ? styles.selectedEl : styles.unselectedEl}
//                 // onClick={() => handleFilters(it, selected ? "remove" : "add")}
//                 onClick={() =>
//                     !viewOnly &&
//                     dispatch(
//                         updateSideNavSelected({
//                             value: it,
//                             userAction: isSelected ? "remove" : "add",
//                             log: "Element",
//                         })
//                     )
//                 }
//             >
//                 {it.name}
//             </span>
//         </div>
//     );
// }
