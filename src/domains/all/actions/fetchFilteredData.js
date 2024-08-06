import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";
// import { orderData } from "../../_app/utils/parsers";

const fetchFilteredData = async (url, params) => {
    const { data } = await axiosAuthInstance.get(url, {
        params,
    });
    return data;
};

export default fetchFilteredData;
