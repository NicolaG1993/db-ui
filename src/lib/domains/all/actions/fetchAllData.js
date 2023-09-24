import axios from "axios";

const fetchAllData = async (url, params) => {
    const { data } = await axios.get(url, { params });
    return data;
};
export default fetchAllData;
