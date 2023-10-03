import styles from "./ShortList.module.css";
import ShortListBar from "./ShortListBar";
import dataStructureGroups from "@/utils/custom/dataStructureGroups";
import Card from "../Card/Card";

export default function ShortList({ data, tableName }) {
    let table = dataStructureGroups[tableName];

    return (
        <div className={styles.display}>
            <ShortListBar tableName={tableName} />
            <div className={styles.shortListGrid} id={styles.ShortListGrid}>
                {data ? (
                    data.map((el) => (
                        <Card
                            obj={el}
                            table={table}
                            key={tableName + " ShortList " + el.id}
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
