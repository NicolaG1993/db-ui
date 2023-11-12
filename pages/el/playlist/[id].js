import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUserState } from "@/src/application/redux/slices/userSlice.js";
import Link from "next/link";
import styles from "@/src/application/styles/Records.module.css";
import PlaylistMovie from "@/src/domains/playlists/components/PlaylistMovie/PlaylistMovie.js";
import getPlaylist from "@/src/domains/playlists/actions/getPlaylist.js";

export default function Playlist() {
    const router = useRouter();
    const { id } = router.query;

    let userInfo = useSelector(selectUserState);
    const [playlist, setPlaylist] = useState();

    useEffect(() => {
        if (id) {
            fetchData(id, userInfo.id);
        } else {
            setPlaylist();
        }
    }, [id]);

    const fetchData = async (id, user) => {
        try {
            const res = await getPlaylist(id, user);
            setPlaylist(res);
        } catch (err) {
            console.log("ERROR!", err);
        }
    };

    return (
        <main>
            {playlist ? (
                <>
                    <div className={"heading"}>
                        <h1>{playlist.title}</h1>
                        <Link href={"/all/playlists"} title={"All playlists"}>
                            ← All playlists
                        </Link>
                    </div>

                    <div>
                        {playlist.movies ? (
                            playlist.movies.map((el, i) => (
                                <PlaylistMovie
                                    key={"movie " + el.title + " " + i}
                                    movie={el}
                                />
                            ))
                        ) : (
                            <p>No movies</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading playlist...</p>
            )}
        </main>
    );
}
