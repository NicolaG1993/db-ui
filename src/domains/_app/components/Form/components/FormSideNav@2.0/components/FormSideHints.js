import { useAppSelector } from "@/src/application/redux/lib/hooks";
import {
    acceptMissingHints,
    acceptRemovedHints,
    selectFormStoreHints,
    selectFormStoreUI,
    closeHintsNav,
    selectFormState,
    skipMissingHints,
    skipRemovedHints,
    concludeDrawer,
    selectFormSideNavSelected,
    closeDrawer,
    concludeDrawerAfterHints,
    selectMissingIsFinish,
    selectRemovedIsFinish,
    selectFormSideNavTopic,
} from "@/src/application/redux/slices/formSlice";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import Element from "@/src/domains/all/components/Filters/InputsSelector/components/Element";

// fare util 🧠
const extractFormData = (formData) => {
    let parsedForm = [];
    for (const value of formData.values()) {
        parsedForm.push(JSON.parse(value));
    }
    return parsedForm;
};

export default function FormSideHints() {
    const dispatch = useDispatch();
    //  let uiState = useAppSelector(selectFormStoreUI, shallowEqual);
    let hints = useAppSelector(selectFormStoreHints, shallowEqual);
    const formState = useAppSelector(selectFormState, shallowEqual);
    const sideNavTopic = useAppSelector(selectFormSideNavTopic, shallowEqual);
    const sideNavSelected = useAppSelector(
        selectFormSideNavSelected,
        shallowEqual
    );
    const currentSelection = useAppSelector(selectFormSideNavSelected);
    const missingIsFinish = useAppSelector(selectMissingIsFinish);
    const removedIsFinish = useAppSelector(selectRemovedIsFinish);

    const [hintsFormsSelected, setHintsFormsSelected] = useState({
        missing: hints.missing,
        removed: [],
    }); // we use this only to display "live!" hints differences selected by user inside div.finalResultWrap

    const savedItems =
        sideNavTopic === "tags" ? sideNavSelected : formState.tags;
    // we meed this condition, becasue we use this also for actors
    // sideNavData.selected va bene per tags hints, ma non x actors hints, in questo caso contiene actors, non tags

    const removedHintsIDs = hintsFormsSelected.removed.map(({ id }) => id);

    console.log("⬜ FormSideHints: ", {
        hints,
        formState: formState.tags, // used as original ref for removed tags
        currentSelection, // used as original ref for missing tags
    });
    // potremmo aggiungere anche un'altra lista: "Suggested tags"

    const handleSubmitMissingHints = (e) => {
        e.preventDefault();

        /*
        // se volessimo salvare anche gli hints non selezionati, possiamo farlo qua
        for (const field of formData) {
            let name = field[0];
            let value = field[1];
            console.log("🌻 field: ", { name, value });
            // ...
        }
        */

        /*
        // let parsedForm = [...formState.tags]; // ! important to use spread here !
        let parsedForm = [...currentSelection]; // ! important to use spread here !
 */

        const formData = new FormData(e.target);
        const parsedForm = extractFormData(formData);

        // dispatch(acceptMissingHints(parsedForm));
        dispatch(acceptMissingHints({ parsedForm })); // 🟢 non posso passare formData // devo fare un parse apposta prima

        // SPIKE: RESET OR STORE FILTERS LEFT BEHIND? 🧠
        // ...
    };

    // USED ONLY FOR ACTOR TAGS so far
    const handleSubmitRemovedHints = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        let res = [];
        for (const value of formData.values()) {
            res.push(JSON.parse(value));
        }
        dispatch(acceptRemovedHints(res));
    };

    const handleSkipMissingHints = (hints) => {
        dispatch(skipMissingHints());
        setHintsFormsSelected((prev) => ({ ...prev, missing: [] }));
    };

    const handleSkipRemovedHints = (hints) => {
        dispatch(skipRemovedHints());
        setHintsFormsSelected((prev) => ({ ...prev, removed: [] }));
        // qui non devo solo rimuoverli ma anche farli diventare bianchi
    };

    const closeHintsDrawer = () => {
        dispatch(concludeDrawerAfterHints());
    };

    const skipAllHints = () => {
        handleSkipMissingHints();
        handleSkipRemovedHints();
    };

    const handleSelectHintsChange = (eventTarget, label) => {
        // e.preventDefault();
        const value = JSON.parse(eventTarget.value);

        console.log("e.target: ", {
            eventTarget: eventTarget,
            "eventTarget.value": value,
            "eventTarget.checked": eventTarget.checked,
            hintsFormsSelected,
        });

        let result = [];
        if (eventTarget.checked) {
            result = [...hintsFormsSelected[label], value]; // value = {id, name}
        } else {
            result = hintsFormsSelected[label].filter(
                ({ id }) => id !== value.id
            );
        }

        setHintsFormsSelected((prev) => ({ ...prev, [label]: result }));
    };

    // useEffect(() => {
    //     if (
    //         !hints.missing.length &&
    //         !hints.removed.length &&
    //         !hints.finalDecision.length
    //     ) {
    //         // dispatch(closeHintsNav());
    //         dispatch(concludeDrawer());
    //     }
    // }, [hints, dispatch]);

    /* 🔴🔴🔴
    PROBLEMA: 
    • acceptMissingHints & acceptRemovedHints actions need to work separate
    • • after that we need to concludeDrawer() -> quindi state.formState.tags
    • • • acceptMissingHints giá fa update di state.formState.tags

    • bisogna avere un eccenzione o nuova versione di concludeDrawer()
    • • per quando viene chiamato dopo acceptMissingHints & acceptRemovedHints

    • NB che peró concludeDrawer() funziona giá con skipHints (nn sn sicuro! testare)
    🔴🔴🔴 */

    console.log("🎸 removedHintsIDs: ", removedHintsIDs);

    return (
        <div id={styles.FormSideHints} className={styles.sidewrap}>
            <div className={styles.nav}>
                <div className={styles.wrapper}>
                    <div className={styles.hintsListWrap}>
                        <div className={styles.hintsListHeader}>
                            <p>Missing tags</p>
                            <p>
                                We have found some new tags for you, select
                                which one to add
                            </p>
                        </div>
                        <div className={styles.hintsListFormWrap}>
                            {hints?.missingIsFinish ? (
                                <div>
                                    <p>✅ DONE</p>
                                </div>
                            ) : !!hints?.missing?.length ? (
                                <form
                                    id="missingHintsForm"
                                    onSubmit={handleSubmitMissingHints}
                                    onChange={(e) =>
                                        handleSelectHintsChange(
                                            e.target,
                                            "missing"
                                        )
                                    }
                                >
                                    <div className={styles.hintsWrap}>
                                        {hints.missing.map((el) => (
                                            <div key={`hint missing ` + el.id}>
                                                <input
                                                    type="checkbox"
                                                    id={el.id}
                                                    name={el.name}
                                                    value={JSON.stringify(el)}
                                                    defaultChecked
                                                />
                                                <label htmlFor={el.name}>
                                                    {el.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {/* 🧠 SKIP POTREBBE SEMPLICEMENTE ELIMINARE HINTS 🧠 */}
                                    <div className={styles.buttonsWrap}>
                                        <button
                                            title="Skip this step"
                                            type="button"
                                            onClick={() =>
                                                handleSkipMissingHints(hints)
                                            }
                                            className="button-standard"
                                            disabled={hints.missingIsFinish}
                                        >
                                            Skip
                                        </button>
                                        {/* 🧠 CONFIRM -> SET I RELATIVI TAGS (INDIPENDENTEMENTE DALL'ALTRO),
                                             XK SE UNO È NUOVO NON SARÀ MAI IN ALTRA COLONNA.
                                             INOLTRE LA LISTA CONFERMATA VIENE BLOCCATA, NON MODIFICABILE.

                                             SE PREMO SU "CONTINUE" INVECE AVRÓ ENTRAMBI FATTI IN AUTOMATICO (UGUALE A SELEZIONE ON RENDER),
                                             PERÓ SE HO GIA CONFERMATO UNA O DUE LISTE LA/LE EVITA

                                             OPPURE "CONTINUE" RESTA DISABLED FINCHÈ NON HO SISTEMATO GLI ALTRI DUE
                                              🧠 */}
                                        <button
                                            title="Confirm your choice"
                                            type="submit"
                                            form="missingHintsForm"
                                            className="button-standard"
                                            disabled={hints.missingIsFinish}
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <p>None</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.wrapper}>
                    <div className={styles.hintsListWrap}>
                        <div className={styles.hintsListHeader}>
                            <p>Removed tags</p>
                            <p>
                                We have found some tags that could be removed,
                                select which one are obsolete
                            </p>
                        </div>
                        <div className={styles.hintsListFormWrap}>
                            {hints?.removedIsFinish ? (
                                <div>
                                    <p>✅ DONE</p>
                                </div>
                            ) : !!hints?.removed?.length ? (
                                <form
                                    id="removedHintsForm"
                                    onSubmit={handleSubmitRemovedHints}
                                    onChange={(e) =>
                                        handleSelectHintsChange(
                                            e.target,
                                            "removed"
                                        )
                                    }
                                >
                                    <div className={styles.hintsWrap}>
                                        {hints.removed.map((el) => (
                                            <div key={`hint removed ` + el.id}>
                                                <input
                                                    type="checkbox"
                                                    id={el.id}
                                                    name={el.name}
                                                    value={JSON.stringify(el)}
                                                    // defaultChecked
                                                />
                                                <label htmlFor={el.name}>
                                                    {el.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.buttonsWrap}>
                                        <button
                                            title="Skip this step"
                                            type="button"
                                            onClick={() =>
                                                handleSkipRemovedHints(hints)
                                            }
                                            className="button-standard"
                                        >
                                            Skip
                                        </button>
                                        <button
                                            title="Confirm your choice"
                                            type="submit"
                                            form="removedHintsForm"
                                            className="button-standard"
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <p>None</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.finalResultWrap}>
                <div className={styles.hintsListHeader}>
                    <p>Final result:</p>
                </div>

                {/* 🧠 🧠 🧠
                
                • ⚪ bianco: tags selected (??? formState.tags o state.sideNavData.selected ???) //
                • 🟢 verde: nuovi tags selezionati da hints.missing
                • 🔴 rosso: tags che saranno eliminati grazie a hints.removed
    
                */}
                <div className={styles.hintsListBody}>
                    {hintsFormsSelected.missing.map((t) => (
                        <p
                            key={
                                "New State Element (isMissing) • value: " + t.id
                            }
                            className={`${styles.finalResultElement} ${styles.missingElement}`}
                        >
                            {"+ " + t.name}
                        </p>
                    ))}

                    {savedItems.map((t) => {
                        if (
                            !!hintsFormsSelected.removed.length &&
                            removedHintsIDs.includes(t.id)
                        ) {
                            return (
                                <p
                                    key={
                                        "New State Element (isRemoved) • value: " +
                                        t.id
                                    }
                                    className={`${styles.finalResultElement} ${styles.removedElement}`}
                                >
                                    {"- " + t.name}
                                </p>
                            );
                        } else {
                            return (
                                // <Element
                                //     key={
                                //         "New State Element (isSelected) • value: " +
                                //         t.id
                                //     }
                                //     it={t}
                                //     styles={styles}
                                //     isSelected={false} // usare per verde e bianco
                                //     viewOnly={true}
                                //     danger={false} // usare per rosso
                                // />
                                <p
                                    key={
                                        "New State Element (isSelected) • value: " +
                                        t.id
                                    }
                                    className={styles.finalResultElement}
                                >
                                    {"• " + t.name}
                                </p>
                            );
                        }
                    })}

                    {/* 🧠 Come faccio ad avere valori live di hints forms ??? before confirming or skipping 
                        💡 Via form onChange() 
                    */}

                    {/*  {hints?.finalDecision?.map((t) => (
                        <Element
                            key={
                                "New State Element (isSelected) • value: " +
                                t.id
                            }
                            it={t}
                            styles={styles}
                            isSelected={true}
                            viewOnly={true}
                        />

                        
                        // <div key={`hint removed ` + el.id}>
                        //     <input
                        //         type="checkbox"
                        //         id={el.id}
                        //         name={el.name}
                        //         value={JSON.stringify(el)}
                        //         // defaultChecked
                        //     />
                        //     <label htmlFor={el.name}>{el.name}</label>
                        // </div>
                       
                    ))} 
                    */}
                </div>
            </div>

            <div className={styles.sideHintsFooter}>
                {/* {!!hints.removed?.length && (
                    <button
                        title="Confirm Tags"
                        type="button"
                        onClick={closeHintsDrawer}
                        className="button-standard"
                    >
                        Confirm Tags
                    </button>
                )} */}

                {!missingIsFinish && !removedIsFinish ? (
                    <button
                        title="Skip all Tags"
                        type="button"
                        onClick={skipAllHints}
                        className="button-standard"
                        disabled={true}
                    >
                        Skip
                    </button>
                ) : (
                    <button
                        title="Confirm Tags"
                        type="button"
                        onClick={closeHintsDrawer}
                        className="button-standard"
                    >
                        Continue
                        {/* Confirm Tags */}
                    </button>
                )}
            </div>
        </div>
    );
}
