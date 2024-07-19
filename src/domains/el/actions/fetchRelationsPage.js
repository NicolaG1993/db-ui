import { getError } from "@/src/application/utils/error";
import axios from "axios";

export default async function fetchRelationsPage({
    relationsLabel,
    itemLabel,
    itemId,
    filters,
}) {
    // call page for movies
    // we need to pass arguments: id, page, order, direction, filter // (last 2 optionals)

    console.log("🟡⚠️🟡⚠️⭐ fetchRelationsPage: ", {
        relationsLabel,
        itemLabel,
        itemId,
        filters,
    });

    try {
        // Do smth with filters, i think we need the single proprerties inside + el.id
        // TODO:

        const { direction, order, page } = filters;

        const { data } = await axios.get(`/api/relations/movie-page`, {
            params: {
                itemId,
                itemLabel,
                relationsLabel,
                direction,
                order,
                page,
                limit: 9,
            },
        });

        console.log("🍄🍄🍄 data: ", data);
        /* 
        const { data } = await axios.get(`/api/${label}/${id}`);
      const res = { ...data, ...structure };
        delete res.ItemComponent;
        return { status: 200, data: res };
        */
        return { status: 200, data: data };
    } catch (error) {
        return {
            status: error.response.status,
            error,
            message: getError(error),
        };
    }
}
