import { selectTournamentFinalOverview } from "@/src/application/redux/slices/tournamentSlice";
import { shallowEqual, useSelector } from "react-redux";
import styles from "@/src/domains/tournament/Tournament.module.css";
import Podium from "./Podium/Podium";

export default function FinalOverview() {
    const finalOverview = useSelector(
        selectTournamentFinalOverview,
        shallowEqual
    );

    return (
        <div className={styles.finalOverviewWrap}>
            <div className={styles.finalOverviewHeading}>
                <h2>Final Overview</h2>
            </div>

            <div className={styles.podiumWrap}>
                <Podium podium={finalOverview.podium} />
            </div>

            <div className={styles.tableOverviewWrap}>
                <div className={styles.finalTable}>
                    <span>Final table: </span>
                    {/* <span>Da 1 a ultimo</span> */}
                    <div className={styles.table}>
                        <div>
                            <div>
                                <span>Pos.</span>
                                <span>ID</span>
                                <span>Title</span>
                            </div>
                            <span>Points ↓</span>
                        </div>
                        {finalOverview.finalTable.map((cont, i) => (
                            <div key={"Final table contender " + cont.id}>
                                <div>
                                    <span>{i + 1}</span>
                                    <span>#{cont.id}</span>
                                    <span>{cont.title}</span>
                                </div>
                                <span>{cont.vote}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.recordsWrap}>
                <div className={styles.podium}>
                    <p>Records: </p>
                    <p>• Most points</p>
                    <p>• Less points</p>
                    <p>• etc...</p>
                </div>
            </div>
        </div>
    );
}
