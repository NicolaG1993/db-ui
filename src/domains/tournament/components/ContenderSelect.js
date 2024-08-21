import styles from "@/src/domains/tournament/Tournament.module.css";
// import {
//     selectTournamentSetup,
//     updateFirstStage,
//     selectNotSelectedData,
//     updateNotSelectedData,
// } from "@/src/application/redux/slices/tournamentSlice";
import { useState } from "react";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function ContenderSelect({
    currentContender,
    currentContenderIndex,
    match,
    stageMatches,
    refreshSelectNav,
    closeSelectNav,
    isRightSide,
    setup,
    notSelectedData,
    handleUpdateSelected,
    handleUpdateUnselected,
    customStyles,
}) {
    // const dispatch = useDispatch();
    // DATA:
    // SessionUiElements
    // SessionUiElementsAvailable
    //
    const [ui, setUI] = useState();
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

        handleUpdateSelected({ newCurrentMatch });
        handleUpdateUnselected(currentContender);

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
        let newMatchContenders = [...match.contenders];
        newMatchContenders[currentContenderIndex] = newContender;
        const newCurrentMatch = { ...match, contenders: newMatchContenders };

        // update first stage
        handleUpdateSelected({ newCurrentMatch });
        // ✅ update notSelectedData
        handleUpdateUnselected(newContender);

        // dispatch(
        //     updateFirstStage({
        //         newCurrentMatch,
        //     })
        // );

        // dispatch(
        //     updateNotSelectedData({
        //         toRemove: newContender,
        //     })
        // );

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
        let newMatchContenders = [...match.contenders];
        newMatchContenders[firstIndex] = selectedMatch.contenders[secondIndex];

        let newSelectedContenders = [...selectedMatch.contenders];
        newSelectedContenders[secondIndex] = match.contenders[firstIndex];

        console.log("handleSwitch END: ", {
            current: { ...match, contenders: newMatchContenders },
            selected: { ...selectedMatch, contenders: newSelectedContenders },
        });

        // create new first stage
        const newFirstStage = {};
        // dispatch update first matches
        // update matches in UI
        handleUpdateSelected({
            newCurrentMatch: { ...match, contenders: newMatchContenders },
            newSelectedMatch: {
                ...selectedMatch,
                contenders: newSelectedContenders,
            },
        });

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
                        <Button
                            size="medium"
                            type="button"
                            label="Confirm"
                            customStyles={customStyles}
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
                        />
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
                    <Button
                        size="medium"
                        type="button"
                        label="Remove"
                        customStyles={customStyles}
                        disabled={!currentContender} // not working 🔴
                        onClick={() =>
                            handleRemove({
                                currentContender,
                                currentContenderIndex,
                                match,
                                matchId: match.matchId,
                            })
                        }
                    />
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
