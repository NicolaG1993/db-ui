import styles from "./Tooltip.module.css";

export default function Tooltip({ title, text, visible, position }) {
    return (
        <div
            className={styles.tooltipContainer}
            style={{
                display: visible ? "block" : "none",
                top: `${position.y + 10}px`,
                left: `${position.x + 10}px`,
            }}
        >
            <div className={styles.title}>{title}</div>
            <div className={styles.text}>{text}</div>
        </div>
    );
}
