import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";
import { getError } from "@/src/application/utils/error";
import { sortByObjDate } from "@/src/application/utils/orderData";

const getHomeData = async () => {
    let res = {
        data: {
            groupAResp: [],
            groupBResp: [],
        },
        status: undefined,
        error: undefined,
        message: undefined,
    };
    try {
        let { data } = await axiosAuthInstance.get(`/api/home`);
        if (data) {
            if (data.groupA) {
                res.data.groupAResp = sortByObjDate(
                    data.groupA,
                    "created_at",
                    "desc"
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
        res.status = error.response.status;
        res.error = error;
        res.message = getError(res.error);
    }
    return res;
};

export default getHomeData;
