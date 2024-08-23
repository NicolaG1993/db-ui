// import Link from "next/link";
import { useEffect, useState } from "react";

// import RecordForm from "@/components/Forms/RecordForm";
import Graph from "@/src/domains/records/components/Graphs/Graph";
import styles from "@/src/application/styles/Records.module.css";
import { formatDateEU } from "@/src/application/utils/convertTimestamp";
// import FormWrap from "@/src/domains/_app/components/Form/components/FormWrap";
// import ToggleSwitch from "@/src/domains/_app/components/ToggleSwitch/ToggleSwitch";
import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";
import {
    // Button,
    // IconAdd,
    // IconTrash,
    // InputCheckbox,
    // InputToggleSwitch,
    List,
} from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import { useDispatch } from "react-redux";
import {
    openForm,
    resetFormStore,
} from "@/src/application/redux/slices/formSlice";
import { mapRecordsRawToRecords } from "@/src/domains/el/utils/mapData";
// import { Modal } from "zephyrus-components";

// Create action for this 👇🧠
const fetchData = async () => {
    try {
        const res = await axiosAuthInstance.get("/api/record/all");
        console.log("fetchData activated: ", res);
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
    // const [openForm, setOpenForm] = useState(false);
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

    const handleEdits = () => {
        storeData();
    };

    useEffect(() => {
        storeData();
    }, []);

    useEffect(() => {
        multipleSelection ? setRec() : setRecs();
    }, [multipleSelection]);

    // useEffect(() => {
    //     // force fetch when openForm closes to update UI
    //     // there may be a better way to do this
    //     if (!openForm && rec) {
    //         storeData();
    //     }
    // }, [openForm]);

    useEffect(() => {
        console.log("recs: ", recs);
        if (recs) {
            // parse data for colums in DOM
            // console.log("recs: ", recs);
        }
    }, [recs]);

    const handleRouting = (url) => {
        router.push(url);
    };

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
                            handleRouting={handleRouting}
                            handleOpenRecordsForm={handleOpenRecordsForm}
                            handleOpenRecordForm={handleOpenRecordForm}
                            handleDeleteRecordForm={handleDeleteRecordForm}
                            updateMultipleSelection={updateMultipleSelection}
                            multipleSelection={multipleSelection}
                            onChange={updateRecs}
                        />
                        {/* <div className={styles.infoWrap}>
                            <div className={styles.infoHeadingWrap}>
                                <div className={"subBox"}>
                                    <h3>RECORDS</h3>
                                    <span>{`(${allRecords.records.length})`}</span>
                                </div>
                                <div className={"subBox"}>
                                    <InputToggleSwitch 
                                        onChange={updateMultipleSelection}
                                        customStyles={customStyles}
                                    />
                                    {multipleSelection && (
                                        <>
                                            <Button
                                                onClick={() =>
                                                    handleOpenRecordsForm(recs)
                                                }
                                                size="x-small"
                                                icon={<IconTrash />}
                                                customStyles={customStyles}
                                            />

                                            <Button
                                                onClick={() =>
                                                    handleOpenRecordsForm(recs)
                                                }
                                                size="x-small"
                                                icon={<IconTrash />}
                                                customStyles={customStyles}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className={styles.recordsWrap}>
                                {allRecords.records.map((el, i) => (
                                    <div
                                        key={el.id}
                                        className={styles.recordRowComplex}
                                    >
                                        <Link
                                            href={`/el/movie/${el.movie.id}`}
                                            title={el.movie.title}
                                        >
                                            <p className={styles.id}>
                                                #{allRecords.records.length - i}
                                            </p>
                                            <p className={styles.title}>
                                                {el.movie.title}
                                            </p>
                                            <p className={styles.date}>
                                                {formatDateEU(el.created_at)}
                                            </p>
                                        </Link>

                                        {multipleSelection ? (
                                            <div className={styles.btnWrap}>
                                                <InputCheckbox
                                                    key={
                                                        `records selection ` +
                                                        el.id
                                                    }
                                                    id="checkbox"
                                                    checked={
                                                        recs &&
                                                        recs.includes(el.id)
                                                    }
                                                    value={JSON.stringify(el)}
                                                    onChange={(e) =>
                                                        updateRecs(
                                                            el.id,
                                                            e.target.checked
                                                        )
                                                    }
                                                    defaultChecked={false}
                                                    customStyles={customStyles}
                                                />
                                            </div>
                                        ) : (
                                            <div className={styles.btnWrap}>
                                                <Button
                                                    onClick={() =>
                                                        handleOpenRecordForm(el)
                                                    }
                                                    size="x-small"
                                                    icon={<IconAdd />}
                                                    // label={"Edit"}
                                                    customStyles={customStyles}
                                                />

                                                <Button
                                                    onClick={() =>
                                                        handleDeleteRecordForm(
                                                            el
                                                        )
                                                    }
                                                    size="x-small"
                                                    icon={<IconTrash />}
                                                    // label={"X"}
                                                    customStyles={customStyles}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div> */}

                        <List
                            listTitle={"MOVIES"}
                            listLength={allRecords.moviesRecords.length}
                            data={allRecords.moviesRecords}
                            rowSize={"large"}
                            handleRouting={handleRouting}
                            customStyles={customStyles}
                        />
                        {/* <div className={styles.infoWrap}>
                            <div className={styles.infoHeadingWrap}>
                                <h3>MOVIES</h3>
                                <span>{`(${allRecords.moviesRecords.length})`}</span>
                            </div>

                            <div className={styles.recordsWrap}>
                                {allRecords.moviesRecords.map((el, i) => (
                                    <div
                                        key={el.id}
                                        className={styles.recordRowLarge}
                                    >
                                        <Link
                                            href={`/el/movie/${el.id}`}
                                            title={el.title}
                                        >
                                            <p className={styles.id}>
                                                #{i + 1}
                                            </p>
                                            <div
                                                className={
                                                    styles.doubleLineTitle
                                                }
                                            >
                                                <p className={styles.title}>
                                                    {el.title}
                                                </p>
                                                <p className={styles.actors}>
                                                    {el.actors &&
                                                        el.actors.map(
                                                            (el, i) => (
                                                                <span
                                                                    key={
                                                                        el.name +
                                                                        i
                                                                    }
                                                                >
                                                                    • {el.name}{" "}
                                                                </span>
                                                            )
                                                        )}
                                                </p>
                                            </div>

                                            <p className={styles.total}>
                                                x {el.totalRecords}
                                            </p>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                         
                        </div> */}

                        <List
                            listTitle={"ACTORS"}
                            listLength={allRecords.actorsRecords.length}
                            data={allRecords.actorsRecords}
                            handleRouting={handleRouting}
                            customStyles={customStyles}
                        />

                        {/* <div className={styles.infoWrap}>
                            <div className={styles.infoHeadingWrap}>
                                <h3>ACTORS</h3>
                            </div>

                            <div className={styles.recordsWrap}>
                                {allRecords.actorsRecords.map((el, i) => (
                                    <div
                                        key={el.id}
                                        className={styles.recordRowLarge}
                                    >
                                        <Link
                                            href={`/el/actor/${el.id}`}
                                            title={el.name}
                                        >
                                            <p className={styles.id}>
                                                #{i + 1}
                                            </p>

                                            <p className={styles.title}>
                                                {el.name}
                                            </p>

                                            <p className={styles.total}>
                                                x {el.totalRecords}
                                            </p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div> */}

                        <List
                            listTitle={"TAGS"}
                            listLength={allRecords.tagsRecords.length}
                            data={allRecords.tagsRecords}
                            handleRouting={handleRouting}
                            customStyles={customStyles}
                        />
                        {/* <div className={styles.infoWrap}>
                            <div className={styles.infoHeadingWrap}>
                                <h3>TAGS</h3>
                            </div>

                            <div className={styles.recordsWrap}>
                                {allRecords.tagsRecords.map((el, i) => (
                                    <div
                                        key={el.id}
                                        className={styles.recordRowLarge}
                                    >
                                        <Link
                                            href={`/el/tag/${el.id}`}
                                            title={el.name}
                                        >
                                            <p className={styles.id}>
                                                #{i + 1}
                                            </p>

                                            <p className={styles.title}>
                                                {el.name}
                                            </p>

                                            <p className={styles.total}>
                                                x {el.totalRecords}
                                            </p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div> */}

                        <List
                            listTitle={"CATEGORIES"}
                            listLength={allRecords.categoriesRecords.length}
                            data={allRecords.categoriesRecords}
                            handleRouting={handleRouting}
                            customStyles={customStyles}
                        />
                        {/* <div className={styles.infoWrap}>
                            <div className={styles.infoHeadingWrap}>
                                <h3>CATEGORIES</h3>
                            </div>

                            <div className={styles.recordsWrap}>
                                {allRecords.categoriesRecords.map((el, i) => (
                                    <div
                                        key={el.id}
                                        className={styles.recordRowLarge}
                                    >
                                        <Link
                                            href={`/el/category/${el.id}`}
                                            title={el.name}
                                        >
                                            <p className={styles.id}>
                                                #{i + 1}
                                            </p>

                                            <p className={styles.title}>
                                                {el.name}
                                            </p>

                                            <p className={styles.total}>
                                                x {el.totalRecords}
                                            </p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </section>

                    <section
                        className={`${styles.section} ${styles.graphsGrid}`}
                    >
                        <div className={styles.graphWrap}>
                            <div className={styles.infoHeadingWrap}>
                                <h3>GRAPHIC 1</h3>
                            </div>
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

            {/* 🔴 NOT WORKING: FIX 🔴 */}
            {/*  🧠 Maybe we should move this to Layout or something.. like Form */}
            {/* <Modal
                isOpen={openForm}
                onClose={() => setOpenForm(false)}
                customStyles={customStyles}
            >
                <Form
                    formLabel={!multipleSelection ? "record" : "records"}
                    propsData={!multipleSelection ? rec : recs}
                    handleEditsInParent={handleEdits}
                    setOpenForm={setOpenForm}
                />
            </Modal> */}

            {/* {openForm && (
                <div className={styles.overlay}>
                    <div className={styles.formWrapContainer}>
                        {!multipleSelection ? (
                            <Form
                                formLabel={"record"}
                                propsData={rec}
                                handleEditsInParent={handleEdits}
                                setOpenForm={setOpenForm}
                            />
                        ) : (
                            <Form
                                formLabel={"records"}
                                propsData={recs}
                                handleEditsInParent={handleEdits}
                                setOpenForm={setOpenForm}
                            />
                        )}
                    </div>
                </div>
            )} */}
        </main>
    );
}
