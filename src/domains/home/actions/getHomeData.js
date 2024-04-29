import { sortByObjDate } from "@/src/application/utils/orderData";
import axios from "axios";

const getHomeData = async () => {
    let res = {
        data: {
            groupAResp: [],
            groupBResp: [],
        },
        error: undefined,
        status: undefined,
    };
    try {
        let { data } = await axios.get(`/api/home`);
        if (data) {
            if (data.groupA) {
                res.data.groupAResp = sortByObjDate(
                    data.groupA,
                    "created_at",
                    "asc"
                ).slice(0, 6);
            }
            if (data.groupB) {
                res.data.groupBResp = sortByObjDate(
                    data.groupB,
                    "created_at",
                    "desc"
                ).slice(0, 6);
            } // 🧨 slice should be a limiter in the DB req
        }
        res.status = 200;
    } catch (error) {
        res.data = undefined;
        res.error = error;
        res.status = error.response.status;
    }
    return res;
};

export default getHomeData;
