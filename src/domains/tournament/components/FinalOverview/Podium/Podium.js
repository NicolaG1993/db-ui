import styles from "@/src/domains/tournament/Tournament.module.css";
import PodiumContender from "./PodiumContender";
import PodiumHeader from "./PodiumHeader";

export default function Podium({ podium }) {
    return (
        <div className={styles.podium}>
            <span>On the podium: </span>
            <div className={styles.podiumContendersWrap}>
                <PodiumHeader />
                <PodiumContender pos={1} contender={podium["1"] || undefined} />
                <PodiumContender pos={2} contender={podium["2"] || undefined} />
                <PodiumContender pos={3} contender={podium["3"] || undefined} />
            </div>
        </div>
    );
}
