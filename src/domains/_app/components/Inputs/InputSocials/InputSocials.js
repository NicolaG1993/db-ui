import { useState } from "react";
import styles from "@/src/domains/_app/components/Inputs/InputSocials/InputSocials.module.css";

const socialOptions = [
    { name: "-", value: null },
    { name: "Instagram", value: "instagram" },
    { name: "X", value: "twitter" },
];

export default function InputSocials({
    // topic,
    // topicID,
    // formState,
    // setFormState,
    // errors,
    formState,
    setFormState,
}) {
    console.log("InputSocials props: ", {
        // topic,
        // topicID,
        // formState,
        // setFormState,
        // errors,
        formState,
        setFormState,
    });

    const [newSocialInput, setNewSocialInput] = useState(false);
    const [newSocialUrl, setNewSocialUrl] = useState("");
    const [newSocialType, setNewSocialType] = useState();

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
            setFormState(newSocialUrl, newSocialType);
        } else {
            // add to array of other urls
            formState.moreUrls
                ? setFormState(
                      [...formState.moreUrls, newSocialUrl],
                      "moreUrls"
                  )
                : setFormState([newSocialUrl], "moreUrls");
        }

        setNewSocialInput(false);
        setNewSocialUrl("");
        setNewSocialType();
    };

    const handleDeleteSocial = (type, i, urlsArray) => {
        if (urlsArray) {
            // here we delete from url array
            const newArray = urlsArray.filter((el, index) => index !== i);
            setFormState(newArray, type);
        } else {
            // here we delete the others
            setFormState(null, type);
        }
    };

    return (
        <>
            {newSocialInput ? (
                <>
                    <div>
                        <div className={styles.inputWrap}>
                            <input
                                type="text"
                                name="newSocialUrl"
                                id="NewSocialUrl"
                                maxLength="50"
                                // onChange={(e) =>
                                //     updateFormState(
                                //         e.target.value,
                                //         e.target.name
                                //     )
                                // }
                                // onBlur={(e) => validateData(e)}
                                // value={formState.newSocialUrl}
                                value={newSocialUrl ? newSocialUrl : ""}
                                onChange={(e) =>
                                    setNewSocialUrl(e.target.value)
                                }
                            />
                            <select
                                name="newSocialType"
                                id="NewSocialType"
                                // onChange={(e) =>
                                //     updateFormState(
                                //         e.target.value,
                                //         e.target.name
                                //     )
                                // }
                                value={newSocialType}
                                onChange={(e) =>
                                    setNewSocialType(e.target.value)
                                }
                            >
                                {filteredOptions(socialOptions, formState).map(
                                    (el) => (
                                        <option
                                            value={el.value}
                                            key={"option: " + el.value}
                                        >
                                            {el.name}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        <div className={styles.buttonsWrap}>
                            <button
                                type="button"
                                onClick={() => toggleNewSocialInput()}
                                className="button-standard"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    handleSubmitNewSocial(
                                        newSocialUrl,
                                        newSocialType
                                    )
                                }
                                className="button-standard"
                            >
                                Add social
                            </button>
                        </div>
                    </div>
                    {/* {errors?.social && (
                        <div className={"form-error"}>{errors.social}</div>
                    )} */}
                </>
            ) : (
                <button
                    className={styles.openInputBtn}
                    type="button"
                    onClick={() => toggleNewSocialInput()}
                >
                    +
                </button>
            )}

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
            </div>
        </>
    );
}

const SocialElement = ({ name, deleteElement }) => (
    <div className={styles.socialElement}>
        <p>{name}</p>
        <p onClick={() => deleteElement()}>X</p>
    </div>
);
