import { useAppSelector } from "@/src/application/redux/lib/hooks";
import {
    acceptMissingHints,
    acceptRemovedHints,
    selectFormStoreHints,
    selectFormStoreUI,
    closeHintsNav,
    selectFormState,
} from "@/src/application/redux/slices/formSlice";
import { useEffect } from "react";
import { shallowEqual, useDispatch } from "react-redux";

export default function FormSideHints() {
    const dispatch = useDispatch();
    //  let uiState = useAppSelector(selectFormStoreUI, shallowEqual);
    let hints = useAppSelector(selectFormStoreHints, shallowEqual);
    const formState = useAppSelector(selectFormState, shallowEqual);

    console.log("⬜ FormSideHints: ", {
        hints,
        formState,
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

        let res = [...formState.tags]; // ! important to use spread here !
        for (const value of formData.values()) {
            console.log("handleSubmitMissingHints: ", {
                target: e.target,
                formDataValue: JSON.parse(value),
            });
            res.push(JSON.parse(value));
        }
        dispatch(acceptMissingHints(res));

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

    useEffect(() => {
        if (!hints.missing.length && !hints.removed.length) {
            dispatch(closeHintsNav());
        }
    }, [hints]);

    return (
        <div>
            {hints.missing?.length > 0 && (
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
                                onClick={() =>
                                    dispatch(
                                        updateHints({
                                            added: [],
                                            removed: hints.removed,
                                        })
                                    )
                                }
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

            {hints.removed?.length > 0 && (
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
                                onClick={() =>
                                    dispatch(
                                        updateHints({
                                            added: hints.missing,
                                            removed: [],
                                        })
                                    )
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
                </>
            )}
        </div>
    );
}
