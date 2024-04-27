import styles from "./RelationsList.module.css";
import dataStructureGroups from "@/src/application/settings/dataStructureGroups";
import Card from "@/src/domains/_app/components/Card/Card";

export default function RelationsList({ data, listGroup }) {
    let table = dataStructureGroups[listGroup];
    return (
        <div className={styles.relationList}>
            <div className={styles.relationsGrid}>
                {data.map((el, i) => (
                    <Card
                        key={`RelationsList ${el[table.nameType]} ${i}`}
                        cardKey={`RelationsList ${el[table.nameType]} ${i}`}
                        table={table}
                        obj={el}
                    />
                ))}
            </div>
        </div>
    );
}
