import styles from "@/src/domains/_app/components/Drawer/Drawer.module.css";

export default function Drawer({ children, isOpen, closeDrawer, title }) {
    return (
        <div
            id={styles.Drawer}
            style={{
                transform: isOpen
                    ? "translateX(calc(100vw - 350px))"
                    : "translateX(100vw)",
            }}
        >
            <div className={styles.heading}>
                <h2>{title}</h2>
            </div>
            <div className={styles.body}>{children}</div>
        </div>
    );
}
