// import { formatDateEU } from "@/src/application/utils/convertTimestamp";
// import { createCastString } from "@/src/domains/_app/utils/interpretateData";

// export default function List({
//     listTitle,
//     listLength,
//     data,
//     rowType,
//     rowSize,
//     handleRouting,
//     handleOpenRecordsForm,
//     handleOpenRecordForm,
//     handleDeleteRecordForm,
//     multipleSelection,
//     onChange,
//     customStyles,
// }) {
//     return (
//         <div className={styles.infoWrap}>
//             <ListHeader
//                 listTitle={listTitle}
//                 listLength={listLength}
//                 rowType={rowType}
//                 handleOpenRecordsForm={handleOpenRecordsForm}
//             />
//             <ListBody
//                 listTitle={listTitle}
//                 data={data}
//                 rowType={rowType}
//                 rowSize={rowSize}
//                 handleRouting={handleRouting}
//                 handleOpenRecordForm={handleOpenRecordForm}
//                 handleDeleteRecordForm={handleDeleteRecordForm}
//                 multipleSelection={multipleSelection}
//                 onChange={onChange}
//             />
//         </div>
//     );
// }

// function ListHeader({ listTitle, listLength, rowType, handleOpenRecordsForm }) {
//     return (
//         <div className={styles.infoHeadingWrap}>
//             <div className={"subBox"}>
//                 <h3>{listTitle}</h3>
//                 <span>{listLength}</span>
//             </div>

//             {rowType === "complex" && (
//                 <div className={"subBox"}>
//                     <InputToggleSwitch
//                         onChange={updateMultipleSelection}
//                         customStyles={customStyles}
//                     />
//                     {multipleSelection && (
//                         <>
//                             <Button
//                                 onClick={() => handleOpenRecordsForm()}
//                                 size="x-small"
//                                 icon={<IconTrash />}
//                                 customStyles={customStyles}
//                             />

//                             <Button
//                                 onClick={() => handleOpenRecordsForm()}
//                                 size="x-small"
//                                 icon={<IconTrash />}
//                                 customStyles={customStyles}
//                             />
//                         </>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }

// function ListBody({
//     listTitle,
//     data,
//     rowType,
//     rowSize,
//     handleRouting,
//     handleOpenRecordForm,
//     handleDeleteRecordForm,
//     multipleSelection,
//     onChange,
// }) {
//     return (
//         <div className={styles.recordsWrap}>
//             {data?.map((el, i) => (
//                 <div
//                     key={"list: " + listTitle + " " + el.id}
//                     className={`${
//                         rowType === "complex"
//                             ? styles.recordRowComplex
//                             : styles.recordRowLarge
//                     }`}
//                     onClick={() => {
//                         handleRouting && handleRouting(el.id);
//                     }}
//                 >
//                     {rowType === "complex" ? (
//                         <RecordRowComplex
//                             el={el}
//                             i={i}
//                             allRecords={allRecords}
//                             handleRouting={handleRouting}
//                             handleOpenRecordForm={handleOpenRecordForm}
//                             handleDeleteRecordForm={handleDeleteRecordForm}
//                             multipleSelection={multipleSelection}
//                             onChange={onChange}
//                         />
//                     ) : rowSize !== "large" ? (
//                         <RecordRow el={el} i={i} />
//                     ) : (
//                         <RecordRowLarge el={el} i={i} />
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// }

// function RecordRow({ el, i }) {
//     return (
//         <>
//             <p className={styles.id}>#{i + 1}</p>

//             <p className={styles.title}>
//                 {/*👇🔴🔴🔴👇 use getItemName() after moving to library 👇🔴🔴🔴👇*/}
//                 {el.name ? el.name : el.title}
//             </p>

//             <p className={styles.total}>x {el.totalRecords}</p>
//         </>
//     );
// }

// function RecordRowLarge({ el, i }) {
//     return (
//         <>
//             <p className={styles.id}>#{i + 1}</p>
//             <div className={styles.doubleLineTitle}>
//                 <p className={styles.title}>{el.title}</p>
//                 <p className={styles.actors}>
//                     {/* 🧠👇 FIX: We should have directly access to movie.castString */}
//                     <span>{createCastString(el.actors)}</span>
//                 </p>
//             </div>

//             <p className={styles.total}>x {el.totalRecords}</p>
//         </>
//     );
// }

// function RecordRowComplex({
//     el,
//     i,
//     allRecords,
//     handleRouting,
//     handleOpenRecordForm,
//     handleDeleteRecordForm,
//     multipleSelection,
//     onChange,
// }) {
//     return (
//         <>
//             <div
//                 onClick={() => {
//                     handleRouting && handleRouting(el.movie.id);
//                 }}
//             >
//                 <p className={styles.id}>#{allRecords.records.length - i}</p>
//                 <p className={styles.title}>{el.movie.title}</p>
//                 <p className={styles.date}>{formatDateEU(el.created_at)}</p>
//             </div>

//             {multipleSelection ? (
//                 <div className={styles.btnWrap}>
//                     <InputCheckbox
//                         key={`records selection ` + el.id}
//                         id="checkbox"
//                         checked={recs && recs.includes(el.id)}
//                         value={JSON.stringify(el)}
//                         onChange={(e) => onChange(el.id, e.target.checked)}
//                         defaultChecked={false}
//                         customStyles={customStyles}
//                     />
//                 </div>
//             ) : (
//                 <div className={styles.btnWrap}>
//                     <Button
//                         onClick={() => handleOpenRecordForm(el)}
//                         size="x-small"
//                         icon={<IconAdd />}
//                         // label={"Edit"}
//                         customStyles={customStyles}
//                     />

//                     <Button
//                         onClick={() => handleDeleteRecordForm(el)}
//                         size="x-small"
//                         icon={<IconTrash />}
//                         // label={"X"}
//                         customStyles={customStyles}
//                     />
//                 </div>
//             )}
//         </>
//     );
// }
