import styles from "@/src/domains/tournament/Tournament.module.css";
import PodiumContender from "./PodiumContender";

export default function Podium({ podium }) {
    return (
        <div className={styles.podium}>
            <span>On the podium: </span>
            <div className={styles.podiumContendersWrap}>
                <PodiumContender pos={1} contender={podium["1"] || undefined} />
                <PodiumContender pos={2} contender={podium["2"] || undefined} />
                <PodiumContender pos={3} contender={podium["3"] || undefined} />
            </div>
        </div>
    );
}
