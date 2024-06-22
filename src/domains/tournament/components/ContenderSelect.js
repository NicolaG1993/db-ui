import styles from "@/src/domains/tournament/Tournament.module.css";
import {
    selectTournamentSetup,
    updateFirstStage,
} from "@/src/application/redux/slices/tournamentSlice";
import { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export default function ContenderSelect({
    currentContender,
    match,
    stageMatches,
}) {
    const dispatch = useDispatch();
    // DATA:
    // SessionUiElements
    // SessionUiElementsAvailable
    //
    const [ui, setUI] = useState();
    const setup = useSelector(selectTournamentSetup, shallowEqual);
    const { firstStageTotMatches } = setup;
    const [optionSelected, setOptionSelected] = useState();
    const [newContender, setNewContender] = useState();

    if (currentContender) {
        //  console.log("currentContender: ", { currentContender, match });
        // we are replacing or switching
        // replacing from: SessionUi non selected elements + all movies (? maybe ?)
    } else {
        // console.log("NO currentContender: ", match);
        // there is no contender selected already
    }

    const handleUI = (label) => {
        label ? setUI(label) : setUI();
    };

    const handleRemove = ({ currentContender, matchId }) => {};

    const handleSwitch = ({
        match,
        matchId,
        currentContender,
        firstIndex,

        selectedMatch,
        selectedMatchId,
        newContender,
        secondIndex,

        stageMatches,
    }) => {
        // TODO:
        // if selected slot is empty, just move there the current contender
        // manca caso per empty slot // in entrambi i casi
        /*
        let newCurrentMatch = selectedMatch.contenders.map(
            (cont) =>
                // {if() {} else if () {} else {}}

                {
                    if (cont) {
                        if (cont.id === newContender.id) {
                            return ;
                        } else {
                        }
                    } else {
                    }
                }

            // cont && cont.id === currentContender.id ? newContender : cont
        );
        let newSelectedMatch = selectedMatch.contenders.map((cont) =>
            cont && cont.id === newContender.id ? currentContender : cont
        );
        */
        console.log("handleSwitch: ", {
            current: {
                match,
                matchId,
                currentContender,
                firstIndex,
            },
            selected: {
                selectedMatch,
                selectedMatchId,
                newContender,
                secondIndex,
            },
            stageMatches,
        });

        // let newMatch = { ...match };
        let newMatchContenders = [...match.contenders];
        newMatchContenders[firstIndex] = selectedMatch.contenders[secondIndex];
        // newMatch.contenders[firstIndex] = [...selectedMatch.contenders][
        //     secondIndex
        // ];

        // let newSelectedMatch = { ...selectedMatch };
        let newSelectedContenders = [...selectedMatch.contenders];
        newSelectedContenders[secondIndex] = match.contenders[firstIndex];
        // newSelectedMatch.contenders[secondIndex] = [...match.contenders][
        //     firstIndex
        // ];

        console.log("handleSwitch END: ", {
            current: { ...match, contenders: newMatchContenders },
            selected: { ...selectedMatch, contenders: newSelectedContenders },
        });

        //TODO:
        // create new first stage
        const newFirstStage = {};
        // dispatch update first matches
        dispatch(
            updateFirstStage({
                newCurrentMatch: { ...match, contenders: newMatchContenders },
                newSelectedMatch: {
                    ...selectedMatch,
                    contenders: newSelectedContenders,
                },
            })
        );
        // update matches in UI
        // close nav
    };

    // RENDER UI
    const renderUi = ({ firstStageTotMatches }) => {
        console.log("ui: ", ui);
        if (ui === "switch") {
            // Generate options dynamically
            const options = [];
            for (let i = 1; i <= firstStageTotMatches; i++) {
                options.push(
                    <option key={i} value={i}>
                        {i}
                    </option>
                );
            }

            // fn to generate contender options
            const generateContenderOptions = (stageMatches, optionSelected) => {
                // get first match data
                // extract correct match
                const selectedMatch = stageMatches[optionSelected];
                console.log("generateContenderOptions: ", {
                    optionSelected,
                    selectedMatch,
                });
                // extract match contenders slots
                // map trough them
                // create options for the select (both in use and empty)
                const contenderOptions = [];
                selectedMatch.contenders.map((contender, i) =>
                    contenderOptions.push(
                        <option
                            key={"contenderOptions " + (i + 1)}
                            value={i + 1}
                        >
                            {contender
                                ? contender.name || contender.title
                                : `Empty Slot (#${i + 1})`}
                        </option>
                    )
                );
                return contenderOptions;
            };

            return (
                <div className={styles.navMatchBody}>
                    <span>Select match: </span>
                    <select
                        value={optionSelected}
                        onChange={(e) => setOptionSelected(e.target.value)}
                    >
                        {options}
                    </select>
                    {optionSelected && (
                        <select
                            value={newContender}
                            onChange={(e) => setNewContender(e.target.value)}
                        >
                            {generateContenderOptions(
                                stageMatches,
                                optionSelected
                            )}
                        </select>
                    )}
                    {newContender && (
                        <button
                            className="button-standard"
                            type="button"
                            onClick={() =>
                                handleSwitch({
                                    currentContender,
                                    newContender:
                                        stageMatches[optionSelected].contenders[
                                            newContender - 1
                                        ],
                                    match,
                                    selectedMatch: stageMatches[optionSelected],
                                    matchId: match.matchId,
                                    selectedMatchId: optionSelected,
                                    firstIndex: currentContender.index,
                                    secondIndex: newContender - 1,
                                    stageMatches,
                                })
                            }
                        >
                            Confirm
                        </button>
                    )}

                    <span
                        className={styles.fakeBtn + " " + "button-standard"}
                        onClick={() => handleUI()}
                    >
                        Close
                    </span>
                </div>
            );
        } else if (ui === "search") {
            return (
                <div className={styles.navMatchBody}>
                    <span onClick={() => handleUI()}>Close</span>
                </div>
            );
        } else {
            return (
                <div className={styles.navMatchBody}>
                    <span
                        className={styles.fakeBtn + " " + "button-standard"}
                        onClick={() => handleUI("switch")}
                    >
                        Switch
                    </span>
                    <span
                        className={styles.fakeBtn + " " + "button-standard"}
                        onClick={() => handleUI("search")}
                    >
                        Search
                    </span>
                    <button
                        className="button-standard"
                        type="button"
                        onClick={() =>
                            handleRemove({
                                currentContender,
                                matchId: match.matchId,
                            })
                        }
                    >
                        Remove
                    </button>
                </div>
            );
        }
    };

    return (
        <div className={styles.contenderSelectNav}>
            <div className={styles.navMatchInfo}>
                <span>Match: {match.matchId}</span>
                {currentContender && (
                    <span>Contender: {currentContender.id}</span>
                )}
            </div>
            {renderUi({ firstStageTotMatches })}
        </div>
    );
}
