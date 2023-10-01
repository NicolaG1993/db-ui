import Link from "next/link";
import styles from "./SearchBarResults.module.css";

export default function SearchBarResults({ searchResults, labelA, labelB }) {
    return (
        <div className={styles.resultsBox}>
            {searchResults ? (
                searchResults.groupA.length || searchResults.groupB.length ? (
                    <>
                        <div className={styles.resultsBlock}>
                            <div className={styles.resultsHeading}>
                                <span>
                                    {labelA.charAt(0).toUpperCase() +
                                        labelA.slice(1)}
                                </span>
                                <Link href={`/search`}>
                                    {`${searchResults.groupA.length} results`}
                                </Link>
                            </div>

                            <div className={styles.results}>
                                {searchResults.groupA.slice(0, 8).map((el) => (
                                    <Link
                                        href={`/el/${labelA}/${el.id}`}
                                        key={`${labelA}Search ` + el.id}
                                    >
                                        {el.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className={styles.resultsBlock}>
                            <div className={styles.resultsHeading}>
                                <span>
                                    {labelB.charAt(0).toUpperCase() +
                                        labelB.slice(1)}
                                </span>
                                <Link href={`/search`}>
                                    {`${searchResults.groupB.length} results`}
                                </Link>
                            </div>

                            <div className={styles.results}>
                                {searchResults.groupB.slice(0, 8).map((el) => (
                                    <Link
                                        href={`/${labelB}/${el.id}`}
                                        key={`${labelB}Search ` + el.id}
                                    >
                                        {el.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <p>{"No results :("}</p>
                )
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
