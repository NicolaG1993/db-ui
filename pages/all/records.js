import { useEffect, useState } from "react";
import Graph from "@/src/domains/records/components/Graphs/Graph";
import styles from "@/src/application/styles/Records.module.css";
import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";
import { List } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import { useDispatch } from "react-redux";
import {
    openForm,
    resetFormStore,
} from "@/src/application/redux/slices/formSlice";
import { mapRecordsRawToRecords } from "@/src/domains/el/utils/mapData";

// Create action for this 👇🧠
const fetchData = async () => {
    try {
        const res = await axiosAuthInstance.get("/api/record/all");

        const mappedData = mapRecordsRawToRecords(res.data);
        return mappedData;
    } catch (error) {
        console.error(error);
    }
};

export default function Records() {
    const label = "records";
    const dispatch = useDispatch();
    const [allRecords, setAllRecords] = useState(null);
    const [rec, setRec] = useState(null);
    const [recs, setRecs] = useState();
    const [multipleSelection, setMultipleSelection] = useState(false);

    const storeData = async () => {
        const res = await fetchData();
        setAllRecords(res);
    };

    const updateMultipleSelection = (val) => {
        setMultipleSelection(val);
    };

    const updateRecs = (id, isChecked) => {
        isChecked
            ? recs && recs.length
                ? setRecs((prev) => [...prev, id])
                : setRecs([id])
            : recs &&
              recs.length &&
              setRecs((prev) => prev.filter((el) => el !== id));
    };

    const handleOpenRecordsForm = () => {
        setRecs(recs);
        dispatch(resetFormStore());
        dispatch(openForm({ propsData: recs, formLabel: label }));
    };
    const handleOpenRecordForm = (el) => {
        setRec(el);
        dispatch(resetFormStore());
        dispatch(openForm({ propsData: el, formLabel: "record" }));
    };
    const handleDeleteRecordForm = (el) => {
        setRec(el);
        handleDelete(el.id);
        // dispatch(resetFormStore());
        // dispatch(openForm({ propsData, formLabel: "record" }));
    };

    // const handleEdits = () => {
    //     storeData();
    // };

    useEffect(() => {
        storeData();
    }, []);

    useEffect(() => {
        multipleSelection ? setRec() : setRecs();
    }, [multipleSelection]);

    // useEffect(() => {
    //     console.log("recs: ", recs);
    //     if (recs) {
    //         // parse data for colums in DOM
    //         // console.log("recs: ", recs);
    //     }
    // }, [recs]);

    return (
        <main>
            <div>
                <h1>ALL RECORDS</h1>
            </div>

            {allRecords ? (
                <>
                    <section
                        className={`${styles.section} ${styles.recordsGrid}`}
                    >
                        <List
                            listTitle={"RECORDS"}
                            listLength={allRecords.records.length}
                            data={allRecords.records}
                            rowType={"complex"}
                            // rowSize={rowSize}

                            handleOpenRecordsForm={handleOpenRecordsForm}
                            handleOpenRecordForm={handleOpenRecordForm}
                            handleDeleteRecordForm={handleDeleteRecordForm}
                            updateMultipleSelection={updateMultipleSelection}
                            multipleSelection={multipleSelection}
                            onChange={updateRecs}
                        />

                        <List
                            listTitle={"MOVIES"}
                            listLength={allRecords.moviesRecords.length}
                            data={allRecords.moviesRecords}
                            rowSize={"large"}
                            customStyles={customStyles}
                        />

                        <List
                            listTitle={"ACTORS"}
                            listLength={allRecords.actorsRecords.length}
                            data={allRecords.actorsRecords}
                            customStyles={customStyles}
                        />

                        <List
                            listTitle={"TAGS"}
                            listLength={allRecords.tagsRecords.length}
                            data={allRecords.tagsRecords}
                            customStyles={customStyles}
                        />

                        <List
                            listTitle={"CATEGORIES"}
                            listLength={allRecords.categoriesRecords.length}
                            data={allRecords.categoriesRecords}
                            customStyles={customStyles}
                        />
                    </section>

                    <section
                        className={`${styles.section} ${styles.graphsGrid}`}
                    >
                        <div className={styles.graphWrap}>
                            <div className={styles.infoHeadingWrap}>
                                <h3>GRAPHIC 1</h3>
                            </div>
                            {/* In futuro fare component per library - ora é troppo specifico per questo progetto 👇🧠 */}
                            <Graph data={allRecords.records} />
                        </div>

                        <div className={styles.graphWrap}>
                            <div className={styles.infoHeadingWrap}>
                                <h3>GRAPHIC 2</h3>
                            </div>
                            <div className={styles.graph}></div>
                        </div>
                    </section>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </main>
    );
}
