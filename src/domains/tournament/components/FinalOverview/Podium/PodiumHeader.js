import styles from "@/src/domains/tournament/Tournament.module.css";

export default function PodiumHeader() {
    return (
        <div className={styles.finalOverviewContender}>
            <div>
                <span>Pos.</span>
                <span>ID</span>
                <span>Title</span>
            </div>
        </div>
    );
}
