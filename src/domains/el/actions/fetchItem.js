import { getError } from "@/src/application/utils/error";
import axios from "axios";

const fetchItem = async (id, label, structure) => {
    try {
        const { data } = await axios.get(`/api/${label}/${id}`);
        const res = { ...data, ...structure };
        delete res.ItemComponent;
        return { status: 200, data: res };
    } catch (error) {
        return {
            status: error.response.status,
            error,
            message: getError(error),
        };
    }
};

export default fetchItem;
