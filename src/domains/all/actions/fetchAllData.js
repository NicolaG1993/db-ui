import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";

const fetchAllData = async (url, params) => {
    const { data } = await axiosAuthInstance.get(url, { params });
    return data;
};
export default fetchAllData;
