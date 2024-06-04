import { useEffect, useState } from "react";
import componentStyles from "@/src/domains/_app/components/Inputs/InputSocials/InputSocials.module.css";
import inputsStyles from "@/src/domains/_app/components/Inputs/Inputs.module.css";
let styles = { ...inputsStyles, ...componentStyles };
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SocialElement from "./SocialElement";
import InputField from "./InputField";

const countLinks = (formState) => {
    console.log("🔥 countLinks invoked! ", { formState });
    let count = 0;

    if (formState.instagram) {
        count = count + 1;
    }
    if (formState.twitter) {
        count = count + 1;
    }
    if (formState.moreUrls?.length) {
        count = count + formState.moreUrls.length;
    }
    console.log("🔥 countLinks finsh! ", {
        count,
        formState,
    });
    return count;
}; // fai util 🧠

export default function InputSocials({
    name,
    id,
    formState,
    onChange,
    options,
    error,
    placeholder,
    isMandatory,
}) {
    const [newSocialUrl, setNewSocialUrl] = useState("");
    const [newSocialType, setNewSocialType] = useState();
    const [newSocialInput, setNewSocialInput] = useState(false);
    const [totSelected, setTotSelected] = useState(0); // 🧠 implementare useEffect x aggiornare? 🧠

    const toggleNewSocialInput = () => {
        setNewSocialInput((prev) => !prev);
    };

    const filteredOptions = (options, formState) => {
        // if formState contains the looped option, remove it from the options array // SMART ;)
        return options.filter((opt) => !formState[opt.value]);
    };

    const handleSubmitNewSocial = (newSocialUrl, newSocialType) => {
        if (newSocialType) {
            // update actor field
            onChange(newSocialUrl, newSocialType);
        } else {
            // add to array of other urls
            formState.moreUrls
                ? onChange([...formState.moreUrls, newSocialUrl], "moreUrls")
                : onChange([newSocialUrl], "moreUrls");
        }

        setNewSocialInput(false);
        setNewSocialUrl("");
        setNewSocialType();
    };

    useEffect(() => {
        console.log("🔥 formState changes! ", formState);
        setTotSelected(countLinks(formState));
    }, [formState]);

    const handleDeleteSocial = (type, i, urlsArray) => {
        if (urlsArray) {
            // here we delete from url array
            const newArray = urlsArray.filter((el, index) => index !== i);
            onChange(newArray, type);
        } else {
            // here we delete the others
            onChange(null, type);
        }
    };

    const handleChanges = (val, label) => {
        if (label === "url") {
            setNewSocialUrl(val);
        }

        if (label === "type") {
            setNewSocialType(val);
        }
    };

    return (
        <>
            <div className={styles["complex-input-layout"]}>
                <div
                    className={`${
                        error ? styles["input-error"] : styles["input-ready"]
                    } ${styles["input-wrap"]} ${styles["wrap-common-styles"]}`}
                >
                    {newSocialInput ? (
                        <InputField
                            onChange={(val, label) => handleChanges(val, label)}
                            filteredOptions={filteredOptions(
                                options,
                                formState
                            )}
                            newSocialType={newSocialType}
                            newSocialUrl={newSocialUrl}
                            styles={styles}
                            placeholder={placeholder}
                        />
                    ) : (
                        <p>{totSelected} selected</p>
                    )}

                    {/* 🧠 <p>{selected} selected</p> // bisogmna fare il conto di social links in actor form (IG, X, more_links) , si puo fare un component InputCover.js */}
                    <label>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                        {!!isMandatory && "*"}
                    </label>
                </div>

                {newSocialInput ? (
                    <div className={styles["double-button-wrap"]}>
                        <button
                            type="button"
                            onClick={() =>
                                handleSubmitNewSocial(
                                    newSocialUrl,
                                    newSocialType
                                )
                            }
                            className={`button-standard ${styles["layout-button"]}`}
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            onClick={() => toggleNewSocialInput()}
                            className={`button-standard ${styles["layout-button"]}`}
                        >
                            Exit
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => toggleNewSocialInput()}
                        className={`button-standard ${styles["layout-button"]}`}
                        // className={`button-standard ${styles.openInputBtn}`}
                    >
                        New
                    </button>
                )}
            </div>

            {error && <ErrorMessage error={error} />}

            {totSelected > 0 && (
                <div className={styles["input-sub-wrap"]}>
                    {formState.twitter && (
                        <div className={styles["input-sub-wrap-row"]}>
                            <SocialElement
                                name={"X"}
                                deleteElement={() =>
                                    handleDeleteSocial("twitter")
                                }
                            />
                        </div>
                    )}

                    {formState.instagram && (
                        <div className={styles["input-sub-wrap-row"]}>
                            <SocialElement
                                name={"Instagram"}
                                deleteElement={() =>
                                    handleDeleteSocial("instagram")
                                }
                            />
                        </div>
                    )}
                    {formState.moreUrls &&
                        formState.moreUrls.map((url, i) => (
                            <div
                                className={styles["input-sub-wrap-row"]}
                                key={url + " " + i}
                            >
                                <SocialElement
                                    name={url}
                                    deleteElement={() =>
                                        handleDeleteSocial(
                                            "moreUrls",
                                            i,
                                            formState.moreUrls
                                        )
                                    }
                                    key={url + i}
                                />
                            </div>
                        ))}
                </div>
            )}

            {/* 
            <div className={styles.urlsWrap}>
                {formState.twitter && (
                    <SocialElement
                        name={"X"}
                        deleteElement={() => handleDeleteSocial("twitter")}
                    />
                )}
                {formState.instagram && (
                    <SocialElement
                        name={"Instagram"}
                        deleteElement={() => handleDeleteSocial("instagram")}
                    />
                )}
                {formState.moreUrls &&
                    formState.moreUrls.map((url, i) => (
                        <SocialElement
                            name={url}
                            deleteElement={() =>
                                handleDeleteSocial(
                                    "moreUrls",
                                    i,
                                    formState.moreUrls
                                )
                            }
                            key={url + i}
                        />
                    ))}
            </div> */}
        </>
    );
}
