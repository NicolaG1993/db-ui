import styles from "@/src/domains/tournament/Tournament.module.css";
import {
    selectTournamentSetup,
    updateFirstStage,
    selectNotSelectedData,
    updateNotSelectedData,
} from "@/src/application/redux/slices/tournamentSlice";
import { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export default function ContenderSelect({
    currentContender,
    currentContenderIndex,
    match,
    stageMatches,
    refreshSelectNav,
    closeSelectNav,
    isRightSide,
}) {
    const dispatch = useDispatch();
    // DATA:
    // SessionUiElements
    // SessionUiElementsAvailable
    //
    const [ui, setUI] = useState();
    const setup = useSelector(selectTournamentSetup, shallowEqual);
    const notSelectedData = useSelector(selectNotSelectedData, shallowEqual);
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

    const handleRemove = ({
        currentContender,
        currentContenderIndex,
        match,
        matchId,
    }) => {
        const newMatchContenders = [...match.contenders].map((cont, i) =>
            i === currentContenderIndex ? null : cont
        );
        // cont.id === currentContender.id ? null : cont
        const newCurrentMatch = { ...match, contenders: newMatchContenders };

        dispatch(
            updateFirstStage({
                newCurrentMatch,
            })
        );

        dispatch(
            updateNotSelectedData({
                toAdd: currentContender,
            })
        );

        closeSelectNav();
        // refreshSelectNav({ contender: null });
    };

    const handleAddNew = ({
        currentContender,
        currentContenderIndex,
        newContender,
        match,
        currentIndex,
    }) => {
        // create new match
        console.log("handleAddNew: ", {
            currentContender,
            currentContenderIndex,
            newContender,
            match,
            currentIndex,
        });
        // DATA:
        // CURRENT MATCH
        // MATCH CONTENDER INDEX
        // NEW CONTENDER
        // -> Replace currentMatch[index] con newContender

        // FIX or CHANGE: 👇🔴👇🔴👇🔴
        /*
        const newMatchContenders = [...match.contenders].map((cont, i) => {
            if (!cont) {
                // ... test
                if (i === currentContenderIndex) {
                    return newContender; // ... test
                } else {
                    return null; // ... test
                }
            } else {
                if (cont.id === currentContender.id) {
                    return newContender;
                } else {
                    return cont;
                }
            }
        });
        */
        let newMatchContenders = [...match.contenders];
        newMatchContenders[currentContenderIndex] = newContender;
        const newCurrentMatch = { ...match, contenders: newMatchContenders };

        // update first stage
        dispatch(
            updateFirstStage({
                newCurrentMatch,
            })
        );

        // ✅ update notSelectedData
        dispatch(
            updateNotSelectedData({
                toRemove: newContender,
            })
        );

        closeSelectNav();
        // refreshSelectNav({ contender: newContender });
    };

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

        // create new first stage
        const newFirstStage = {};
        // dispatch update first matches
        // update matches in UI
        dispatch(
            updateFirstStage({
                newCurrentMatch: { ...match, contenders: newMatchContenders },
                newSelectedMatch: {
                    ...selectedMatch,
                    contenders: newSelectedContenders,
                },
            })
        );
        // close or update nav
        // refreshSelectNav({ contender: currentContender });
        closeSelectNav();
    };

    // RENDER UI
    const renderUi = ({ currentContender, firstStageTotMatches }) => {
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
                const selectedMatch = stageMatches[`${optionSelected}`];
                console.log("generateContenderOptions: ", {
                    stageMatches,
                    optionSelected,
                    selectedMatch,
                });
                // extract match contenders slots
                // map trough them
                // create options for the select (both in use and empty)
                const contenderOptions = [];
                selectedMatch.contenders?.map((contender, i) =>
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
                                    firstIndex: currentContenderIndex,
                                    // firstIndex: currentContender.index,
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
        } else if (ui === "add") {
            return (
                <div className={styles.navMatchBody}>
                    {notSelectedData ? (
                        <>
                            <span>Select contender: </span>
                            <div className={styles.contenderSelectorWrap}>
                                {notSelectedData.map((cont) => (
                                    <p
                                        key={"not selected conteder " + cont.id}
                                        onClick={() =>
                                            handleAddNew({
                                                currentContender,
                                                currentContenderIndex,
                                                newContender: cont,
                                                match,
                                            })
                                        }
                                    >
                                        {cont.title}
                                    </p>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>No contenders left</p>
                    )}

                    <span
                        className={styles.fakeBtn + " " + "button-standard"}
                        onClick={() => handleUI()}
                    >
                        Close
                    </span>
                </div>
            );
        } else {
            return (
                <div className={styles.navMatchBody}>
                    {currentContender && (
                        <span
                            className={styles.fakeBtn + " " + "button-standard"}
                            onClick={() => handleUI("switch")}
                        >
                            Switch
                        </span>
                    )}
                    <span
                        className={styles.fakeBtn + " " + "button-standard"}
                        onClick={() => handleUI("add")}
                    >
                        Add
                    </span>
                    <button
                        className="button-standard"
                        type="button"
                        disabled={!currentContender} // not working 🔴
                        onClick={() =>
                            handleRemove({
                                currentContender,
                                currentContenderIndex,
                                match,
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
        <div
            className={styles.contenderSelectNav}
            style={isRightSide ? { right: "100%" } : { left: "100%" }}
        >
            <div className={styles.navMatchInfo}>
                <span>Match: {match.matchId}</span>
                {currentContender && (
                    <span>Contender: {currentContender.id}</span>
                )}
            </div>
            {renderUi({ currentContender, firstStageTotMatches })}
        </div>
    );
}
