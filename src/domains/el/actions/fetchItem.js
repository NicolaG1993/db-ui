import axios from "axios";

const fetchItem = async (id, label, structure) => {
    try {
        const { data } = await axios.get(`/api/${label}/${id}`);
        return { ...data, ...structure };
    } catch (err) {
        console.log("ERROR!", err);
        // return error ?
    }
};

export default fetchItem;
