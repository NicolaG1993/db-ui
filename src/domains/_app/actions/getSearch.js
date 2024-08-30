import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";

export default async function getSearch({ str, group }) {
    let res = { data: undefined, error: undefined };
    if (str && group) {
        try {
            const { data } = await axiosAuthInstance.get(
                `/api/search/searchbar`,
                {
                    params: {
                        str: str,
                        table: group,
                    },
                }
            );

            res.data = data.data;
        } catch (error) {
            res.error = error;
        }
    }
    return res;
}
