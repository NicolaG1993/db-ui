// import { useEffect, useState } from "react";
// // import ErrorUI from "@/src/domains/_app/components/Error/components/ErrorUI/ErrorUI";
// // TODO: fix this css file properly
// // import standardStyles from "../InputsSelector/InputsSelector.module.css";
// // import { useAppSelector } from "@/src/application/redux/lib/hooks";
// // import {
// //     handleSideNavError,
// //     selectFormSideNavError,
// //     selectFormSideNavSelected,
// // } from "@/src/application/redux/slices/formSlice";
// // import { shallowEqual, useDispatch } from "react-redux";

// export default function ActiveElements({
//     currentSelection,
//     topic,
//     onClick,
//     isLoaded,
//     customStyles,
// }) {
//     // console.log("ActiveElements START", {
//     //     selected,
//     //     topic,
//     // });

//     const [error, setError] = useState();
//     // const dispatch = useDispatch();
//     // const error = useAppSelector(selectFormSideNavError, shallowEqual);
//     // const selected = useAppSelector(selectFormSideNavSelected, shallowEqual);
//     //////////////////////////////
//     // STATE
//     //////////////////////////////
//     // const [error, setError] = useState();
//     // const [activeElements, setActiveElements] = useState([]);
//     // let styles = userStyles || standardStyles;

//     useEffect(() => {
//         // maybe not needed in PROD 🧠 i think i can easily remove this
//         // console.log("ActiveElements renders", {
//         //     currentSelection,
//         //     activeElements,
//         //     // topic,
//         // });
//         let error;
//         if (!currentSelection) {
//             error = "Error: currentSelection is missing";
//         } else if (!Array.isArray(currentSelection)) {
//             error = "Error: currentSelection is not an array";
//         } else if (onClick && typeof onClick !== "function") {
//             setError("Error: onClick is not a function");
//         }

//         if (error) {
//             setError(error);
//         } else {
//             setError();
//         }
//     }, []);

//     // useEffect(() => {
//     //     currentSelection && setActiveElements(currentSelection);
//     // }, [currentSelection]);
//     /*
//     useEffect(() => {
//         if (onChange && typeof onChange !== "function") {
//             setError("Error: onChange is not a function");
//         } else if (onChange) {
//             // console.log("unpdating parent! 🐠🐟🐟🐠", activeElements);
//             onChange({ val: activeElements, userAction: "remove", topic: topic });
//         }
//     }, [activeElements]);
// */

//     // const removeActiveElement = (element) => {
//     //     // console.log("🧠 element: ", element);
//     //     if (onChange && typeof onChange !== "function") {
//     //         setError("Error: onChange is not a function");
//     //     } else if (onChange) {
//     //         // setActiveElements(newArr); // forse nn serve 🧠
//     //         // console.log("unpdating parent! 🐠🐟🐟🐠", activeElements);
//     //         onChange({ val: element, userAction: "remove" });
//     //     }
//     // };

//     //////////////////////////////
//     // DATA HANDLERS & RENDERING
//     //////////////////////////////

//     if (error) {
//         return <ErrorMessage error={error} customStyles={customStyles} />;
//         // return <ErrorUI error={error} styles={null} />;
//     }

//     if (!isLoaded) {
//         return <p>Loading...</p>;
//     }

//     // 🔴 REMOVE ONCLICK is NOT WORKING! 🔴
//     return (
//         <div className={`${styles.root} ${styles.categoryDropdown}`}>
//             {currentSelection.map(
//                 (el, i) => {
//                     const id = getItemId(item);
//                     const name = getItemName(item);
//                     // const selected = isSelected(item);

//                     return (
//                         <ItemTag
//                             key={`activeElement ${id}`}
//                             label={name}
//                             onClick={() =>
//                                 onClick({
//                                     it: item,
//                                     userAction: "remove",
//                                 })
//                             }
//                             isActive={true}
//                             customStyles={customStyles}
//                         />
//                     );
//                 }

//                 /*
//                 topic === "nationalities" ? (
//                     <div key={"activeElement " + el}>
//                         <span
//                             className={styles.selectedEl}
//                             onClick={() => removeActiveElement(el)}
//                         >
//                             {el}
//                         </span>
//                     </div>
//                 ) : (
//                     <div key={"activeElement " + el.id}>
//                         <span
//                             className={styles.selectedEl}
//                             onClick={() => removeActiveElement(el)}
//                             // onClick={() => {
//                             //     handleDeselectElement([
//                             //         ...activeElements.filter(
//                             //             (x) => x.id !== el.id
//                             //         ),
//                             //     ]);
//                             // }}
//                             // onClick={() =>
//                             //     setActiveElements([
//                             //         ...activeElements.filter(
//                             //             (x) => x.id !== el.id
//                             //         ),
//                             //     ])
//                             // }
//                         >
//                             {el.name}
//                         </span>
//                     </div>
//                 )
//                 */
//             )}
//         </div>
//     );
// }
