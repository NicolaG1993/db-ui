import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

import { parseTagsForUiList } from "@/utils/custom/customParsers";
import { formatDateEU, getAge } from "@/utils/convertTimestamp";
import styles from "@/styles/Element.module.css";

import ActorForm from "@/components/Forms/Content/ActorForm";
import Form from "@/components/Forms/Form";

export default function Actor() {
    //================================================================================
    // Component State
    //================================================================================
    const [openForm, setOpenForm] = useState(false);
    const [parsedObj, setParsedObj] = useState(false);
    const [actor, setActor] = useState();
    const [actorInfos, setActorInfos] = useState();
    const router = useRouter();
    const { id } = router.query;

    //================================================================================
    // UseEffects
    //================================================================================
    useEffect(() => {
        console.log("id!", id);
        if (id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {
        if (actor) {
            if (actor.tags && actor.tags.length) {
                setParsedObj((obj) => ({
                    ...obj,
                    tags: parseTagsForUiList(actor.tags),
                }));

                // invoke here setState for actorInfos to render in UI - best place to do it!
                extractActorInfos();
            }
            if (actor.categories && actor.categories.length) {
                setParsedObj((obj) => ({
                    ...obj,
                    categories: parseTagsForUiList(actor.categories),
                }));
            }
        }
    }, [actor]);

    //================================================================================
    // Functions
    //================================================================================
    const extractActorInfos = () => {
        let hair = [];
        let ethnicity = [];
        let bodyType = [];

        actor.tags.map((tag) => {
            if (tag.type === "Hair") {
                hair.push(tag);
            }
            if (tag.type === "Ethnicity") {
                ethnicity.push(tag);
            }
            if (tag.type === "Body Types") {
                bodyType.push(tag);
            }
        });

        setActorInfos({
            hair: hair.length ? hair : null,
            ethnicity: ethnicity.length ? ethnicity : null,
            bodyType: bodyType.length ? bodyType : null,
        });
    };

    const handleEdits = () => {
        fetchData();
    };

    //================================================================================
    // API Requests
    //================================================================================
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`/api/actor/${id}`);
            setActor(data);
        } catch (err) {
            console.log("ERROR!", err);
        }
    };

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/delete`, {
                headers: {},
                data: { id: actor.id, table: "actor" },
            });
            router.push("/all/actors");
        } catch (err) {
            console.log("ERROR in delete!", err);
        }
    };

    console.log("💚 actor!", actor);

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main id={"ElMain"} className={styles.main}>
            {actor ? (
                <div id={styles.Actor} className={styles.elWrap}>
                    <div className={styles.infoWrap}>
                        <div className={styles.picWrap}>
                            <Image
                                src={actor.pic ? actor.pic : "/no-image.png"}
                                alt={actor.name}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        <div className={styles.underPicWrap}>
                            <h1>{actor.name}</h1>
                            <div className={styles.elRow}>
                                <span>Rating: </span>
                                {actor.rating ? (
                                    <p>{actor.rating}</p>
                                ) : (
                                    <p>Unrated</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoWrap}>
                        <div className={styles.infoHeadingWrap}>
                            <h3>PERSONAL INFO</h3>
                        </div>

                        <div className={styles.elRow}>
                            <span>Birthday: </span>
                            <p>
                                {actor.birthday
                                    ? formatDateEU(actor.birthday)
                                    : "N/A"}
                            </p>
                        </div>

                        <div className={styles.elRow}>
                            <span>Age: </span>
                            <p>{getAge(actor.birthday)} y.o.</p>
                        </div>

                        <div className={styles.elRow}>
                            <span>Genre: </span>
                            {actor.genre ? <p>{actor.genre}</p> : <p>N/A</p>}
                        </div>

                        <div className={styles.elRow}>
                            <span>Nationality: </span>
                            <div className={styles.tagsWrap}>
                                {actor.nationalities ? (
                                    actor.nationalities.map((el) => (
                                        <div
                                            key={"nationality" + el}
                                            className={styles.tagElSmall}
                                        >
                                            <Link href={`/nationality/${el}`}>
                                                {el}
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>N/A</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.elRow}>
                            <span>Height: </span>
                            <p>{"?"} cm</p>
                        </div>

                        <div className={styles.elRow}>
                            <span>Breast size: </span>
                            <p>{"?"} cm</p>
                        </div>

                        <div className={styles.elRow}>
                            <span>Foot size: </span>
                            <p>{"?"}</p>
                        </div>

                        <div className={styles.elRow}>
                            <span>Hair: </span>
                            <div className={styles.tagsWrap}>
                                {actorInfos && actorInfos.hair ? (
                                    actorInfos.hair.map((el) => (
                                        <div
                                            key={"hair " + el.id}
                                            className={styles.tagElSmall}
                                        >
                                            <Link href={`/tag/${el.id}`}>
                                                {el.name}
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>N/A</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.elRow}>
                            <span>Eyes color: </span>
                            <p>{"?"}</p>
                        </div>

                        <div className={styles.elRow}>
                            <span>Ethnicity: </span>
                            <div className={styles.tagsWrap}>
                                {actorInfos && actorInfos.ethnicity ? (
                                    actorInfos.ethnicity.map((el) => (
                                        <div
                                            key={"ethnicity " + el.id}
                                            className={styles.tagElSmall}
                                        >
                                            <Link href={`/tag/${el.id}`}>
                                                {el.name}
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>N/A</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.elRow}>
                            <span>Body type: </span>
                            <div className={styles.tagsWrap}>
                                {actorInfos && actorInfos.bodyType ? (
                                    actorInfos.bodyType.map((el) => (
                                        <div
                                            key={"bodyType " + el.id}
                                            className={styles.tagElSmall}
                                        >
                                            <Link href={`/tag/${el.id}`}>
                                                {el.name}
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>N/A</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoWrap}>
                        <div className={styles.infoHeadingWrap}>
                            <h3>MISC. INFO</h3>
                        </div>

                        <div className={styles.elRowToScroll}>
                            <span>Tags: </span>
                            <div className={styles.tagLabelsWrap}>
                                {parsedObj.tags ? (
                                    Object.entries(parsedObj.tags)
                                        .sort()
                                        .map(([key, arr], i) => {
                                            return (
                                                <div key={key}>
                                                    <div
                                                        className={
                                                            styles.tagLabel
                                                        }
                                                    >
                                                        {key}
                                                    </div>
                                                    <div>
                                                        {arr.map((el) => (
                                                            <div
                                                                key={
                                                                    "tag" +
                                                                    el.id
                                                                }
                                                                className={
                                                                    styles.tagEl
                                                                }
                                                            >
                                                                <Link
                                                                    href={`/el/tag/${el.id}`}
                                                                >
                                                                    {el.name}
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })
                                ) : (
                                    <p>N/A</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.elRowToScroll}>
                            <span>Categories: </span>
                            {/* <div className={styles.tagsWrap}>
                                {actor.categories && actor.categories.length ? (
                                    actor.categories.map((el) => (
                                        <div
                                            key={"category" + el.id}
                                            className={styles.tagElSmall}
                                        >
                                            <Link href={`/category/${el.id}`}>
                                                {el.name}
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>N/A</p>
                                )}
                            </div> */}

                            <div className={styles.tagLabelsWrap}>
                                {parsedObj.categories ? (
                                    Object.entries(parsedObj.categories)
                                        .sort()
                                        .map(([key, arr], i) => {
                                            return (
                                                <div key={key}>
                                                    <div
                                                        className={
                                                            styles.tagLabel
                                                        }
                                                    >
                                                        {key}
                                                    </div>
                                                    <div>
                                                        {arr.map((el) => (
                                                            <div
                                                                key={
                                                                    "category" +
                                                                    el.id
                                                                }
                                                                className={
                                                                    styles.tagEl
                                                                }
                                                            >
                                                                <Link
                                                                    href={`/category/${el.id}`}
                                                                >
                                                                    {el.name}
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })
                                ) : (
                                    <p>N/A</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.elRow}>
                            <span>Studios: </span>
                            <div className={styles.tagsWrap}>
                                {actor.studios && actor.studios.length ? (
                                    actor.studios.map((el) => (
                                        <div
                                            key={"studio" + el.id}
                                            className={styles.tagElSmall}
                                        >
                                            <Link href={`/studio/${el.id}`}>
                                                {el.name}
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>N/A</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.elRow}>
                            <span>Distribution: </span>
                            <div className={styles.tagsWrap}>
                                {actor.distributions &&
                                actor.distributions.length ? (
                                    actor.distributions.map((el) => (
                                        <div
                                            key={"distribution" + el.id}
                                            className={styles.tagElSmall}
                                        >
                                            <Link
                                                href={`/distribution/${el.id}`}
                                            >
                                                {el.name}
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>N/A</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.elRow}>
                            <span>Tot. Clips: </span>
                            <p>{actor.movies.length}</p>
                        </div>
                    </div>

                    <div className={styles.infoWrap}>
                        <div className={styles.infoHeadingWrap}>
                            <h3>CLIPS</h3>

                            {actor.movies.length > 0 && (
                                <Link href="/search">
                                    see all ({actor.movies.length})
                                </Link>
                            )}
                        </div>

                        <div className={styles.moviesWrap}>
                            {actor.movies ? (
                                <div className={styles.grid}>
                                    {actor.movies.map((el) => (
                                        <Link
                                            key={"clip" + el.id}
                                            href={`/clip/${el.id}`}
                                        >
                                            <div id={styles.Clip}>
                                                <div
                                                    style={{
                                                        position: "relative",
                                                    }}
                                                >
                                                    <Image
                                                        src={
                                                            el.pic
                                                                ? el.pic
                                                                : "/no-image.png"
                                                        }
                                                        alt={el.title}
                                                        fill
                                                        style={{
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <div>
                                                        <h5>{el.title}</h5>
                                                        <p
                                                            className={
                                                                styles.subtitle
                                                            }
                                                        >
                                                            {el.cast &&
                                                                el.cast.map(
                                                                    (
                                                                        actor,
                                                                        i
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                actor.actorid
                                                                            }
                                                                        >
                                                                            {i >
                                                                                0 &&
                                                                                ", "}
                                                                            {
                                                                                actor.name
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                        </p>
                                                    </div>
                                                    <p
                                                        className={
                                                            styles.rating
                                                        }
                                                    >
                                                        {el.rating
                                                            ? el.rating
                                                            : "unrated"}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p>N/A</p>
                            )}
                        </div>
                    </div>

                    <div className={styles.infoWrap}>
                        <div className={styles.infoHeadingWrap}>
                            <h3>ACTIONS</h3>
                        </div>

                        <div className={styles.buttonsWrap}>
                            <button onClick={() => setOpenForm(true)}>
                                Modify
                            </button>
                            <button onClick={() => handleDelete(actor.id)}>
                                Delete
                            </button>
                        </div>
                    </div>

                    {openForm && (
                        <div className={styles.overlay}>
                            <div className={styles.formWrapContainer}>
                                <Form
                                    topicLabel={"actor"}
                                    propsData={actor}
                                    setOpenForm={setOpenForm}
                                    handleEditsInParent={handleEdits}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div>Loading data ...</div>
            )}
        </main>
    );
}
