// import Link from "next/link";
import styles from "@/src/domains/_app/constants/components/SessionPlaylist/SessionPlaylist.module.css";
import { useRouter } from "next/router";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function PlaylistTopBar({
    totalRows,
    size,
    deletePlaylist,
    shufflePlaylist,
    handleParentUI,
}) {
    const router = useRouter();
    if (size === "widget") {
        return (
            <div className={styles["nav-btn"]}>
                <Button
                    size="mini"
                    type="button"
                    label=" Shuffle ♾️"
                    customStyles={customStyles}
                    onClick={() => shufflePlaylist()}
                    disabled={!totalRows}
                />
                <Button
                    size="mini"
                    type="button"
                    label=" Editor ➡️"
                    customStyles={customStyles}
                    onClick={() => {
                        handleParentUI("WIDGET", false);
                        router.push("/el/playlist/editor");
                    }}
                    disabled={!totalRows}
                />
                {/* <Button
                    size="mini"
                    type="button"
                    label=" Save 💾"
                    customStyles={customStyles}
                    onClick={() => handleParentUI("SAVE_PLAYLIST", true)}
                    disabled={!totalRows}
                    /> 
                */}
                <Button
                    size="mini"
                    type="button"
                    label=" Add new ➕"
                    customStyles={customStyles}
                    onClick={() => handleParentUI("ADD_NEW", true)}
                />
                <Button
                    size="mini"
                    type="button"
                    label=" Delete ❌"
                    customStyles={customStyles}
                    onClick={() => deletePlaylist()}
                    disabled={!totalRows}
                />
            </div>
        );
    } else {
        return (
            <div className={styles["nav-btn"]}>
                <Button
                    size="mini"
                    type="button"
                    label=" Shuffle ♾️"
                    customStyles={customStyles}
                    onClick={() => shufflePlaylist()}
                    disabled={!totalRows}
                />
                <Button
                    size="mini"
                    type="button"
                    label=" Save 💾"
                    customStyles={customStyles}
                    onClick={() => handleParentUI("SAVE_PLAYLIST", true)}
                    disabled={!totalRows}
                />
                <Button
                    size="mini"
                    type="button"
                    label=" Add 🗃️"
                    customStyles={customStyles}
                    onClick={() => router.push("/all/movies")}
                />
                <Button
                    size="mini"
                    type="button"
                    label=" Add new ➕"
                    customStyles={customStyles}
                    onClick={() => handleParentUI("ADD_NEW", true)}
                />
                <Button
                    size="mini"
                    type="button"
                    label=" Delete ❌"
                    customStyles={customStyles}
                    onClick={() => deletePlaylist()}
                    disabled={!totalRows}
                />
            </div>
        );
    }
}
