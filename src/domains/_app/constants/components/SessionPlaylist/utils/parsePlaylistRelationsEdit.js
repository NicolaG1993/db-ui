import { newRelationsMoviesMethod } from "@/src/domains/_app/utils/formParsers.js";

export default function parsePlaylistRelationsEdit(relatedData, propsData) {
    let addedRelations = {};
    let removedRelations = {};

    addedRelations = newRelationsMoviesMethod(relatedData, propsData, "movies");
    // set the deleted relations
    removedRelations = propsData.movies
        .filter((el) => !relatedData.map((el) => el.id).includes(el.id))
        .map((el) => el.id);

    return {
        addedRelations,
        removedRelations,
    };
}
