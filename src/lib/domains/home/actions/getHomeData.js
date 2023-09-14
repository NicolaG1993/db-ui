const getHomeData = async () => {
    let res = {
        groupAResp: undefined,
        groupBResp: undefined,
        error: undefined,
    };
    try {
        let { data } = await axios.get(`/api/home`);
        if (data) {
            if (data.groupA) {
                res.groupAResp = sortByObjDate(
                    data.groupA,
                    "created_at",
                    "asc"
                ).slice(0, 6);
            }
            if (data.groupB) {
                res.groupBResp = sortByObjDate(
                    data.groupB,
                    "created_at",
                    "desc"
                ).slice(0, 6);
            } // 🧨 slice should be a limiter in the DB req
        }
    } catch (error) {
        res.error = error;
    }
    return res;
};
