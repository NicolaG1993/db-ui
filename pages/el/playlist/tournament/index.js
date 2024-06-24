import { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectSessionPlaylist } from "@/src/application/redux/slices/sessionPlaylistSlice";
import {
    updateTournamentData,
    selectTournamentData,
    selectTournamentIsLoaded,
    setupTournament,
} from "@/src/application/redux/slices/tournamentSlice";
import Modal from "@/src/domains/_app/components/Modal/Modal";
import { extractIDs } from "@/src/domains/_app/utils/parsers";
import fetchTournamentData from "@/src/domains/tournament/actions/fetchTournamentData";
import styles from "@/src/domains/tournament/Tournament.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import getInferiorGeometricValues from "@/src/domains/tournament/utils/getInferiorGeometricValues";

// Questa fn serviva per fare un auto-detect of possible table (without leaving weird matchups)
// I believe i can just create the table as it comes and let the user decide how to edit it
/*
const calcGames = (num) => {
    const isEven = num % 2 === 0;
    let playersPerMatch = []; // 2, 3, 4
    let totalMatches = []; // 4, 6, 8, 9, 12, 15?

    let toAdd = 0; // final hint (if necessary)
    let toRemove = 0; // final hint (if necessary)

    const totPairs = isEven ? num / 2 : 0;
    let totTrios = 0;

   
    // se "num" é 12
    // return ["x2", "x3", "x4", "x6", "x6:3", "x8:4:2", ...] 
    // fino a x8 ha senso, poi no // "x6:3" significa prima per 6, poi puo passare anche 3 (ha senso? - forse inutile)
   // bisogna calcolare bene come si comporta lungo i vari gironi
   // // min.4 - max.64 players

    // deve tornare SEMPRE array
    

    ///
    if (isEven) {
        // si possono fare match a 2
        playersPerMatch.push(2);
    }
    if (num % 3 === 0) {
        // si possono fare match a 3
        playersPerMatch.push(3);
        totTrios = n / 3;
    }
    ///

    // bisognerebbe giá calcolare possibili gruppi in base a contenders per match
    // e dividere questi gruppi per le possibili strutture del torneo

    console.log("calcGames result: ", {
        playersPerMatch,
        totalMatches,
        toAdd,
        toRemove,
        totPairs,
        totTrios,
    });
};
*/

