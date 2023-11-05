import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "@/src/application/styles/Records.module.css";

export default function Playlists() {
    // TODO: shows all playlists and links to them
    return (
        <main>
            <div className={styles.heading}>
                <h1>ALL PLAYLISTS</h1>
            </div>
        </main>
    );
}
