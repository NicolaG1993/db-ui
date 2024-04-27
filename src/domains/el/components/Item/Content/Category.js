import styles from "@/src/application/styles/Element.module.css";
import Link from "next/link";
import Image from "next/image";
import Form from "@/src/domains/_app/components/Form/components/Form";
import RelationsList from "../../RelationsList/RelationsList";

export default function Category({
    label,
    item,
    handleDelete,
    handleEdits,
    openForm,
    setOpenForm,
}) {
    let { pic, id, rating, nameType, actors, movies, type } = item;

    return (
        <div id={styles.Category} className={styles.elWrap}>
            <div className={styles.infoWrap}>
                <div className={styles.picWrap}>
                    <Image
                        src={pic ? pic : "/no-image.png"}
                        alt={item[nameType]}
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>

                <div className={styles.underPicWrap}>
                    <h1>{item[nameType]}</h1>
                    <div className={styles.elRow}>
                        <span>Rating: </span>
                        {rating ? <p>{rating}</p> : <p>Unrated</p>}
                    </div>
                </div>
            </div>

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>INFO</h3>
                </div>

                <div className={styles.elRow}>
                    <span>Type: </span>
                    <p>{type ? type : "N/A"}</p>
                </div>

                <div className={styles.elRow}>
                    <span>Tot. Movies: </span>
                    <p>{movies.length}</p>
                </div>

                <div className={styles.elRow}>
                    <span>Tot. Actors: </span>
                    <p>{actors.length}</p>
                </div>

                <div className={styles.elRowToScroll}>
                    <span>Actors: </span>
                    <div className={styles.tagsWrap}>
                        {actors ? (
                            actors.map((el) => (
                                <div
                                    key={"actor" + el.id}
                                    className={styles.tagElWithInfo}
                                >
                                    <Link href={`/el/actor/${el.id}`}>
                                        <p>{el.name}</p>
                                    </Link>
                                    {" | "}
                                    <Link href={`/search`}>
                                        <p>{el.totalMovies}</p>
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
                    <h3>MOVIES</h3>

                    {movies.length > 0 && (
                        <Link href="/search">see all ({movies.length})</Link>
                    )}
                </div>

                {movies ? (
                    <RelationsList
                        itemName={item[nameType]}
                        data={movies}
                        listLabel={"movie"}
                        listGroup={"movies"}
                    />
                ) : (
                    <p>N/A</p>
                )}
                {/* <div className={styles.moviesWrap}>
                    {movies ? (
                        <div className={styles.grid}>
                            {movies.map((el) => (
                                <Link
                                    key={"movie" + el.id}
                                    href={`/movie/${el.id}`}
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
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div>
                                            <div>
                                                <h5>{el.title}</h5>
                                                <p className={styles.subtitle}>
                                                    {el.cast &&
                                                        el.cast.map(
                                                            (actor, i) => (
                                                                <span
                                                                    key={
                                                                        actor.actorid
                                                                    }
                                                                >
                                                                    {i > 0 &&
                                                                        ", "}
                                                                    {actor.name}
                                                                </span>
                                                            )
                                                        )}
                                                </p>
                                            </div>
                                            <p className={styles.rating}>
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
                </div> */}
            </div>

            <div className={styles.infoWrap}>
                <div className={styles.infoHeadingWrap}>
                    <h3>ACTIONS</h3>
                </div>

                <div className={styles.buttonsWrap}>
                    <button
                        onClick={() => setOpenForm(true)}
                        className="button-standard"
                    >
                        Modify
                    </button>
                    <button
                        onClick={() => handleDelete(id)}
                        className="button-danger"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {openForm && (
                <div id={"Overlay"}>
                    <div className={"overlayWindow"}>
                        <div className={"topBar"}>
                            <span onClick={() => setOpenForm(false)}>X</span>
                        </div>

                        <Form
                            topicLabel={label}
                            propsData={item}
                            handleEditsInParent={handleEdits}
                            setOpenForm={setOpenForm}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
