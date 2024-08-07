import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";
import { getError } from "@/src/application/utils/error";

const fetchItem = async (id, label, structure) => {
    try {
        const { data } = await axiosAuthInstance.get(`/api/${label}/${id}`);
        const res = { ...data, ...structure };
        delete res.ItemComponent;
        return { status: 200, data: res };
    } catch (error) {
        return {
            status: error.response?.status,
            error,
            message: getError(error),
        };
    }
};

export default fetchItem;
