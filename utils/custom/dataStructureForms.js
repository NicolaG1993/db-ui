import ActorForm from "@/components/Forms/Content/ActorForm";
import MovieForm from "@/components/Forms/Content/MovieForm";
import RecordForm from "@/components/Forms/Content/RecordForm";
import StudioForm from "@/components/Forms/Content/StudioForm";
import TagForm from "@/components/Forms/Content/TagForm";

const dataStructureForms = {
    actor: {
        emptyState: {
            name: "",
            genre: "female",
            birthday: "", // null ?
            nationalities: [],
            tags: [],
            // rating?
        },
        key: "actor",
        group: "actors",
        nameType: "name",
        APInew: "/api/actor/new",
        APImodify: "/api/actor/modify",
        relations: [
            { topic: "tags", label: "tag" },
            { topic: "nationalities", label: "nationality" },
        ],
        formComponent: (pageProps) => <ActorForm {...pageProps} />,
    },
    movie: {
        emptyState: {
            title: "",
            urls: [],
            release: null,
            actors: [],
            studios: [],
            distributions: [],
            categories: [],
            tags: [],
            // rating?
        },
        key: "movie",
        group: "movies",
        nameType: "title",
        APInew: "/api/movie/new",
        APImodify: "/api/movie/modify",
        relations: [
            { topic: "actors", label: "actor" },
            { topic: "studios", label: "studio" },
            { topic: "distributions", label: "distribution" },
            { topic: "categories", label: "category" },
            { topic: "tags", label: "tag" },
        ],
        formComponent: (pageProps) => <MovieForm {...pageProps} />,
    },
    studio: {
        emptyState: {
            name: "",
            website: "",
            nationalities: [],
        },
        key: "studio",
        group: "studios",
        nameType: "name",
        APInew: "/api/studio/new",
        APImodify: "/api/studio/modify",
        relations: [{ topic: "nationalities", label: "nationality" }],
        formComponent: (pageProps) => <StudioForm {...pageProps} />,
    },
    distribution: {
        emptyState: {
            name: "",
            website: "",
            nationalities: [],
        },
        key: "distribution",
        group: "distributions",
        nameType: "name",
        APInew: "/api/distribution/new",
        APImodify: "/api/distribution/modify",
        relations: [{ topic: "nationalities", label: "nationality" }],
        formComponent: (pageProps) => <StudioForm {...pageProps} />,
    },
    category: {
        emptyState: {
            name: "",
            website: "",
        },
        key: "category",
        group: "categorys",
        nameType: "name",
        APInew: "/api/category/new",
        APImodify: "/api/category/modify",
        relations: [],
        formComponent: (pageProps) => <TagForm {...pageProps} />,
    },
    tag: {
        emptyState: {
            name: "",
            website: "",
        },
        key: "tag",
        group: "tags",
        nameType: "name",
        APInew: "/api/tag/new",
        APImodify: "/api/tag/modify",
        relations: [],
        formComponent: (pageProps) => <TagForm {...pageProps} />,
    },
    record: {
        emptyState: {
            date: "",
        },
        key: "record",
        group: "records",
        nameType: "",
        APInew: "/api/record/new",
        APImodify: "/api/record/modify",
        relations: [],
        formComponent: (pageProps) => <RecordForm {...pageProps} />,
    },
};

export default dataStructureForms;
