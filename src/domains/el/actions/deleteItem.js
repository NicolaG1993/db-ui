import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";

const deleteItem = async (id, table) => {
    try {
        const { data } = await axiosAuthInstance.delete(`/api/delete`, {
            headers: {},
            data: { id, table },
        });
        return data;
    } catch (err) {
        console.log("ERROR in delete!", err);
    }
};

export default deleteItem;
