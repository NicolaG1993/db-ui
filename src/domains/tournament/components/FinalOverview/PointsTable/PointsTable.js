import styles from "@/src/domains/tournament/Tournament.module.css";

let calcPosition = (cont, position, prevCont) =>
    cont.vote === prevCont.vote ? "-" : position;

export default function PointsTable({ table }) {
    return (
        <div className={styles.finalTable}>
            <span>Final table: </span>
            <div className={styles.table}>
                <div className={styles.finalOverviewContender}>
                    <div>
                        <span>Pos.</span>
                        <span>ID</span>
                        <span>Title</span>
                    </div>
                    <span>Points ↓</span>
                </div>

                {table.map((cont, i) => (
                    <div
                        key={"Final table contender " + cont.id}
                        className={styles.finalOverviewContender}
                    >
                        <div>
                            <span>
                                {i > 0
                                    ? calcPosition(cont, i + 1, table[i - 1])
                                    : 1}
                            </span>
                            <span>#{cont.id}</span>
                            <span>{cont.title}</span>
                        </div>
                        <span>{cont.vote}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
