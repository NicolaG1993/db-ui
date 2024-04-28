import axios from "axios";

const fetchItem = async (id, label, structure) => {
    try {
        const { data } = await axios.get(`/api/${label}/${id}`);
        const res = { ...data, ...structure };
        delete res.ItemComponent;
        return { status: 200, data: res };
    } catch (error) {
        console.error("fetchItem ERROR!", error);
        return { status: error.response.status, error };
    }
};

export default fetchItem;
