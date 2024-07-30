import styles from "@/src/domains/_app/components/Drawer/Drawer.module.css";

export default function Drawer({ children, isOpen, closeDrawer }) {
    return (
        <div
            id={styles.Drawer}
            className={styles.sidewrap}
            style={{
                transform: isOpen ? "translateX(66vw)" : "translateX(100vw)",
            }}
        >
            {children}
        </div>
    );
}
