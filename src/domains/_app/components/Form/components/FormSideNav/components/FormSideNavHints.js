export default function FormSideNavHints({
    hints,
    handleSubmitMissingHints,
    handleHintsModal,
}) {
    console.log("⬜ FormSideNavHints: ", { hints });
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
                                    handleHintsModal([], hints.removed)
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
                                    handleHintsModal(hints.missing, [])
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
