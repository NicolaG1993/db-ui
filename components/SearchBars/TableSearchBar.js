import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

import Filters from "@/components/Filters/Filters";
import styles from "@/styles/Searchbars.module.css";

export default function TableSearchbar({ searchBar, setSearchBar }) {
    return (
        <div className={styles.searchbar}>
            <input
                type="text"
                placeholder="Search something..."
                value={searchBar}
                onChange={setSearchBar}
            ></input>
            <button>SEARCH</button>
        </div>
    );
}
