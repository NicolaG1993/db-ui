import { selectTournamentFinalOverview } from "@/src/application/redux/slices/tournamentSlice";
import { shallowEqual, useSelector } from "react-redux";
import styles from "@/src/domains/tournament/Tournament.module.css";
import Podium from "./Podium/Podium";
import PointsTable from "./PointsTable/PointsTable";

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
                <PointsTable table={finalOverview.finalTable} />
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
