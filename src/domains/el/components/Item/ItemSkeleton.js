import styles from "@/src/application/styles/Element.module.css";
// import Image from "next/image";

export default function ItemSkeleton() {
    return (
        <div className={styles.elWrap}>
            {/* <div className={styles.infoWrap}>
                <div className={styles.picWrap}>
                    <Image
                        src={"/no-image.png"}
                        alt={""}
                        style={{ objectFit: "cover" }}
                        fill
                    />
                </div>

                <div className={styles.underPicWrap}>
                    <h1></h1>
                    <div className={styles.elRow}></div>
                </div>
            </div> */}
        </div>
    );
}
