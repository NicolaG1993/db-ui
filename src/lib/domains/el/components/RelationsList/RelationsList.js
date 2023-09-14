import styles from "./RelationsList.module.css";
import dataArchitectureObj from "@/utils/custom/dataStructureGroups";
import Card from "../../../_app/components/Card/Card";

export default function RelationsList({ data, listGroup }) {
    let table = dataArchitectureObj[listGroup];

    return (
        <div className={styles.relationList}>
            <div className={styles.relationsGrid}>
                {data.map((el, i) => (
                    <Card
                        key={`FullListContent ${el[table.nameType]} ${i}`}
                        table={table}
                        obj={el}
                    />
                ))}
            </div>
        </div>
    );
}
