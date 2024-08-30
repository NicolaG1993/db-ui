import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";
import { getError } from "@/src/application/utils/error";

export default async function fetchRelationsPage({
    // relationsLabel,
    relationsGroup,
    //itemGroup,
    itemLabel,
    itemId,
    filters,
}) {
    // call page for movies
    // we need to pass arguments: id, page, order, direction, filter // (last 2 optionals)

    try {
        // Do smth with filters, i think we need the single proprerties inside + el.id
        // TODO:

        const { direction, order, page } = filters;
        const limit = 9;

        const { data } = await axiosAuthInstance.get(
            `/api/relations/${relationsGroup}-page`,
            {
                params: {
                    itemId,
                    itemLabel,
                    // relationsLabel,
                    direction,
                    order,
                    limit,
                    offset: page === 1 ? 0 : (page - 1) * limit,
                },
            }
        ); // 🟥🟥🟥 itemGroup -> "movies" ; relationsLabel -> "actor"

        /* 
        const { data } = await axiosAuthInstance.get(`/api/${label}/${id}`);
      const res = { ...data, ...structure };
        delete res.ItemComponent;
        return { status: 200, data: res };
        */
        return { status: 200, data: data };
    } catch (error) {
        console.log("error: ", error);
        return {
            status: error.response.status,
            error,
            message: getError(error),
        };
    }
}
