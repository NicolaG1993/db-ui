import Image from "next/image";
import componentStyles from "@/src/domains/_app/components/Inputs/InputImage/InputImage.module.css";
import inputsStyles from "@/src/domains/_app/components/Inputs/Inputs.module.css";
let styles = { ...inputsStyles, ...componentStyles };

export default function InputImage({
    file,
    onAddFile,
    onDeleteFile,
    height,
    width,
    error,
}) {
    return file ? (
        <div className={styles["form-new-image"]}>
            <Image
                src={file}
                alt={`Picture`}
                fill={!height && !width}
                style={{ objectFit: "cover" }}
                height={height}
                width={width}
            />
            <span
                className={styles["form-delete-image"]}
                onClick={() => onDeleteFile()}
            >
                X
            </span>
        </div>
    ) : (
        <div className={styles["user-image-input"]}>
            <input
                id="FileID"
                type="file"
                name="filename"
                accept="image/png, image/jpeg, image/webp"
                onChange={(e) => onAddFile(e)}
            />
            <label htmlFor="FileID">
                <span>Picture</span>
                <span>Choose a file 📂</span>
            </label>
        </div>
    );
}
