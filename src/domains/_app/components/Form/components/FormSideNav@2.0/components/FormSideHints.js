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

export default function FormSideHints() {
    const dispatch = useDispatch();
    //  let uiState = useAppSelector(selectFormStoreUI, shallowEqual);
    let hints = useAppSelector(selectFormStoreHints, shallowEqual);
    const formState = useAppSelector(selectFormState, shallowEqual);
    const currentTags = useAppSelector(selectFormSideNavSelected);

    console.log("⬜ FormSideHints: ", {
        hints,
        formState: formState.tags, // used as original ref for removed tags
        currentTags, // used as original ref for missing tags
    });
    // potremmo aggiungere anche un'altra lista: "Suggested tags"

    const closeHintsDrawer = () => {};

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

        // let res = [...formState.tags]; // ! important to use spread here !
        let res = [...currentTags]; // ! important to use spread here !

        for (const value of formData.values()) {
            console.log("handleSubmitMissingHints: ", {
                target: e.target,
                formDataValue: JSON.parse(value),
            });
            res.push(JSON.parse(value));
        }

        dispatch(acceptMissingHints(res));
        !hints.removed?.length && dispatch(concludeDrawerAfterHints()); // 🔴 non dovró chiamarla qui quando attivo "handleSubmitRemovedHints()"

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

    const handleSkipMissingHints = () => {
        dispatch(
            updateHints({
                hints: {
                    missing: [],
                    removed: hints.removed,
                },
            })
        );
    };

    const handleSkipRemovedHints = () => {
        dispatch(
            updateHints({
                hints: {
                    missing: hints.missing,
                    removed: [],
                },
            })
        );
    };

    const handleConcludeHints = () => {
        dispatch(concludeDrawerAfterHints());
    };

    useEffect(() => {
        if (!hints.missing.length && !hints.removed.length) {
            // dispatch(closeHintsNav());
            dispatch(concludeDrawer());
        }
    }, [hints, dispatch]);

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
        <div>
            {hints?.missing?.length > 0 && (
                <>
                    <p>
                        We have found some new tags for you, select which one to
                        add:
                    </p>
                    <form
                        id="missingHintsForm"
                        onSubmit={handleSubmitMissingHints}
                    >
                        {hints.missing.map((el) => (
                            <div key={`hint missing ` + el.id}>
                                <input
                                    type="checkbox"
                                    id={el.id}
                                    name={el.name}
                                    value={JSON.stringify(el)}
                                    defaultChecked
                                />
                                <label htmlFor={el.name}>{el.name}</label>
                            </div>
                        ))}
                        <div>
                            <button
                                title="Skip this step"
                                type="button"
                                onClick={handleSkipMissingHints}
                                className="button-standard"
                            >
                                Skip
                            </button>
                            <button
                                title="Confirm your choice"
                                type="submit"
                                form="missingHintsForm"
                                className="button-standard"
                            >
                                Confirm
                            </button>
                        </div>
                    </form>
                </>
            )}

            {hints?.removed?.length > 0 && (
                <>
                    <p>
                        We have found some tags that could be removed, select
                        which one are obsolete:
                    </p>
                    <form
                        id="removedHintsForm"
                        onSubmit={handleSubmitMissingHints}
                    >
                        {hints.removed.map((el) => (
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
                        ))}
                        <div>
                            <button
                                title="Skip this step"
                                type="button"
                                onClick={handleSkipRemovedHints}
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
                </>
            )}

            {!!hints.removed?.length && (
                <div>
                    <button
                        title="Confirm Tags"
                        type="button"
                        onClick={handleConcludeHints}
                        className="button-standard"
                    >
                        Confirm Tags
                    </button>
                </div>
            )}
        </div>
    );
}
