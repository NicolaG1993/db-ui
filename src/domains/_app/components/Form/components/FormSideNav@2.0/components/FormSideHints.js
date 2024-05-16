import { useAppSelector } from "@/src/application/redux/lib/hooks";
import {
    acceptMissingHints,
    acceptRemovedHints,
    selectFormStoreHints,
    selectFormStoreUI,
    closeHintsNav,
    selectFormState,
    updateHints,
    concludeDrawer,
    selectFormSideNavSelected,
    closeDrawer,
    concludeDrawerAfterHints,
} from "@/src/application/redux/slices/formSlice";
import { useEffect } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import styles from "@/src/domains/_app/components/Form/components/Form.module.css";
import Element from "@/src/domains/all/components/Filters/InputsSelector/components/Element";

export default function FormSideHints() {
    const dispatch = useDispatch();
    //  let uiState = useAppSelector(selectFormStoreUI, shallowEqual);
    let hints = useAppSelector(selectFormStoreHints, shallowEqual);
    const formState = useAppSelector(selectFormState, shallowEqual);
    const currentSelection = useAppSelector(selectFormSideNavSelected);

    console.log("⬜ FormSideHints: ", {
        hints,
        formState: formState.tags, // used as original ref for removed tags
        currentSelection, // used as original ref for missing tags
    });
    // potremmo aggiungere anche un'altra lista: "Suggested tags"

    const handleSubmitMissingHints = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

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

        // 🟢 non posso passare formData // devo fare un parse apposta prima
        let parsedForm = [];
        for (const value of formData.values()) {
            console.log("handleSubmitMissingHints: ", {
                target: e.target,
                formDataValue: JSON.parse(value),
            });
            parsedForm.push(JSON.parse(value));
        }

        // dispatch(acceptMissingHints(parsedForm));
        dispatch(acceptMissingHints({ parsedForm }));

        // SPIKE: RESET OR STORE FILTERS LEFT BEHIND? 🧠
        // ...
    };

    // NOT USED: IMPLEMENT! (BUT ONLY FOR ACTOR TAGS)
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
        dispatch(
            updateHints({
                hints: {
                    missingIsFinish: true,
                    // missing: [],
                    // removed: hints.removed,
                },
            })
        );
    };

    const handleSkipRemovedHints = (hints) => {
        dispatch(
            updateHints({
                hints: {
                    missingIsFinish: true,
                    // missing: hints.missing,
                    // removed: [],
                },
            })
        );
    };

    const closeHintsDrawer = () => {
        dispatch(concludeDrawerAfterHints());
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

                {/* 🧠 evidenzia le decisioni da added (green) e removed (red) 🧠 */}
                <div>
                    {hints?.finalDecision?.map((t) => (
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

                        /*
                        <div key={`hint removed ` + el.id}>
                            <input
                                type="checkbox"
                                id={el.id}
                                name={el.name}
                                value={JSON.stringify(el)}
                                // defaultChecked
                            />
                            <label htmlFor={el.name}>{el.name}</label>
                        </div>
                        */
                    ))}
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
                <button
                    title="Confirm Tags"
                    type="button"
                    onClick={closeHintsDrawer}
                    className="button-standard"
                >
                    Continue
                    {/* Confirm Tags */}
                </button>
            </div>
        </div>
    );
}
