import styles from "@/src/domains/_app/components/Form/components/Form.module.css";

export default function FormDrawer({ children, isOpen, closeDrawer }) {
    // if isOpen = true open drawer, else close it (animation)
    // the drawer is pure UI wrap, just background, maybe borders - not much
    // maybe possibility to close it
    return (
        <div
            className={styles.sidewrap}
            style={{
                transform: isOpen ? "translateX(0)" : "translateX(66vw)",
            }}
        >
            {children}
        </div>
    );
}
