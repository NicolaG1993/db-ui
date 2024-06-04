import { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectSessionPlaylist } from "@/src/application/redux/slices/sessionPlaylistSlice";
import {
    updateTournamentData,
    selectTournamentData,
    selectTournamentIsLoaded,
} from "@/src/application/redux/slices/tournamentSlice";
import Modal from "@/src/domains/_app/components/Modal/Modal";
import { extractIDs } from "@/src/domains/_app/utils/parsers";
import fetchTournamentData from "@/src/domains/tournament/actions/fetchTournamentData";
import styles from "@/src/application/styles/Element.module.css";
import Head from "next/head";

export default function TournamentSession() {
    /*
    TODO:
    • ❎ get Session Playlist
       • ❎ get movies full-infos (API Call)
    • ⬜ see which kind of tournament is available (se 8clips, sfide da 2v2 o 4v4 - se 9clips, sfide a 3v3)
    • ⬜ user need to pick an available choice - or go back and modify the SessionPlaylist to use
    • ⬜ clips can be assigned casually, in playlist order + user can decide to swap aech one of them after that (untill tournament starts)
    • 🟨 handle tournament start, restart, resume, quit (redux-store?)
       • ⬜ create tounament table components + page UI
       • ⬜ match card compares main infos about clips of the match
    • ⬜ handle user match decisions
    • ⬜ user can also give ratings about the clips (system like **, *, ++, +, -, ...)
    • 🟧 should we consider re-picking eliminated clips for kinda playoffs? --Forse in futuro
    • ⬜ Handle and render final result 
    */

    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);
    let tournamentData = useSelector(selectTournamentData, shallowEqual);
    let isLoaded = useSelector(selectTournamentIsLoaded, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!!sessionPlaylist?.length) {
            const ids = extractIDs(sessionPlaylist);
            // const data = fetchTournamentData(ids)
            fetchTournamentData(ids).then((data) => {
                dispatch(updateTournamentData(data));
            });
        }
    }, [sessionPlaylist, dispatch]);

    console.log("TournamentSession: ", { sessionPlaylist, tournamentData });

    return (
        <main id={"ElMain"} className={styles.main}>
            <Head>
                <title>{"Tournament"}</title>
                <meta property="og:type" content="website" />
                <meta property="og:title" content={"Tournament"} />
            </Head>

            <h1>Welcome to the tournament</h1>

            {tournamentData &&
                isLoaded &&
                tournamentData.map((el, i) => (
                    <p key={"Tournament contender: " + (el.title || el.name)}>
                        {i + 1} • {el.title || el.name}
                    </p>
                ))}
        </main>
    );
}
