import Link from "next/link";
import styles from "@/src/application/styles/Element.module.css";

const renderLinks = (obj, label) =>
    obj ? (
        Object.entries(obj)
            .sort()
            .map(([key, arr], i) => {
                return (
                    <div key={key}>
                        <div className={styles.tagLabel}>{key}</div>
                        <div>
                            {arr.map((el) => (
                                <Link
                                    href={`/el/${label}/${el.id}`}
                                    key={label + " " + el.id}
                                    className={styles.tagEl}
                                >
                                    {el.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            })
    ) : (
        <p>N/A</p>
    );

export default renderLinks;