export default function TournamentSession() {
    /*
    TODO:
    • ❎ get Session Playlist
       • ❎ get movies full-infos (API Call)
    • 🟨 see which kind of tournament is available (se 8clips, sfide da 2v2 o 4v4 - se 9clips, sfide a 3v3)
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

    const sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);
    const tournamentData = useSelector(selectTournamentData, shallowEqual);
    const isLoaded = useSelector(selectTournamentIsLoaded, shallowEqual);
    const dispatch = useDispatch();
    const router = useRouter();

    // const [gameOptions, setGameOptions] = useState([]);

    const [settingsForm, setSettingsForm] = useState({
        contendersPerMatch: 2,
        totContenders: "",
        order: "index",
    }); // I need to store this after setup

    useEffect(() => {
        if (!!tournamentData.length) {
            // setGameOptions(calcGames(tournamentData.length)); // non metto in redux per ora, credo serva solo all'inizio del torneo, poi user sceglie uno solo
        }
    }, [tournamentData, dispatch]);

    useEffect(() => {
        if (!!sessionPlaylist?.length) {
            const ids = extractIDs(sessionPlaylist);
            // const data = fetchTournamentData(ids)
            fetchTournamentData(ids).then((data) => {
                dispatch(updateTournamentData(data));
            });
        }
    }, [sessionPlaylist, dispatch]);

    const handleSetup = (settingsForm) => {
        // dispatch tournament settings and create first table (to edit)
        dispatch(setupTournament(settingsForm));
        router.push("/el/playlist/tournament/table");
    };

    const renderContendersOptions = (dataLength) => {
        const options = getInferiorGeometricValues(dataLength);
        return options
            .filter((opt) => opt >= 4)
            .map((opt) => (
                <option key={"Contender option " + opt} value={opt}>
                    {opt}
                </option>
            ));
    };

    // console.log("TournamentSession: ", {
    //     sessionPlaylist,
    //     tournamentData,
    //     //  gameOptions,
    // });

    // Create components and save in domain
    return (
        <main id={"TournamentMain"} className={styles.main}>
            <Head>
                <title>{"Tournament"}</title>
                <meta property="og:type" content="website" />
                <meta property="og:title" content={"Tournament"} />
            </Head>

            {tournamentData && isLoaded && (
                <div className={styles.body}>
                    <div className={styles.headingWrap}>
                        <h1 className={styles.title}>
                            Welcome to the Tournament
                        </h1>
                        <p className={styles.subtitle}>
                            {tournamentData.length} items selected
                        </p>
                    </div>

                    <div className={styles.spacer}></div>

                    <div className={styles.rulesWrap}>
                        <p className={styles.heading}>Rules</p>
                        <div className={styles.rules}>
                            <ul className={styles.rulesList}>
                                <li>
                                    <p>Lorem Ipsium</p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum.
                                    </p>
                                </li>
                                <li>
                                    <p>Lorem Ipsium</p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum.
                                    </p>
                                </li>
                                <li>
                                    <p>Lorem Ipsium</p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.objectiveWrap}>
                        <p className={styles.heading}>Your objective</p>

                        <div className={styles.objective}>
                            <div className={styles.bulletPoint}>
                                <p>1 •</p>
                                <p>
                                    Crea il tuo torneo, personalizza le varie
                                    fasi per ottenere la soluzione ideale alle
                                    tue necessitá. Infatti, le tipologie di
                                    torneo variano molto in base al loro numero
                                    di partecipanti totali.
                                </p>
                            </div>
                            <div className={styles.bulletPoint}>
                                <p>2 •</p>
                                <p>
                                    Inizia il torneo gestisci i vari incontri
                                    trammite il tabellone virtuale. Affidati al
                                    fato oppure decidi il risultato delle sfide,
                                    la scelta é tua!
                                </p>
                            </div>
                            <div className={styles.bulletPoint}>
                                <p>3 •</p>
                                <p>
                                    Trova il tuo campione. Sará l&apos;ultimo
                                    contendente rimasto alla fine del torneo.
                                </p>
                            </div>
                        </div>

                        {/* 
                        <p className={styles.heading}>Your session data</p>

                        <div className={styles.contenders}>
                            {tournamentData.map((el, i) => (
                                <p
                                    key={
                                        "Tournament contender: " +
                                        (el.title || el.name)
                                    }
                                >
                                    {i + 1} • {el.title || el.name}
                                </p>
                            ))}
                        </div>
                         */}
                    </div>

                    <div className={styles.settingsWrap}>
                        <p className={styles.heading}>Tournament Settings</p>
                        <div className={styles.settings}>
                            {/* <form
                                onChange={(e) => handleChange(e)}
                                onSubmit={(e) => handleSubmit(e)}
                            >
                                <div>
                                    <label>Contenders per match: </label>
                                    <select>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Contenders per match: </label>
                                    <select>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                            </form> */}

                            <div>
                                <div className={styles.inputWrap}>
                                    <span>Use: </span>
                                    <input
                                        type="checkbox"
                                        id="use"
                                        name="use"
                                        checked
                                        disabled
                                        value={"Session Playlist"}
                                    />
                                    <label htmlFor="use">
                                        {`Session Playlist (${tournamentData.length})`}
                                    </label>
                                </div>
                            </div>

                            <div>
                                <div className={styles.inputWrap}>
                                    <span>Order: </span>
                                    <select
                                        value={settingsForm.order}
                                        onChange={(e) =>
                                            setSettingsForm((prev) => ({
                                                ...prev,
                                                order: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value={"index"}>Index</option>
                                        <option value={"random"} disabled>
                                            Random
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <div className={styles.inputWrap}>
                                    <span>Contenders per Match: </span>
                                    <select
                                        value={settingsForm.contendersPerMatch}
                                        onChange={(e) =>
                                            setSettingsForm((prev) => ({
                                                ...prev,
                                                contendersPerMatch:
                                                    e.target.value,
                                            }))
                                        }
                                    >
                                        <option value={2}>2</option>
                                        <option value={3} disabled>
                                            3
                                        </option>
                                        <option value={4} disabled>
                                            4
                                        </option>
                                        <option value={5} disabled>
                                            5
                                        </option>
                                    </select>
                                </div>
                                {/* 👇 Questa é solo una bozza, si potrebbe migliorare - adirittura aggiungere dynamic messages per nuovi settings futuri */}
                                <p className={styles.settingsHint}>
                                    Suggested for{" "}
                                    {settingsForm.contendersPerMatch % 2 === 0
                                        ? "even"
                                        : "odd"}{" "}
                                    contenders per match
                                </p>
                            </div>

                            <div>
                                <div className={styles.inputWrap}>
                                    <span>Total Contenders: </span>
                                    {/* <input
                                    type="number"
                                    id="contenders"
                                    name="contenders"
                                    checked
                                    disabled
                                    value={tournamentData.length}
                                ></input> */}
                                    <select
                                        value={settingsForm.totContenders}
                                        onChange={(e) =>
                                            setSettingsForm((prev) => ({
                                                ...prev,
                                                totContenders: e.target.value,
                                            }))
                                        }
                                    >
                                        <option
                                            value=""
                                            disabled
                                            label="Please select an option*"
                                        ></option>
                                        {renderContendersOptions(
                                            tournamentData.length
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footerWrap}>
                        <button
                            disabled={
                                !settingsForm.totContenders ||
                                settingsForm.totContenders < 4
                            }
                            onClick={() => handleSetup(settingsForm)}
                            className={`button-standard ${styles.continueBtn}`}
                        >
                            Get Started!
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
