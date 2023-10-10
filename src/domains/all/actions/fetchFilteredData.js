import { orderData } from "../../_app/utils/parsers";
import axios from "axios";

const fetchFilteredData = async (url, params) => {
    const { data } = await axios.get(url, {
        params,
    });
    return data;
};

export default fetchFilteredData;
