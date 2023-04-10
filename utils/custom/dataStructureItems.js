import Actor from "@/components/Displayers/Item/Content/Actor";
import Movie from "@/components/Displayers/Item/Content/Movie";
import Category from "@/components/Displayers/Item/Content/Category";
// import Tag from "@/components/Displayers/Item/Content/Tag";
import Studio from "@/components/Displayers/Item/Content/Studio";
// import Distribution from "@/components/Displayers/Item/Content/Distribution";
// import Nationality from "@/components/Displayers/Item/Content/Nationality";

const dataStructureItems = {
    actor: {
        nameType: "name",
        group: "actors",
        ItemComponent: (pageProps) => <Actor {...pageProps} />,
    },
    movie: {
        nameType: "title",
        group: "movies",
        ItemComponent: (pageProps) => <Movie {...pageProps} />,
    },
    category: {
        nameType: "name",
        group: "categories",
        ItemComponent: (pageProps) => <Category {...pageProps} />,
    },
    tag: {
        nameType: "name",
        group: "tags",
        ItemComponent: (pageProps) => <Category {...pageProps} />,
    },
    studio: {
        nameType: "name",
        group: "studios",
        ItemComponent: (pageProps) => <Studio {...pageProps} />,
    },
    distribution: {
        nameType: "name",
        group: "distributions",
        ItemComponent: (pageProps) => <Studio {...pageProps} />,
    },
    nationality: {
        nameType: "name",
        group: "nationalities",
        ItemComponent: (pageProps) => <Nationality {...pageProps} />,
    },
};

export default dataStructureItems;
