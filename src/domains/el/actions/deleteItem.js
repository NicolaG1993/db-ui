import axios from "axios";

const deleteItem = async (id, table) => {
    try {
        const { data } = await axios.delete(`/api/delete`, {
            headers: {},
            data: { id, table },
        });
        return data;
    } catch (err) {
        console.log("ERROR in delete!", err);
    }
};

export default deleteItem;
