import Link from "next/link";
import styles from "./ShortListBar.module.css";

export default function ShortListBar({ tableName }) {
    return (
        <div className={styles.displayHeading}>
            <h4>Latest {tableName}</h4>
            <Link href={`/all/${tableName}`}>See all</Link>
        </div>
    );
}
