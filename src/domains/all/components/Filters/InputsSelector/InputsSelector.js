// import { useEffect, useState } from "react";
// import ErrorUI from "@/src/domains/_app/components/Error/components/ErrorUI/ErrorUI";
// import standardStyles from "./InputsSelector.module.css";
// // import Element from "./components/Element";

// export default function InputsSelector({
//     data,
//     topic,
//     userStyles,
//     onClick,
//     isLoaded,
//     currentSelection,
// }) {
//     const [error, setError] = useState();
//     let styles = { ...standardStyles, ...userStyles } || standardStyles;

//     useEffect(() => {
//         // 🔴 Non faccio refactor di "error" perché so gia che dovró rifarlo con "props.onError() alla fine"
//         if (!data) {
//             setError("Error: data is missing");
//         } else if (!Array.isArray(data)) {
//             setError("Error: data is not an array");
//         } else if (currentSelection && !Array.isArray(currentSelection)) {
//             setError("Error: currentSelection is not an array");
//         } else {
//             setError();
//         }
//     }, []);

//     return (
//         <div className={styles.categoryDropdown}>
//             {error ? (
//                 // Vedere se posso riutilizzare ErrorMessage.tsx 👇🧠 testare
//                 <ErrorUI error={error} styles={null} />
//             ) : isLoaded ? (
//                 data.map((it) => {
//                     return currentSelection &&
//                         currentSelection.find((x) => it.id === x.id) ? (
//                         <ItemTag
//                             key={
//                                 "InputSelector element (isSelected) • value: " +
//                                 it.id
//                             }
//                             label={it.name}
//                             onClick={() =>
//                                 onClick({ it, userAction: "remove" })
//                             }
//                             isActive={true}
//                             customStyles={customStyles}
//                         />
//                     ) : (
//                         <ItemTag
//                             key={
//                                 "InputSelector element (!isSelected) • value: " +
//                                 it.id
//                             }
//                             label={it.name}
//                             onClick={() => onClick({ it, userAction: "add" })}
//                             isActive={false}
//                             customStyles={customStyles}
//                         />
//                     );
//                 })
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// }
