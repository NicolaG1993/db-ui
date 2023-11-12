import Link from "next/link";
import { useState } from "react";

import styles from "@/src/application/styles/Layout.module.css";

import { useRouter } from "next/router";
import { getRandomMovieID } from "@/src/domains/_app/actions/customFetchers";

export default function Header({ getRandomMovie }) {
    const [menuOpen, seMenuOpen] = useState(false);

    const Menu = () => (
        <div
            className={styles.menuWrap}
            onMouseEnter={() => seMenuOpen(true)}
            onMouseLeave={() => seMenuOpen(false)}
        >
            <ul>
                <li>
                    <Link href="/all/actors">
                        <div>Actors</div>
                    </Link>
                </li>
                <li>
                    <Link href="/all/movies">
                        <div>Movies</div>
                    </Link>
                </li>
                <li>
                    <Link href="/all/studios">
                        <div>Studios</div>
                    </Link>
                </li>
                <li>
                    <Link href="/all/distributions">
                        <div>Distributions</div>
                    </Link>
                </li>
                <li>
                    <Link href="/all/categories">
                        <div>Categories</div>
                    </Link>
                </li>
                <li>
                    <Link href="/all/tags">
                        <div>Tags</div>
                    </Link>
                </li>
                <li>
                    <Link href="/all/nationalities">
                        <div>Nationalities</div>
                    </Link>
                </li>
            </ul>
        </div>
    );

    return (
        <header
            className={styles.header}
            onMouseLeave={() => seMenuOpen(false)}
        >
            <nav>
                <ul>
                    <li
                        onMouseEnter={() => seMenuOpen(false)}
                        onMouseLeave={() => seMenuOpen(false)}
                    >
                        <Link href="/">Home</Link>
                    </li>

                    <li onMouseEnter={() => seMenuOpen(true)}>Collections</li>

                    <li
                        onMouseEnter={() => seMenuOpen(false)}
                        onMouseLeave={() => seMenuOpen(false)}
                    >
                        <Link href="/all/playlists">Your playlists</Link>
                    </li>

                    <li
                        onMouseEnter={() => seMenuOpen(false)}
                        onMouseLeave={() => seMenuOpen(false)}
                    >
                        <Link href="/all/records">Records</Link>
                    </li>

                    <li
                        onMouseEnter={() => seMenuOpen(false)}
                        onMouseLeave={() => seMenuOpen(false)}
                    >
                        <Link href="/search">Search</Link>
                    </li>

                    <li
                        onMouseEnter={() => seMenuOpen(false)}
                        onMouseLeave={() => seMenuOpen(false)}
                    >
                        <p onClick={() => getRandomMovie()}>Random movie</p>
                    </li>

                    <li
                        onMouseEnter={() => seMenuOpen(false)}
                        onMouseLeave={() => seMenuOpen(false)}
                    >
                        <Link href="/admin/dashboard">Dashboard</Link>
                    </li>
                </ul>
            </nav>

            {menuOpen && <Menu />}
        </header>
    );
}
